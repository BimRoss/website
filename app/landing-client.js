"use client";

import { useCallback, useRef } from "react";

export default function LandingClient() {
  const containerRef = useRef(null);

  const updateMouse = useCallback((event) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x.toFixed(2)}%`);
    el.style.setProperty("--mouse-y", `${y.toFixed(2)}%`);
  }, []);

  const resetMouse = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", "50%");
    el.style.setProperty("--mouse-y", "50%");
  }, []);

  return (
    <main
      ref={containerRef}
      className="landing"
      onMouseMove={updateMouse}
      onMouseLeave={resetMouse}
    >
      <svg
        className="network-bg"
        viewBox="0 0 1200 800"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1ad5ff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#7f6bff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18f4b7" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7f6bff" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <path
          d="M-100 170 C 120 140, 260 260, 470 220 C 700 180, 900 80, 1300 210"
          className="network-line"
        />
        <path
          d="M-90 380 C 200 300, 380 540, 630 470 C 860 410, 1010 250, 1290 360"
          className="network-line"
        />
        <path
          d="M-120 620 C 120 560, 260 700, 520 670 C 760 630, 920 530, 1290 610"
          className="network-line"
        />
        <path
          d="M180 -50 C 300 120, 340 250, 280 430 C 230 600, 240 760, 360 880"
          className="network-line-alt"
        />
        <path
          d="M620 -40 C 740 120, 780 280, 730 430 C 680 590, 700 770, 840 870"
          className="network-line-alt"
        />
        <path
          d="M980 -60 C 1080 90, 1120 260, 1080 420 C 1040 580, 1060 740, 1160 860"
          className="network-line-alt"
        />
        <path
          d="M40 90 C 210 210, 430 260, 620 250 C 860 240, 1010 300, 1180 470"
          className="network-line"
        />
        <path
          d="M70 300 C 230 360, 390 330, 560 410 C 770 510, 920 500, 1170 680"
          className="network-line-alt"
        />
        <path
          d="M120 560 C 300 500, 470 520, 630 590 C 830 670, 960 650, 1140 720"
          className="network-line"
        />
        <path
          d="M-40 250 C 120 220, 250 200, 380 250 C 540 320, 700 340, 900 310 C 1060 290, 1160 330, 1260 420"
          className="network-line-alt"
        />
        <path
          d="M-60 520 C 130 470, 300 420, 470 460 C 650 500, 860 560, 1030 540 C 1160 520, 1240 560, 1320 640"
          className="network-line-alt"
        />
        <path
          d="M260 -40 C 420 140, 550 250, 710 320 C 870 390, 1010 480, 1130 650"
          className="network-line"
        />
        <path
          d="M520 -20 C 640 100, 750 180, 860 250 C 960 320, 1040 430, 1080 620"
          className="network-line-alt"
        />
        <path
          d="M820 -40 C 900 70, 980 150, 1060 260 C 1140 370, 1200 500, 1260 720"
          className="network-line"
        />
        <path
          d="M-130 120 C 60 110, 240 170, 420 160 C 620 150, 860 210, 1330 290"
          className="network-line"
        />
        <path
          d="M-150 710 C 140 640, 390 640, 640 700 C 860 760, 1060 760, 1360 700"
          className="network-line-alt"
        />
        <path
          d="M0 40 C 170 190, 260 260, 420 330 C 610 420, 820 460, 1140 520"
          className="network-line-alt"
        />
        <path
          d="M40 740 C 220 640, 350 600, 500 580 C 720 550, 940 560, 1240 620"
          className="network-line"
        />
        <path
          d="M140 -80 C 260 40, 340 150, 420 270 C 500 390, 590 560, 620 860"
          className="network-line"
        />
        <path
          d="M420 -90 C 520 20, 620 160, 700 280 C 780 400, 860 570, 910 860"
          className="network-line-alt"
        />
        <path
          d="M720 -90 C 810 30, 900 170, 980 300 C 1060 430, 1140 590, 1210 860"
          className="network-line"
        />

        <circle className="orbit-dot" r="3">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M-100 170 C 120 140, 260 260, 470 220 C 700 180, 900 80, 1300 210"
          />
        </circle>
        <circle className="orbit-dot" r="1.9" opacity="0.5">
          <animateMotion
            dur="12s"
            begin="-4s"
            repeatCount="indefinite"
            path="M-100 170 C 120 140, 260 260, 470 220 C 700 180, 900 80, 1300 210"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2.3" opacity="0.65">
          <animateMotion
            dur="19s"
            begin="-9s"
            repeatCount="indefinite"
            path="M-100 170 C 120 140, 260 260, 470 220 C 700 180, 900 80, 1300 210"
          />
        </circle>

        <circle className="orbit-dot" r="3">
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path="M-90 380 C 200 300, 380 540, 630 470 C 860 410, 1010 250, 1290 360"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2.1" opacity="0.62">
          <animateMotion
            dur="15s"
            begin="-7s"
            repeatCount="indefinite"
            path="M-90 380 C 200 300, 380 540, 630 470 C 860 410, 1010 250, 1290 360"
          />
        </circle>
        <circle className="orbit-dot" r="1.8" opacity="0.55">
          <animateMotion
            dur="21s"
            begin="-10s"
            repeatCount="indefinite"
            path="M-90 380 C 200 300, 380 540, 630 470 C 860 410, 1010 250, 1290 360"
          />
        </circle>

        <circle className="orbit-dot" r="3">
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            path="M-120 620 C 120 560, 260 700, 520 670 C 760 630, 920 530, 1290 610"
          />
        </circle>
        <circle className="orbit-dot" r="1.8" opacity="0.46">
          <animateMotion
            dur="18s"
            begin="-9s"
            repeatCount="indefinite"
            path="M-120 620 C 120 560, 260 700, 520 670 C 760 630, 920 530, 1290 610"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2" opacity="0.52">
          <animateMotion
            dur="24s"
            begin="-13s"
            repeatCount="indefinite"
            path="M-120 620 C 120 560, 260 700, 520 670 C 760 630, 920 530, 1290 610"
          />
        </circle>

        <circle className="orbit-dot-alt" r="2.5">
          <animateMotion
            dur="16s"
            repeatCount="indefinite"
            path="M180 -50 C 300 120, 340 250, 280 430 C 230 600, 240 760, 360 880"
          />
        </circle>
        <circle className="orbit-dot-alt" r="1.7" opacity="0.5">
          <animateMotion
            dur="16s"
            begin="-5s"
            repeatCount="indefinite"
            path="M180 -50 C 300 120, 340 250, 280 430 C 230 600, 240 760, 360 880"
          />
        </circle>
        <circle className="orbit-dot" r="2.2" opacity="0.72">
          <animateMotion
            dur="23s"
            begin="-8s"
            repeatCount="indefinite"
            path="M180 -50 C 300 120, 340 250, 280 430 C 230 600, 240 760, 360 880"
          />
        </circle>

        <circle className="orbit-dot-alt" r="2.5">
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            path="M620 -40 C 740 120, 780 280, 730 430 C 680 590, 700 770, 840 870"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2" opacity="0.6">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M520 -20 C 640 100, 750 180, 860 250 C 960 320, 1040 430, 1080 620"
          />
        </circle>
        <circle className="orbit-dot" r="1.9" opacity="0.58">
          <animateMotion
            dur="19s"
            begin="-11s"
            repeatCount="indefinite"
            path="M620 -40 C 740 120, 780 280, 730 430 C 680 590, 700 770, 840 870"
          />
        </circle>

        <circle className="orbit-dot-alt" r="2.2">
          <animateMotion
            dur="11s"
            repeatCount="indefinite"
            path="M980 -60 C 1080 90, 1120 260, 1080 420 C 1040 580, 1060 740, 1160 860"
          />
        </circle>
        <circle className="orbit-dot" r="2.7" opacity="0.88">
          <animateMotion
            dur="17s"
            repeatCount="indefinite"
            path="M820 -40 C 900 70, 980 150, 1060 260 C 1140 370, 1200 500, 1260 720"
          />
        </circle>
        <circle className="orbit-dot-alt" r="1.9" opacity="0.52">
          <animateMotion
            dur="17s"
            begin="-10s"
            repeatCount="indefinite"
            path="M820 -40 C 900 70, 980 150, 1060 260 C 1140 370, 1200 500, 1260 720"
          />
        </circle>

        <circle className="orbit-dot" r="2.7">
          <animateMotion
            dur="13s"
            repeatCount="indefinite"
            path="M40 90 C 210 210, 430 260, 620 250 C 860 240, 1010 300, 1180 470"
          />
        </circle>
        <circle className="orbit-dot" r="2.1" opacity="0.85">
          <animateMotion
            dur="14s"
            begin="-3s"
            repeatCount="indefinite"
            path="M-130 120 C 60 110, 240 170, 420 160 C 620 150, 860 210, 1330 290"
          />
        </circle>
        <circle className="orbit-dot" r="1.7" opacity="0.58">
          <animateMotion
            dur="16s"
            begin="-8s"
            repeatCount="indefinite"
            path="M-130 120 C 60 110, 240 170, 420 160 C 620 150, 860 210, 1330 290"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2.2" opacity="0.7">
          <animateMotion
            dur="20s"
            begin="-12s"
            repeatCount="indefinite"
            path="M40 90 C 210 210, 430 260, 620 250 C 860 240, 1010 300, 1180 470"
          />
        </circle>

        <circle className="orbit-dot-alt" r="2.4">
          <animateMotion
            dur="17s"
            repeatCount="indefinite"
            path="M70 300 C 230 360, 390 330, 560 410 C 770 510, 920 500, 1170 680"
          />
        </circle>
        <circle className="orbit-dot" r="2.4" opacity="0.85">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            path="M-40 250 C 120 220, 250 200, 380 250 C 540 320, 700 340, 900 310 C 1060 290, 1160 330, 1260 420"
          />
        </circle>
        <circle className="orbit-dot-alt" r="1.8" opacity="0.48">
          <animateMotion
            dur="13s"
            begin="-6s"
            repeatCount="indefinite"
            path="M-40 250 C 120 220, 250 200, 380 250 C 540 320, 700 340, 900 310 C 1060 290, 1160 330, 1260 420"
          />
        </circle>
        <circle className="orbit-dot-alt" r="2.1" opacity="0.65">
          <animateMotion
            dur="13s"
            repeatCount="indefinite"
            path="M-60 520 C 130 470, 300 420, 470 460 C 650 500, 860 560, 1030 540 C 1160 520, 1240 560, 1320 640"
          />
        </circle>

        <circle className="orbit-dot" r="2.9">
          <animateMotion
            dur="20s"
            repeatCount="indefinite"
            path="M120 560 C 300 500, 470 520, 630 590 C 830 670, 960 650, 1140 720"
          />
        </circle>
        <circle className="orbit-dot" r="2.2" opacity="0.67">
          <animateMotion
            dur="20s"
            begin="-11s"
            repeatCount="indefinite"
            path="M120 560 C 300 500, 470 520, 630 590 C 830 670, 960 650, 1140 720"
          />
        </circle>
        <circle className="orbit-dot" r="2.4" opacity="0.9">
          <animateMotion
            dur="22s"
            begin="-5s"
            repeatCount="indefinite"
            path="M-150 710 C 140 640, 390 640, 640 700 C 860 760, 1060 760, 1360 700"
          />
        </circle>
        <circle className="orbit-dot" r="1.8" opacity="0.62">
          <animateMotion
            dur="18s"
            begin="-12s"
            repeatCount="indefinite"
            path="M-150 710 C 140 640, 390 640, 640 700 C 860 760, 1060 760, 1360 700"
          />
        </circle>

        <circle className="orbit-dot" r="2.2" opacity="0.84">
          <animateMotion
            dur="15s"
            begin="-4s"
            repeatCount="indefinite"
            path="M0 40 C 170 190, 260 260, 420 330 C 610 420, 820 460, 1140 520"
          />
        </circle>
        <circle className="orbit-dot" r="1.7" opacity="0.55">
          <animateMotion
            dur="12s"
            begin="-9s"
            repeatCount="indefinite"
            path="M0 40 C 170 190, 260 260, 420 330 C 610 420, 820 460, 1140 520"
          />
        </circle>
        <circle className="orbit-dot" r="2.3" opacity="0.86">
          <animateMotion
            dur="19s"
            begin="-6s"
            repeatCount="indefinite"
            path="M40 740 C 220 640, 350 600, 500 580 C 720 550, 940 560, 1240 620"
          />
        </circle>
        <circle className="orbit-dot" r="1.9" opacity="0.6">
          <animateMotion
            dur="13s"
            begin="-11s"
            repeatCount="indefinite"
            path="M40 740 C 220 640, 350 600, 500 580 C 720 550, 940 560, 1240 620"
          />
        </circle>

        <circle className="orbit-dot" r="2" opacity="0.8">
          <animateMotion
            dur="17s"
            begin="-2s"
            repeatCount="indefinite"
            path="M140 -80 C 260 40, 340 150, 420 270 C 500 390, 590 560, 620 860"
          />
        </circle>
        <circle className="orbit-dot" r="2.6" opacity="0.92">
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path="M260 -40 C 420 140, 550 250, 710 320 C 870 390, 1010 480, 1130 650"
          />
        </circle>
        <circle className="orbit-dot" r="2" opacity="0.58">
          <animateMotion
            dur="15s"
            begin="-8s"
            repeatCount="indefinite"
            path="M260 -40 C 420 140, 550 250, 710 320 C 870 390, 1010 480, 1130 650"
          />
        </circle>
        <circle className="orbit-dot" r="1.7" opacity="0.52">
          <animateMotion
            dur="14s"
            begin="-7s"
            repeatCount="indefinite"
            path="M420 -90 C 520 20, 620 160, 700 280 C 780 400, 860 570, 910 860"
          />
        </circle>
        <circle className="orbit-dot" r="2.2" opacity="0.83">
          <animateMotion
            dur="16s"
            begin="-10s"
            repeatCount="indefinite"
            path="M720 -90 C 810 30, 900 170, 980 300 C 1060 430, 1140 590, 1210 860"
          />
        </circle>
        <circle className="orbit-dot" r="1.8" opacity="0.58">
          <animateMotion
            dur="12s"
            begin="-13s"
            repeatCount="indefinite"
            path="M720 -90 C 810 30, 900 170, 980 300 C 1060 430, 1140 590, 1210 860"
          />
        </circle>
      </svg>

      <div className="ambient-glow" aria-hidden="true" />

      <section className="hero">
        <h1 className="logo-wordmark">BimRoss</h1>
        <p className="blurb">Happy little automations</p>
      </section>
    </main>
  );
}
