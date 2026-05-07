import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SkillMint AI - Free AI tools to build your career faster";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #ffffff 0%, #effdf8 44%, #fff7ed 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 64,
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(23,32,51,0.10)",
            borderRadius: 32,
            boxShadow: "0 28px 90px rgba(23, 32, 51, 0.14)",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            padding: 58,
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
            <div
              style={{
                alignItems: "center",
                background: "#172033",
                borderRadius: 18,
                color: "#1fc999",
                display: "flex",
                fontSize: 42,
                height: 74,
                justifyContent: "center",
                width: 74,
              }}
            >
              ✦
            </div>
            <div style={{ color: "#172033", fontSize: 32, fontWeight: 700 }}>
              SkillMint AI
            </div>
          </div>
          <div
            style={{
              color: "#172033",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 1.02,
              maxWidth: 980,
            }}
          >
            Free AI tools to build your career faster
          </div>
          <div
            style={{
              color: "#475569",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Generate, score, rewrite, compare, and export recruiter-ready resume
            bullets.
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["Resume scoring", "ATS-friendly", "No signup"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#effdf8",
                  border: "1px solid #d8f8ed",
                  borderRadius: 999,
                  color: "#0f8466",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "14px 22px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
