import { allFiles, renderFile, versionFileName } from "@/lib/cjenik";

export const dynamicParams = false;

export function generateStaticParams() {
  return allFiles().map(({ fileName }) => ({ file: fileName }));
}

export async function GET(_request: Request, { params }: RouteContext<"/cjenik/datoteke/[file]">) {
  const { file } = await params;
  const published = allFiles().find((f) => f.fileName === decodeURIComponent(file));
  if (!published) return new Response("Not found", { status: 404 });

  return new Response(renderFile(published), {
    headers: {
      "Content-Type":
        published.format === "csv" ? "text/csv; charset=utf-8" : "application/xml; charset=utf-8",
      "Content-Disposition": `inline; filename="${versionFileName(published.list, published.version, published.format)}"`,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
