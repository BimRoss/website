import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#fafafa",
          border: "24px solid rgba(255,255,255,0.16)",
          fontSize: 280,
          fontWeight: 800,
          letterSpacing: "-0.08em",
          fontFamily: "sans-serif",
        }}
      >
        B
      </div>
    ),
    size,
  );
}
