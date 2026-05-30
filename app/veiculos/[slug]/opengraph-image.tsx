import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { slug } });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#050505", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
        <div style={{ color: "#ed1117", fontSize: 48, fontWeight: 900 }}>Imperar Multimarcas</div>
        <div style={{ color: "#f3bd25", fontSize: 78, fontWeight: 900 }}>{vehicle?.brand} {vehicle?.model}</div>
        <div style={{ fontSize: 34 }}>{vehicle?.version}</div>
      </div>
    ),
    size
  );
}
