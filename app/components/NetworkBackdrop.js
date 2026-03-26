"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Orthogonal polylines (horizontal + vertical only) — Bittensor-style mesh */
const EDGE_PATHS = [
  "M 80 120 L 280 120 L 280 260 L 480 260",
  "M 480 260 L 480 140 L 720 140 L 720 320",
  "M 720 320 L 920 320 L 920 180 L 1120 180",
  "M 1120 180 L 1120 420 L 980 420",
  "M 980 420 L 980 580 L 760 580 L 760 480",
  "M 760 480 L 560 480 L 560 640 L 340 640",
  "M 340 640 L 340 520 L 140 520 L 140 380",
  "M 140 380 L 320 380 L 320 200",
  "M 600 80 L 600 220 L 840 220 L 840 80 L 1000 80",
  "M 200 680 L 200 560 L 420 560 L 420 720 L 640 720",
  "M 640 720 L 640 600 L 880 600 L 880 500 L 1080 500",
  "M 40 240 L 40 440 L 220 440 L 220 300 L 400 300",
  "M 400 300 L 400 460 L 620 460 L 620 340 L 800 340",
  "M 800 340 L 800 220",
  "M 520 20 L 520 160 L 680 160 L 680 40 L 900 40",
  "M 900 40 L 900 260 L 1180 260 L 1180 520",
  "M 1180 520 L 1020 520 L 1020 680 L 780 680",
  "M 780 680 L 780 560 L 500 560",
  "M 500 560 L 500 400 L 260 400 L 260 600 L 60 600",
  "M 60 600 L 60 480 L -20 480",
  "M 160 60 L 160 200 L 380 200 L 380 100 L 540 100",
  "M 540 100 L 540 280 L 700 280 L 700 120",
  "M 960 360 L 1140 360 L 1140 240",
  "M 880 720 L 1080 720 L 1080 600 L 1240 600",
];

/** Unique junction points for static nodes (subset of vertices for visual rhythm) */
const NODE_POINTS = [
  [80, 120],
  [280, 260],
  [480, 260],
  [720, 320],
  [920, 180],
  [980, 420],
  [760, 580],
  [340, 640],
  [140, 380],
  [400, 300],
  [600, 220],
  [1000, 80],
  [200, 680],
  [640, 720],
  [1080, 500],
  [40, 240],
  [620, 460],
  [800, 340],
  [520, 160],
  [1180, 520],
  [500, 560],
  [160, 60],
  [700, 280],
];

/** Paths that carry a traveling pulse (subset for performance) */
const PULSE_PATH_INDICES = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

const VIEW_W = 1200;
const VIEW_H = 800;

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

const EDGE_CENTROIDS = EDGE_PATHS.map(pathCentroid);

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

const EDGE_VERTICES = EDGE_PATHS.map(parsePolylineVertices);

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
function burstPathFromClick(sx, sy, pathIdx) {
  const verts = EDGE_VERTICES[pathIdx];
  const fallback = EDGE_PATHS[pathIdx] ?? null;
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
function nearestPathIndicesByPolylineDistance(sx, sy, count) {
  const scored = EDGE_VERTICES.map((verts, i) => {
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

const CLICK_BURST_PATHS = 6;
const CLICK_BURST_WAVES = 3;
const CLICK_BURST_DUR_S = 2.05;
const CLICK_BURST_CLEANUP_MS = 3400;

/** 0 = far, 1 = at cursor; smooth falloff */
function proximity(mx, my, px, py, radius, power = 1.35) {
  const dist = Math.hypot(mx - px, my - py);
  const t = Math.max(0, 1 - dist / radius);
  return t ** power;
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

  const r = 2.4 + wave * 0.35;

  return (
    <circle
      r={r}
      fill="#ffffff"
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

export default function NetworkBackdrop() {
  const containerRef = useRef(null);
  const pendingRef = useRef(null);
  const rafRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  /** SVG-space cursor; null = left surface (idle falloff) */
  const [mouseSvg, setMouseSvg] = useState(null);

  /** One-shot click bursts: nodes racing along nearest tracks */
  const [clickBursts, setClickBursts] = useState([]);

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
      if (reducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sx = ((event.clientX - rect.left) / rect.width) * VIEW_W;
      const sy = ((event.clientY - rect.top) / rect.height) * VIEW_H;
      const indices = nearestPathIndicesByPolylineDistance(
        sx,
        sy,
        CLICK_BURST_PATHS,
      );
      if (indices.length === 0) return;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setClickBursts((prev) => [...prev, { id, indices, sx, sy }]);
      window.setTimeout(() => {
        setClickBursts((prev) => prev.filter((b) => b.id !== id));
      }, CLICK_BURST_CLEANUP_MS);
    },
    [reducedMotion],
  );

  const pointerActive = mouseSvg != null;
  const mx = pointerActive ? mouseSvg.x : 0;
  const my = pointerActive ? mouseSvg.y : 0;

  const nodeNear = useMemo(() => {
    if (!pointerActive) return NODE_POINTS.map(() => 0);
    return NODE_POINTS.map(([cx, cy]) =>
      proximity(mx, my, cx, cy, 300, 1.1),
    );
  }, [pointerActive, mx, my]);

  const edgeNear = useMemo(() => {
    if (!pointerActive) return EDGE_CENTROIDS.map(() => 0);
    return EDGE_CENTROIDS.map((c) =>
      proximity(mx, my, c.x, c.y, 220, 1.2),
    );
  }, [pointerActive, mx, my]);

  const pulsePathNear = useMemo(
    () => PULSE_PATH_INDICES.map((i) => edgeNear[i] ?? 0),
    [edgeNear],
  );

  const maxNodeNear = useMemo(
    () => (nodeNear.length ? Math.max(...nodeNear) : 0),
    [nodeNear],
  );

  const pulsePaths = useMemo(
    () => PULSE_PATH_INDICES.map((i) => EDGE_PATHS[i]).filter(Boolean),
    [],
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
        className="network-bg"
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

        <g className="network-edges">
          {EDGE_PATHS.map((d, i) => {
            const p = edgeNear[i] ?? 0;
            return (
              <path
                key={`edge-${i}`}
                d={d}
                className="network-edge"
                pathLength="100"
                style={{
                  opacity: 0.35 + 0.65 * (0.25 + 0.75 * p),
                  strokeWidth: 1.05 + 0.85 * p,
                }}
              />
            );
          })}
        </g>

        <g className="network-edge-pulses" aria-hidden="true">
          {PULSE_PATH_INDICES.map((edgeIdx, j) => {
            const p = edgeNear[edgeIdx] ?? 0;
            return (
              <path
                key={`pulse-line-${edgeIdx}`}
                d={EDGE_PATHS[edgeIdx]}
                className="network-edge-pulse"
                pathLength="100"
                style={{
                  animationDelay: `${j * -0.35}s`,
                  opacity: 0.38 + 0.55 * (0.3 + 0.7 * p),
                  strokeWidth: 1.15 + 1.15 * p,
                }}
              />
            );
          })}
        </g>

        <g className="network-nodes">
          {NODE_POINTS.map(([cx, cy], i) => {
            const p = nodeNear[i] ?? 0;
            const scale = 1 + 1.1 * p;
            const ringBoost = 0.28 + 0.72 * p;
            const coreR = 2.2 + 3.8 * p;
            const ringR = 5 + 7.5 * p;
            const hot = p > 0.35;
            return (
              <g
                key={`node-${i}`}
                transform={`translate(${cx} ${cy}) scale(${scale})`}
                style={{
                  transition:
                    "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <circle
                  r={ringR + (hot ? 3 * p : 0)}
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
                    r={ringR + 8 * p}
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
                    transition: "r 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease",
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
                r={2.8 + 4.2 * p}
                className="network-packet"
                style={{ opacity: 0.72 + 0.28 * p }}
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
                r={1.6 + 2.2 * p}
                className="network-packet network-packet-dim"
                style={{ opacity: 0.32 + 0.48 * (0.35 + 0.65 * p) }}
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

        {clickBursts.length > 0 ? (
          <g className="network-click-bursts" style={{ pointerEvents: "none" }}>
            {clickBursts.map(({ id, indices, sx, sy }) =>
              indices.flatMap((pathIdx, pathOrder) => {
                const d = burstPathFromClick(sx, sy, pathIdx);
                if (!d) return [];
                return Array.from({ length: CLICK_BURST_WAVES }, (_, wave) => (
                  <ClickBurstWave
                    key={`${id}-${pathIdx}-${wave}`}
                    burstKey={`${id}-${pathIdx}-${wave}`}
                    d={d}
                    wave={wave}
                    pathOrder={pathOrder}
                  />
                ));
              }),
            )}
          </g>
        ) : null}
      </svg>
    </div>
  );
}
