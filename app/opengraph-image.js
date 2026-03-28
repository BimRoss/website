import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "#050505",
          color: "#fafafa",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.08), transparent 38%), radial-gradient(circle at 84% 20%, rgba(255,255,255,0.06), transparent 42%), radial-gradient(circle at 58% 88%, rgba(255,255,255,0.05), transparent 36%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 120,
                height: 120,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: "-0.06em",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  fontSize: 28,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#a1a1aa",
                }}
              >
                BimRoss LLC
              </div>
              <div
                style={{
                  fontSize: 82,
                  lineHeight: 0.95,
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                }}
              >
                Founder-Led Infrastructure
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 940,
            }}
          >
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.28,
                color: "#e4e4e7",
              }}
            >
              Bittensor systems, operator tooling, and AI products built with
              single-owner accountability.
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 24,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              <span>Single-Person LLC</span>
              <span>Subnet 42</span>
              <span>Subnet Signal</span>
              <span>Invoice Pilot</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
