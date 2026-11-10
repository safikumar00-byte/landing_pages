import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { landingPages } from "@/lib/landing-pages";

export const runtime = "nodejs";

const projectRoot = process.cwd();
const pagePaths = new Set(landingPages.map((page) => page.path));
const assetDirectories = new Set(
  landingPages.map((page) => {
    const slash = page.path.lastIndexOf("/");
    const directory = slash === -1 ? "" : page.path.slice(0, slash + 1);
    const filename = page.path.slice(slash + 1);
    const stem = filename.replace(/\.[^.]+$/, "");
    return `${directory}${stem}_files`;
  }),
);

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".lottie": "application/octet-stream",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { path } = await params;

  if (path.some((segment) => segment === "." || segment === ".." || segment.includes("\\"))) {
    return new Response("Not found", { status: 404 });
  }

  const requestedPath = path.join("/");
  const isPage = pagePaths.has(requestedPath);
  const isPageAsset = [...assetDirectories].some(
    (directory) => requestedPath.startsWith(`${directory}/`),
  );

  if (!isPage && !isPageAsset) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = resolve(/* turbopackIgnore: true */ projectRoot, requestedPath);
  if (!filePath.startsWith(`${projectRoot}${sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const content = await readFile(filePath);
    const extension = extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] ??
      (extension ? "application/octet-stream" : "text/javascript; charset=utf-8");

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
        "Content-Security-Policy": "frame-ancestors 'self'",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}