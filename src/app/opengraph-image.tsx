import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "mychennaicity.in — Chennai news, jobs, events, and neighbourhood pages";

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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background:
            "linear-gradient(145deg, #0d3d3a 0%, #1a5c52 42%, #c45c3e 100%)",
          color: "#f4f7f6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          mychennaicity.in
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            fontWeight: 500,
            opacity: 0.92,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Chennai — local news, jobs, events, directory, and area pages
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            opacity: 0.75,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Tamil Nadu · India
        </div>
      </div>
    ),
    { ...size },
  );
}
