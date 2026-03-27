"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const VIEW_W = 1200;
const VIEW_H = 800;
const INITIAL_VIEWPORT_WIDTH = 1280;
const INITIAL_MESH_SEED = 424242;
const GRID_MIN_X = 64;
const GRID_MAX_X = VIEW_W - 64;
const GRID_MIN_Y = 72;
const GRID_MAX_Y = VIEW_H - 72;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2;
const CENTER_MAX_DISTANCE = Math.hypot(CENTER_X, CENTER_Y);
const INTRO_DURATION_MS = 1840;

/** Parse M/L polyline d-string → centroid of vertices */
function pathCentroid(d) {
  const re = /[-+]?\d*\.?\d+/g;
  const nums = [];
  let m;
  while ((m = re.exec(d))) nums.push(parseFloat(m[0]));
  let sx = 0;
  let sy = 0;
  let c = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sx += nums[i];
    sy += nums[i + 1];
    c += 1;
  }
  return c ? { x: sx / c, y: sy / c } : { x: VIEW_W / 2, y: VIEW_H / 2 };
}

/** Parse M/L polyline d-string → [{x,y}, ...] */
function parsePolylineVertices(d) {
  const re = /[-+]?\d*\.?\d+/g;
  const nums = [];
  let m;
  while ((m = re.exec(d))) nums.push(parseFloat(m[0]));
  const verts = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    verts.push({ x: nums[i], y: nums[i + 1] });
  }
  return verts;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function next() {
    t += 0x6d2b79f5;
    let n = Math.imul(t ^ (t >>> 15), 1 | t);
    n ^= n + Math.imul(n ^ (n >>> 7), 61 | n);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

function densityFromViewportWidth(widthPx) {
  const w = clamp(widthPx || 1280, 1024, 3600);
  const t = (w - 1024) / (3600 - 1024);
  const cols = Math.round(14 + 14 * t);
  const rows = Math.round(9 + 10 * t);
  return {
    cols,
    rows,
    bucket: `${cols}x${rows}`,
  };
}

function pathFromPoints(points) {
  if (!points || points.length < 2) return null;
  const r = (n) => Math.round(n * 10) / 10;
  let d = `M ${r(points[0].x)} ${r(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${r(points[i].x)} ${r(points[i].y)}`;
  }
  return d;
}

function buildAxisPositions(min, max, count, rnd) {
  if (count <= 1) return [min];
  const spanCount = count - 1;
  const totalSpan = max - min;
  const weights = [];
  for (let i = 0; i < spanCount; i++) {
    const t = spanCount <= 1 ? 0 : i / (spanCount - 1);
    const wave = Math.sin(t * Math.PI * 2 + rnd() * Math.PI * 2) * 0.16;
    const w = clamp(0.72 + rnd() * 1.08 + wave, 0.32, 1.9);
    weights.push(w);
  }
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  const minGap = totalSpan / (spanCount * 2.35);
  const values = [min];
  let acc = min;
  for (let i = 0; i < spanCount; i++) {
    const gap = (weights[i] / weightSum) * totalSpan;
    acc += gap;
    values.push(i === spanCount - 1 ? max : acc);
  }
  for (let i = 1; i < values.length - 1; i++) {
    values[i] = clamp(values[i], values[i - 1] + minGap, max - minGap);
  }
  for (let i = values.length - 2; i > 0; i--) {
    values[i] = Math.min(values[i], values[i + 1] - minGap);
  }
  values[0] = min;
  values[values.length - 1] = max;
  return values;
}

function generateMesh({ cols, rows, seed }) {
  const rnd = mulberry32(seed);
  const colCount = clamp(cols, 12, 30);
  const rowCount = clamp(rows, 8, 20);
  const spanX = GRID_MAX_X - GRID_MIN_X;
  const spanY = GRID_MAX_Y - GRID_MIN_Y;
  const xs = buildAxisPositions(GRID_MIN_X, GRID_MAX_X, colCount, rnd);
  const ys = buildAxisPositions(GRID_MIN_Y, GRID_MAX_Y, rowCount, rnd);
  const stepX = spanX / (colCount - 1);
  const stepY = spanY / (rowCount - 1);
  for (let c = 1; c < colCount - 1; c++) {
    const t = c / (colCount - 1);
    const wave = Math.sin(t * Math.PI * 1.9 + rnd() * Math.PI * 2);
    const jitter = (rnd() * 2 - 1) * Math.min(22, stepX * 0.35) + wave * 8.5;
    xs[c] = clamp(xs[c] + jitter, xs[c - 1] + stepX * 0.42, xs[c + 1] - stepX * 0.42);
  }
  for (let r = 1; r < rowCount - 1; r++) {
    const t = r / (rowCount - 1);
    const wave = Math.cos(t * Math.PI * 2.1 + rnd() * Math.PI * 2);
    const jitter = (rnd() * 2 - 1) * Math.min(19, stepY * 0.36) + wave * 7.5;
    ys[r] = clamp(ys[r] + jitter, ys[r - 1] + stepY * 0.4, ys[r + 1] - stepY * 0.4);
  }

  const hEdges = Array.from({ length: rowCount }, () =>
    Array(colCount - 1).fill(false),
  );
  const vEdges = Array.from({ length: rowCount - 1 }, () =>
    Array(colCount).fill(false),
  );

  const spineRow = Math.floor(rowCount / 2);
  const spineCol = Math.floor(colCount / 2);
  for (let c = 0; c < colCount - 1; c++) hEdges[spineRow][c] = true;
  for (let r = 0; r < rowCount - 1; r++) vEdges[r][spineCol] = true;
  if (spineRow + 1 < rowCount) {
    for (let c = 0; c < colCount - 1; c++) {
      hEdges[spineRow + 1][c] = rnd() > 0.14;
    }
  }
  if (spineCol - 1 >= 0) {
    for (let r = 0; r < rowCount - 1; r++) {
      vEdges[r][spineCol - 1] = rnd() > 0.2;
    }
  }

  const horizontalChance = 0.57;
  const verticalChance = 0.53;
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount - 1; c++) {
      if (!hEdges[r][c]) hEdges[r][c] = rnd() < horizontalChance;
    }
  }
  for (let r = 0; r < rowCount - 1; r++) {
    for (let c = 0; c < colCount; c++) {
      if (!vEdges[r][c]) vEdges[r][c] = rnd() < verticalChance;
    }
  }

  const voidCount = clamp(Math.round((colCount * rowCount) / 180), 3, 7);
  for (let i = 0; i < voidCount; i++) {
    const startC = clamp(Math.floor(rnd() * (colCount - 5)) + 1, 1, colCount - 4);
    const startR = clamp(Math.floor(rnd() * (rowCount - 5)) + 1, 1, rowCount - 4);
    const width = clamp(2 + Math.floor(rnd() * 4), 2, colCount - startC - 1);
    const height = clamp(2 + Math.floor(rnd() * 4), 2, rowCount - startR - 1);
    for (let r = startR; r < startR + height; r++) {
      for (let c = startC; c < startC + width; c++) {
        if (r < rowCount && c < colCount - 1) {
          hEdges[r][c] = rnd() < 0.14;
        }
        if (r < rowCount - 1 && c < colCount) {
          vEdges[r][c] = rnd() < 0.12;
        }
      }
    }
  }

  for (let r = 0; r < rowCount; r++) {
    if (!hEdges[r].some(Boolean)) {
      hEdges[r][Math.floor(rnd() * (colCount - 1))] = true;
    }
  }
  for (let c = 0; c < colCount; c++) {
    let hasAny = false;
    for (let r = 0; r < rowCount - 1; r++) {
      if (vEdges[r][c]) {
        hasAny = true;
        break;
      }
    }
    if (!hasAny) {
      vEdges[Math.floor(rnd() * (rowCount - 1))][c] = true;
    }
  }

  const edgePaths = [];
  for (let r = 0; r < rowCount; r++) {
    let start = -1;
    for (let c = 0; c < colCount - 1; c++) {
      if (hEdges[r][c]) {
        if (start < 0) start = c;
      } else if (start >= 0) {
        const d = pathFromPoints([
          { x: xs[start], y: ys[r] },
          { x: xs[c], y: ys[r] },
        ]);
        if (d) edgePaths.push(d);
        start = -1;
      }
    }
    if (start >= 0) {
      const d = pathFromPoints([
        { x: xs[start], y: ys[r] },
        { x: xs[colCount - 1], y: ys[r] },
      ]);
      if (d) edgePaths.push(d);
    }
  }
  for (let c = 0; c < colCount; c++) {
    let start = -1;
    for (let r = 0; r < rowCount - 1; r++) {
      if (vEdges[r][c]) {
        if (start < 0) start = r;
      } else if (start >= 0) {
        const d = pathFromPoints([
          { x: xs[c], y: ys[start] },
          { x: xs[c], y: ys[r] },
        ]);
        if (d) edgePaths.push(d);
        start = -1;
      }
    }
    if (start >= 0) {
      const d = pathFromPoints([
        { x: xs[c], y: ys[start] },
        { x: xs[c], y: ys[rowCount - 1] },
      ]);
      if (d) edgePaths.push(d);
    }
  }

  const degree = Array.from({ length: rowCount }, () => Array(colCount).fill(0));
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount - 1; c++) {
      if (!hEdges[r][c]) continue;
      degree[r][c] += 1;
      degree[r][c + 1] += 1;
    }
  }
  for (let r = 0; r < rowCount - 1; r++) {
    for (let c = 0; c < colCount; c++) {
      if (!vEdges[r][c]) continue;
      degree[r][c] += 1;
      degree[r + 1][c] += 1;
    }
  }

  const nodePoints = [];
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      const deg = degree[r][c];
      if (deg >= 3 || (deg === 2 && rnd() < 0.46) || (deg === 1 && rnd() < 0.08)) {
        nodePoints.push([xs[c], ys[r]]);
      }
    }
  }

  const edgeVertices = edgePaths.map(parsePolylineVertices);
  const edgeCentroids = edgePaths.map(pathCentroid);
  const pulseCount = clamp(Math.round(edgePaths.length * 0.3), 8, 28);
  const pulsePathIndices = [];
  if (edgePaths.length > 0) {
    const stride = Math.max(1, Math.floor(edgePaths.length / pulseCount));
    for (let i = 0; i < edgePaths.length && pulsePathIndices.length < pulseCount; i += stride) {
      pulsePathIndices.push(i);
    }
  }

  return {
    edgePaths,
    nodePoints,
    edgeVertices,
    edgeCentroids,
    pulsePathIndices,
    xs,
    ys,
  };
}

/** Closest point on polyline to (px, py); segIndex = segment verts[i]→verts[i+1] */
function closestPointOnPolyline(verts, px, py) {
  if (verts.length < 2) {
    return { dist: Infinity, x: px, y: py, segIndex: 0 };
  }
  let bestDist = Infinity;
  let bx = verts[0].x;
  let by = verts[0].y;
  let bSeg = 0;
  for (let i = 0; i < verts.length - 1; i++) {
    const a = verts[i];
    const b = verts[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    if (len2 < 1e-12) continue;
    let t = ((px - a.x) * dx + (py - a.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const x = a.x + t * dx;
    const y = a.y + t * dy;
    const dist = Math.hypot(px - x, py - y);
    if (dist < bestDist) {
      bestDist = dist;
      bx = x;
      by = y;
      bSeg = i;
    }
  }
  return { dist: bestDist, x: bx, y: by, segIndex: bSeg };
}

const PATH_EPS = 0.85;

function pointsClose(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y) < PATH_EPS;
}

function polylineLength(points) {
  let len = 0;
  for (let i = 0; i < points.length - 1; i++) {
    len += Math.hypot(
      points[i + 1].x - points[i].x,
      points[i + 1].y - points[i].y,
    );
  }
  return len;
}

function buildForwardPoints(verts, P, k) {
  const pts = [{ x: P.x, y: P.y }];
  for (let j = k + 1; j < verts.length; j++) {
    const v = verts[j];
    if (pointsClose(pts[pts.length - 1], v)) continue;
    pts.push({ x: v.x, y: v.y });
  }
  return pts;
}

function buildBackwardPoints(verts, P, k) {
  const pts = [{ x: P.x, y: P.y }];
  for (let j = k; j >= 0; j--) {
    const v = verts[j];
    if (pointsClose(pts[pts.length - 1], v)) continue;
    pts.push({ x: v.x, y: v.y });
  }
  return pts;
}

function polylineToD(points) {
  if (points.length < 2) return null;
  const r = (n) => Math.round(n * 10) / 10;
  let d = `M ${r(points[0].x)} ${r(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${r(points[i].x)} ${r(points[i].y)}`;
  }
  return d;
}

/** Subpath from click projection along the wire (longer branch) so pulses originate at the cursor */
function burstPathFromClick(sx, sy, pathIdx, edgeVertices, edgePaths) {
  const verts = edgeVertices[pathIdx];
  const fallback = edgePaths[pathIdx] ?? null;
  if (!verts || verts.length < 2) return fallback;

  const cp = closestPointOnPolyline(verts, sx, sy);
  const k = cp.segIndex;
  const P = { x: cp.x, y: cp.y };

  const forwardPts = buildForwardPoints(verts, P, k);
  const backwardPts = buildBackwardPoints(verts, P, k);

  const lenF = polylineLength(forwardPts);
  const lenB = polylineLength(backwardPts);

  let chosen = lenF >= lenB ? forwardPts : backwardPts;
  if (chosen.length < 2 || polylineLength(chosen) < 1.5) {
    chosen = lenF >= lenB ? backwardPts : forwardPts;
  }

  if (chosen.length < 2 || polylineLength(chosen) < 1.5) {
    return fallback;
  }

  return polylineToD(chosen) ?? fallback;
}

/** Edge paths whose geometry is closest to (sx, sy) — not centroid (matches perceived wires) */
function nearestPathIndicesByPolylineDistance(sx, sy, count, edgeVertices) {
  const scored = edgeVertices.map((verts, i) => {
    if (verts.length < 2) return { i, d: Infinity };
    const cp = closestPointOnPolyline(verts, sx, sy);
    return { i, d: cp.dist };
  });
  scored.sort((a, b) => a.d - b.d);
  const out = [];
  const seen = new Set();
  for (const { i } of scored) {
    if (out.length >= count) break;
    if (!seen.has(i)) {
      seen.add(i);
      out.push(i);
    }
  }
  return out;
}

function nearestGridVertex(sx, sy, xs, ys) {
  let best = Infinity;
  let vx = xs[0] ?? 0;
  let vy = ys[0] ?? 0;
  for (let r = 0; r < ys.length; r++) {
    for (let c = 0; c < xs.length; c++) {
      const d = Math.hypot(sx - xs[c], sy - ys[r]);
      if (d < best) {
        best = d;
        vx = xs[c];
        vy = ys[r];
      }
    }
  }
  return { vx, vy };
}

function vertexIndexOnPolyline(verts, vx, vy) {
  for (let i = 0; i < verts.length; i++) {
    if (pointsClose(verts[i], { x: vx, y: vy })) return i;
  }
  return -1;
}

/** Map segment delta to N/E/S/W; null if too diagonal for this jittered grid. */
function cardinalDir(dx, dy) {
  if (Math.abs(dx) >= Math.abs(dy) * 1.15) {
    if (Math.abs(dy) > Math.abs(dx) * 0.95) return null;
    if (dx > 0.05) return "right";
    if (dx < -0.05) return "left";
    return null;
  }
  if (Math.abs(dy) >= Math.abs(dx) * 1.15) {
    if (Math.abs(dx) > Math.abs(dy) * 0.95) return null;
    if (dy > 0.05) return "down";
    if (dy < -0.05) return "up";
    return null;
  }
  return null;
}

/**
 * Up to four bursts from the nearest grid vertex — one per cardinal direction
 * along any incident edge (fewer if degree < 4 or lines missing).
 */
function collectCardinalBurstPaths(vx, vy, edgeVertices) {
  const emitted = new Set();
  const out = [];

  const tryAdd = (dir, pts) => {
    if (pts.length < 2 || polylineLength(pts) < 1.5) return;
    const d = polylineToD(pts);
    if (!d) return;
    if (emitted.has(dir)) return;
    emitted.add(dir);
    out.push(d);
  };

  for (const verts of edgeVertices) {
    const i = vertexIndexOnPolyline(verts, vx, vy);
    if (i < 0) continue;

    if (i + 1 < verts.length) {
      const dx = verts[i + 1].x - verts[i].x;
      const dy = verts[i + 1].y - verts[i].y;
      const dir = cardinalDir(dx, dy);
      if (dir) {
        const pts = buildForwardPoints(verts, { x: vx, y: vy }, i);
        tryAdd(dir, pts);
      }
    }
    if (i > 0) {
      const dx = verts[i - 1].x - verts[i].x;
      const dy = verts[i - 1].y - verts[i].y;
      const dir = cardinalDir(dx, dy);
      if (dir) {
        const pts = buildBackwardPoints(verts, { x: vx, y: vy }, i);
        tryAdd(dir, pts);
      }
    }
  }

  return out;
}

const CLICK_BURST_WAVES = 1;
const CLICK_BURST_DUR_S = 2.05;
const CLICK_BURST_CLEANUP_MS = 3400;
const MAX_ACTIVE_CLICK_BURSTS = 4;
const GLOBAL_PULSE_CLEANUP_MS = 3800;
const MAX_ACTIVE_GLOBAL_PULSES = 2;
const GLOBAL_PULSE_TRAVEL_S = 0.88;
const GLOBAL_EDGE_PULSE_DUR_S = 1.56;
const GLOBAL_NODE_PULSE_DUR_S = 1.8;

function createTransientId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** 0 = far, 1 = at cursor; smooth falloff */
function proximity(mx, my, px, py, radius, power = 1.35) {
  const dist = Math.hypot(mx - px, my - py);
  const t = Math.max(0, 1 - dist / radius);
  return Math.pow(t, power);
}

function introReveal(progress, distNorm, lag = 0.62, span = 0.34) {
  const raw = (progress - distNorm * lag) / span;
  return clamp(raw, 0, 1);
}

function farthestDistanceFromPoint(x, y) {
  const d1 = Math.hypot(x, y);
  const d2 = Math.hypot(VIEW_W - x, y);
  const d3 = Math.hypot(x, VIEW_H - y);
  const d4 = Math.hypot(VIEW_W - x, VIEW_H - y);
  return Math.max(d1, d2, d3, d4);
}

function pulseDelaySeconds(pulse, x, y) {
  const dist = Math.hypot(x - pulse.sx, y - pulse.sy);
  return (dist / Math.max(1, pulse.maxDist)) * GLOBAL_PULSE_TRAVEL_S;
}

function pulseIntensity(pulse, x, y) {
  const dist = Math.hypot(x - pulse.sx, y - pulse.sy);
  const distNorm = clamp(dist / Math.max(1, pulse.maxDist), 0, 1);
  return 0.42 + 0.58 * Math.pow(1 - distNorm, 0.72);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/**
 * SMIL `begin="0.05s"` is tied to the SVG document timeline, so pulses added
 * after load often never run. `begin="indefinite"` + beginElement() after mount
 * restarts correctly on every click.
 */
function ClickBurstWave({ d, wave, pathOrder, burstKey }) {
  const motionRef = useRef(null);
  const opacityRef = useRef(null);
  const dur = CLICK_BURST_DUR_S + wave * 0.04;
  const staggerS = pathOrder * 0.045 + wave * 0.11;

  useLayoutEffect(() => {
    const motion = motionRef.current;
    const opacity = opacityRef.current;
    if (!motion || !opacity) return undefined;
    const t = window.setTimeout(() => {
      try {
        motion.beginElement();
        opacity.beginElement();
      } catch {
        /* ignore */
      }
    }, staggerS * 1000);
    return () => window.clearTimeout(t);
  }, [burstKey, staggerS, d, wave, pathOrder]);

  const r = 3.35 + wave * 0.52;

  return (
    <circle
      r={r}
      fill="#111111"
      filter="url(#nodeBloom)"
      opacity={0}
    >
      <animateMotion
        ref={motionRef}
        path={d}
        dur={`${dur}s`}
        begin="indefinite"
        fill="freeze"
        calcMode="linear"
      />
      <animate
        ref={opacityRef}
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.72;1"
        dur={`${dur}s`}
        begin="indefinite"
        fill="freeze"
      />
    </circle>
  );
}

const NetworkBackdrop = forwardRef(function NetworkBackdrop(_props, ref) {
  const containerRef = useRef(null);
  const cleanupTimersRef = useRef([]);
  const pendingRef = useRef(null);
  const rafRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const [meshSeed] = useState(INITIAL_MESH_SEED);
  const [density, setDensity] = useState(() =>
    densityFromViewportWidth(INITIAL_VIEWPORT_WIDTH),
  );
  const [introProgress, setIntroProgress] = useState(() =>
    reducedMotion ? 1 : 0,
  );

  /** SVG-space cursor; null = left surface (idle falloff) */
  const [mouseSvg, setMouseSvg] = useState(null);

  /** One-shot click bursts: nodes racing along nearest tracks */
  const [clickBursts, setClickBursts] = useState([]);
  const [globalPulses, setGlobalPulses] = useState([]);

  useEffect(() => {
    const updateDensity = () => {
      const next = densityFromViewportWidth(window.innerWidth);
      setDensity((prev) => (prev.bucket === next.bucket ? prev : next));
    };
    updateDensity();
    window.addEventListener("resize", updateDensity);
    return () => window.removeEventListener("resize", updateDensity);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setIntroProgress(1));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const start = performance.now();
    let firstFrame = true;
    const tick = (now) => {
      const elapsed = firstFrame ? 0 : now - start;
      firstFrame = false;
      const t = clamp(elapsed / INTRO_DURATION_MS, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setIntroProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, density.bucket]);

  useEffect(() => {
    return () => {
      cleanupTimersRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const mesh = useMemo(
    () =>
      generateMesh({
        cols: density.cols,
        rows: density.rows,
        seed: meshSeed + density.cols * 997 + density.rows * 463,
      }),
    [density, meshSeed],
  );

  const {
    edgePaths,
    nodePoints,
    edgeVertices,
    edgeCentroids,
    pulsePathIndices,
    xs,
    ys,
  } = mesh;

  const queueCleanup = useCallback((callback, delayMs) => {
    const timeoutId = window.setTimeout(() => {
      cleanupTimersRef.current = cleanupTimersRef.current.filter(
        (id) => id !== timeoutId,
      );
      callback();
    }, delayMs);
    cleanupTimersRef.current.push(timeoutId);
  }, []);

  const enqueueBurst = useCallback(
    (sx, sy) => {
      if (reducedMotion) return;
      const pulseId = createTransientId();
      setGlobalPulses((prev) => [
        ...prev.slice(-(MAX_ACTIVE_GLOBAL_PULSES - 1)),
        {
          id: pulseId,
          sx,
          sy,
          maxDist: farthestDistanceFromPoint(sx, sy),
        },
      ]);
      queueCleanup(() => {
        setGlobalPulses((prev) => prev.filter((pulse) => pulse.id !== pulseId));
      }, GLOBAL_PULSE_CLEANUP_MS);
      const { vx, vy } = nearestGridVertex(sx, sy, xs, ys);
      let paths = collectCardinalBurstPaths(vx, vy, edgeVertices);
      if (paths.length === 0) {
        const indices = nearestPathIndicesByPolylineDistance(
          sx,
          sy,
          1,
          edgeVertices,
        );
        if (indices.length === 0) return;
        const d = burstPathFromClick(
          sx,
          sy,
          indices[0],
          edgeVertices,
          edgePaths,
        );
        paths = d ? [d] : [];
      }
      if (paths.length === 0) return;
      const id = createTransientId();
      setClickBursts((prev) => [
        ...prev.slice(-(MAX_ACTIVE_CLICK_BURSTS - 1)),
        { id, paths },
      ]);
      queueCleanup(() => {
        setClickBursts((prev) => prev.filter((b) => b.id !== id));
      }, CLICK_BURST_CLEANUP_MS);
    },
    [reducedMotion, edgeVertices, edgePaths, queueCleanup, xs, ys],
  );

  useImperativeHandle(
    ref,
    () => ({
      triggerBurstAtClient: (clientX, clientY) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sx = ((clientX - rect.left) / rect.width) * VIEW_W;
        const sy = ((clientY - rect.top) / rect.height) * VIEW_H;
        enqueueBurst(sx, sy);
      },
    }),
    [enqueueBurst],
  );

  const flushMouse = useCallback(() => {
    rafRef.current = 0;
    const p = pendingRef.current;
    const el = containerRef.current;
    if (!p || !el) return;
    pendingRef.current = null;
    const { nx, ny } = p;
    setMouseSvg({ x: nx, y: ny });
  }, []);

  const updateMouse = useCallback(
    (event) => {
      if (reducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * VIEW_W;
      const ny = ((event.clientY - rect.top) / rect.height) * VIEW_H;
      pendingRef.current = { nx, ny };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flushMouse);
      }
    },
    [flushMouse, reducedMotion],
  );

  const resetMouse = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    pendingRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    setMouseSvg(null);
  }, []);

  const handleBackdropClick = useCallback(
    (event) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sx = ((event.clientX - rect.left) / rect.width) * VIEW_W;
      const sy = ((event.clientY - rect.top) / rect.height) * VIEW_H;
      enqueueBurst(sx, sy);
    },
    [enqueueBurst],
  );

  const pointerActive = mouseSvg != null;
  const mx = pointerActive ? mouseSvg.x : 0;
  const my = pointerActive ? mouseSvg.y : 0;

  const nodeNear = useMemo(() => {
    if (!pointerActive) return nodePoints.map(() => 0);
    return nodePoints.map(([cx, cy]) =>
      proximity(mx, my, cx, cy, 300, 1.1),
    );
  }, [pointerActive, mx, my, nodePoints]);

  const edgeNear = useMemo(() => {
    if (!pointerActive) return edgeCentroids.map(() => 0);
    return edgeCentroids.map((c) =>
      proximity(mx, my, c.x, c.y, 220, 1.2),
    );
  }, [pointerActive, mx, my, edgeCentroids]);

  const pulsePathNear = useMemo(
    () => pulsePathIndices.map((i) => edgeNear[i] ?? 0),
    [edgeNear, pulsePathIndices],
  );

  const maxNodeNear = useMemo(
    () => (nodeNear.length ? Math.max(...nodeNear) : 0),
    [nodeNear],
  );

  const pulsePaths = useMemo(
    () => pulsePathIndices.map((i) => edgePaths[i]).filter(Boolean),
    [pulsePathIndices, edgePaths],
  );

  return (
    <div
      ref={containerRef}
      className="network-backdrop cursor-crosshair"
      data-network-active={mouseSvg ? "true" : "false"}
      onMouseMove={updateMouse}
      onMouseLeave={resetMouse}
      onClick={handleBackdropClick}
    >
      <svg
        className="network-bg max-md:origin-center max-md:scale-[1.12]"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="nodeBloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="nodeBloomHot"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          <g className="network-edges">
            {edgePaths.map((d, i) => {
              const p = edgeNear[i] ?? 0;
              const c = edgeCentroids[i] ?? { x: CENTER_X, y: CENTER_Y };
              const centerDist = Math.hypot(c.x - CENTER_X, c.y - CENTER_Y);
              const distNorm = clamp(centerDist / CENTER_MAX_DISTANCE, 0, 1);
              const reveal = reducedMotion ? 1 : introReveal(introProgress, distNorm);
              return (
                <path
                  key={`edge-${i}`}
                  d={d}
                  className="network-edge"
                  pathLength={100}
                  style={{
                    opacity:
                      (0.35 + 0.65 * (0.25 + 0.75 * p)) * reveal,
                    strokeWidth: (1.05 + 0.85 * p) * (0.72 + 0.28 * reveal),
                  }}
                />
              );
            })}
          </g>

          <g className="network-edge-pulses" aria-hidden="true">
            {pulsePathIndices.map((edgeIdx, j) => {
              const p = edgeNear[edgeIdx] ?? 0;
              return (
                <path
                  key={`pulse-line-${edgeIdx}`}
                  d={edgePaths[edgeIdx]}
                  className="network-edge-pulse"
                  pathLength={100}
                  style={{
                    animationDelay: `${j * -0.35}s`,
                    opacity: (0.48 + 0.44 * (0.3 + 0.7 * p)) * 0.5,
                    "--pulse-near": p,
                  }}
                />
              );
            })}
          </g>

          <g className="network-nodes">
            {nodePoints.map(([cx, cy], i) => {
              const p = nodeNear[i] ?? 0;
              const centerDist = Math.hypot(cx - CENTER_X, cy - CENTER_Y);
              const distNorm = clamp(centerDist / CENTER_MAX_DISTANCE, 0, 1);
              const reveal = reducedMotion ? 1 : introReveal(introProgress, distNorm, 0.68, 0.3);
              const scale = 1 + 0.75 * p;
              const ringBoost = 0.28 + 0.72 * p;
              const coreR = 1.35 + 2.2 * p;
              const ringR = 3.3 + 4.6 * p;
              const hot = p > 0.52;
              return (
                <g
                  key={`node-${i}`}
                  transform={`translate(${cx} ${cy}) scale(${scale * (0.58 + 0.42 * reveal)})`}
                  style={{
                    opacity: reveal,
                    transition:
                      "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <circle
                    r={ringR + (hot ? 1.8 * p : 0)}
                    className="network-node network-node-ring"
                    style={{
                      opacity: 0.2 + 0.75 * ringBoost,
                      strokeWidth: 0.75 + 0.75 * p,
                      transition:
                        "r 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease, stroke-width 0.42s ease",
                    }}
                  />
                  {hot ? (
                    <circle
                      r={ringR + 5 * p}
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth={0.35 + 0.4 * p}
                      className="network-node-ripple"
                      style={{ animationDelay: `${(i % 7) * 0.12}s` }}
                    />
                  ) : null}
                  <circle
                    r={coreR}
                    className="network-node network-node-core"
                    filter={hot ? "url(#nodeBloomHot)" : "url(#nodeBloom)"}
                    style={{
                      opacity: 0.55 + 0.45 * (0.4 + 0.6 * p),
                      transition:
                        "r 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease",
                    }}
                  />
                </g>
              );
            })}
          </g>

          <g
            className="network-packets"
            style={{
              opacity: 0.65 + 0.35 * Math.min(1, maxNodeNear * 1.2),
            }}
          >
            {pulsePaths.map((d, idx) => {
              const p = pulsePathNear[idx] ?? 0;
              return (
                <circle
                  key={`pkt-a-${idx}`}
                  r={2.45 + 3.35 * p}
                  className="network-packet"
                  style={{ opacity: 0.78 + 0.22 * p }}
                >
                  <animateMotion
                    dur={`${11 + (idx % 5) * 2.2}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${idx * -1.4}s`}
                  />
                </circle>
              );
            })}
            {pulsePaths.map((d, idx) => {
              const p = pulsePathNear[idx] ?? 0;
              return (
                <circle
                  key={`pkt-b-${idx}`}
                  r={1.65 + 2.05 * p}
                  className="network-packet network-packet-dim"
                  style={{
                    opacity: 0.4 + 0.5 * (0.35 + 0.65 * p),
                  }}
                >
                  <animateMotion
                    dur={`${14 + (idx % 4) * 2.5}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${-5 - idx * 1.1}s`}
                  />
                </circle>
              );
            })}
          </g>

          {!reducedMotion && globalPulses.length > 0 ? (
            <g className="network-global-pulses" aria-hidden="true">
              {globalPulses.map((pulse) => (
                <g key={pulse.id}>
                  {edgePaths.map((d, i) => {
                    const c = edgeCentroids[i] ?? { x: CENTER_X, y: CENTER_Y };
                    const intensity = pulseIntensity(pulse, c.x, c.y);
                    const style = {
                      animationDelay: `${pulseDelaySeconds(pulse, c.x, c.y)}s`,
                      animationDuration: `${GLOBAL_EDGE_PULSE_DUR_S + intensity * 0.16}s`,
                      "--network-global-wave-opacity": (0.14 + intensity * 0.28).toFixed(3),
                      "--network-global-wave-stroke-width": (0.92 + intensity * 1.12).toFixed(3),
                    };

                    return (
                      <path
                        key={`global-edge-${pulse.id}-${i}`}
                        d={d}
                        className="network-global-edge-wave"
                        style={style}
                      />
                    );
                  })}

                  {nodePoints.map(([cx, cy], i) => {
                    const intensity = pulseIntensity(pulse, cx, cy);
                    const style = {
                      animationDelay: `${pulseDelaySeconds(pulse, cx, cy)}s`,
                      animationDuration: `${GLOBAL_NODE_PULSE_DUR_S + intensity * 0.18}s`,
                      "--network-global-node-opacity": (0.24 + intensity * 0.36).toFixed(3),
                      "--network-global-node-core-opacity": (0.48 + intensity * 0.28).toFixed(3),
                      "--network-global-node-ring-scale": (1.34 + intensity * 0.62).toFixed(3),
                      "--network-global-node-core-scale": (1.16 + intensity * 0.34).toFixed(3),
                    };

                    return (
                      <g
                        key={`global-node-${pulse.id}-${i}`}
                        transform={`translate(${cx} ${cy})`}
                      >
                        <g className="network-global-node-wave" style={style}>
                          <circle
                            r={4.1 + intensity * 1.8}
                            className="network-global-node-wave-ring"
                          />
                          <circle
                            r={1.8 + intensity * 0.7}
                            className="network-global-node-wave-core"
                          />
                        </g>
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          ) : null}

          {clickBursts.length > 0 ? (
            <g className="network-click-bursts" style={{ pointerEvents: "none" }}>
              {clickBursts.map(({ id, paths }) =>
                paths.flatMap((dPath, pathOrder) =>
                  Array.from({ length: CLICK_BURST_WAVES }, (_, wave) => (
                    <ClickBurstWave
                      key={`${id}-${pathOrder}-${wave}`}
                      burstKey={`${id}-${pathOrder}-${wave}`}
                      d={dPath}
                      wave={wave}
                      pathOrder={pathOrder}
                    />
                  )),
                ),
              )}
            </g>
          ) : null}
        </g>
      </svg>
    </div>
  );
});

export default NetworkBackdrop;
