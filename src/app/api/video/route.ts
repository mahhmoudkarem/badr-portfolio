import { NextRequest } from "next/server";

const DRIVE_BASE = "https://drive.usercontent.google.com/download";

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get("fileId");
  if (!fileId) {
    return new Response("missing fileId", { status: 400 });
  }

  const range = req.headers.get("range");
  const upstreamHeaders: Record<string, string> = {};
  if (range) upstreamHeaders["Range"] = range;

  let url = `${DRIVE_BASE}?id=${fileId}&export=download`;
  let res = await fetch(url, { headers: upstreamHeaders });

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const html = await res.text();
    const uuid = html.match(/name="uuid"\s+value="([^"]+)"/);
    const confirm = html.match(/name="confirm"\s+value="([^"]+)"/);
    if (uuid && confirm) {
      url = `${DRIVE_BASE}?id=${fileId}&export=download&confirm=${confirm[1]}&uuid=${uuid[1]}`;
      res = await fetch(url, { headers: upstreamHeaders });
    } else {
      return new Response("unable to stream video", { status: 502 });
    }
  }

  if (!res.ok && res.status !== 206) {
    return new Response("upstream error", { status: res.status });
  }
  if (!res.body) {
    return new Response("no body", { status: 502 });
  }

  const upstreamType = res.headers.get("content-type") ?? "";
  const mediaType = upstreamType.startsWith("video/") ? upstreamType : "video/mp4";

  const responseHeaders = new Headers({
    "Content-Type": mediaType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
  });

  const contentRange = res.headers.get("content-range");
  const contentLength = res.headers.get("content-length");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}
