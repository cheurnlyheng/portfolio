import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Cheurn Lyheng — Full-Stack Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const imageData = await readFile(join(process.cwd(), "public/images/profile-portrait.png"));
  const imageBase64 = `data:image/png;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#fbfbfb",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(16,16,15,0.5)",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#10100F",
              marginTop: 20,
              lineHeight: 1,
            }}
          >
            Cheurn Lyheng
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(16,16,15,0.6)",
              marginTop: 24,
              maxWidth: 560,
            }}
          >
            Full-Stack Developer &amp; UI/UX Designer
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "rgba(16,16,15,0.4)",
              marginTop: 32,
            }}
          >
            cheurnlyheng.com
          </div>
        </div>
        <img
          src={imageBase64}
          height="100%"
          width={440}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    { ...size },
  );
}
