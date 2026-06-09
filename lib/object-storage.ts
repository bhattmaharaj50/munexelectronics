import path from "path"

const UPLOADS_PREFIX = "uploads/"

async function getClient() {
  const { Client } = await import("@replit/object-storage")
  return new Client()
}

export interface PublicUploadEntry {
  filename: string
  publicUrl: string
  contentType: string
  size: number
  updated: string
}

export interface RetrievedObject {
  buffer: Buffer
  contentType: string
  size: number
}

export async function uploadPublicObject(opts: {
  buffer: Buffer
  contentType: string
  filename: string
}): Promise<{ objectName: string; publicUrl: string }> {
  const client = await getClient()
  const objectName = `${UPLOADS_PREFIX}${opts.filename}`
  const { ok, error } = await client.uploadFromBytes(objectName, opts.buffer, {
    contentType: opts.contentType,
  } as any)
  if (!ok) throw new Error(`Upload failed: ${(error as any)?.message || "Unknown error"}`)
  return { objectName, publicUrl: `/objects/uploads/${opts.filename}` }
}

export async function findPublicObject(relativePath: string): Promise<RetrievedObject | null> {
  const client = await getClient()
  const trimmed = relativePath.replace(/^\/+/, "")
  const objectName = trimmed.startsWith("uploads/") ? trimmed : `${UPLOADS_PREFIX}${trimmed}`
  const { ok, value: bytes } = await client.downloadAsBytes(objectName)
  if (!ok || !bytes) return null
  const buffer = Buffer.from(bytes as any)
  return {
    buffer,
    contentType: guessContentType(trimmed),
    size: buffer.byteLength,
  }
}

export async function listPublicUploads(): Promise<PublicUploadEntry[]> {
  const client = await getClient()
  const { ok, value: objects } = await client.list({ prefix: UPLOADS_PREFIX })
  if (!ok || !objects) return []
  return (objects as Array<{ name: string; size?: number }>)
    .filter((obj) => {
      const filename = obj.name.slice(UPLOADS_PREFIX.length)
      return filename && !filename.includes("/")
    })
    .map((obj) => {
      const filename = obj.name.slice(UPLOADS_PREFIX.length)
      return {
        filename,
        publicUrl: `/objects/uploads/${filename}`,
        contentType: guessContentType(filename),
        size: obj.size || 0,
        updated: new Date().toISOString(),
      }
    })
    .reverse()
}

export async function deletePublicUpload(filename: string): Promise<boolean> {
  const client = await getClient()
  const objectName = `${UPLOADS_PREFIX}${filename}`
  const { ok } = await client.delete(objectName)
  return ok
}

function guessContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogg": "video/ogg",
    ".mov": "video/quicktime",
    ".mkv": "video/x-matroska",
    ".3gp": "video/3gpp",
  }
  return map[ext] || "application/octet-stream"
}
