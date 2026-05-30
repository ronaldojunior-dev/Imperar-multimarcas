import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { NextRequest } from "next/server";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { requireSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 20);
    if (limited) return limited;
    await requireSession();

    const form = await req.formData();
    const files = form.getAll("files").filter((file): file is File => file instanceof File);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uploaded = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const name = `${crypto.randomUUID()}.webp`;
      const target = path.join(uploadDir, name);
      const output = await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      await writeFile(target, output);
      uploaded.push(`/uploads/${name}`);
    }

    return json({ files: uploaded }, 201);
  } catch (error) {
    return apiError(error);
  }
}
