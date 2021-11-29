import { ReactDOMServer, serve } from "./deps.ts";
import { renderServerApp } from "./ServerApp.tsx";
import { clientBundle } from "./clientBundle.ts";

const htmlHeaders = {
  "content-type": "text/html; charset=utf8",
  "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
};
function handler(req: Request): Response {
  console.log(`Serving reques to ${req.url}`);
  try {
    const { pathname } = new URL(req.url);
    if (pathname === "/static/client.js") {
      return new Response(clientBundle, {
        headers: {
          "content-type": "text/javascript",
          "cache-control":
            "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        },
      });
    }
    return new Response(
      getPageHtml(ReactDOMServer.renderToString(renderServerApp(pathname))),
      {
        headers: htmlHeaders,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      getPageHtml(`<h1>Internal Server Error</h1>`, "Error"),
      {
        headers: htmlHeaders,
        status: 500,
      },
    );
  }
}

function getPageHtml(body: string, title?: string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title ?? "Hola Warudo"}</title>
    </head>
    <body >
      <div id='root'>
        ${body}
      </div>
      <script src="/static/client.js" defer></script>
    </body>
    </html>`;
}

console.log("Listening on http://localhost:8000");
await serve(handler);
