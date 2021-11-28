import { ReactDOMServer, serve } from "./deps.ts";
import { renderServerApp } from "./ServerApp.tsx";

function handler(): Response {
  return new Response(
    getPageHtml(ReactDOMServer.renderToString(renderServerApp())),
    {
      headers: {
        "content-type": "text/html; charset=utf8",
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      },
    },
  );
}

function getPageHtml(body: string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hola Warudo</title>
    </head>
    <body >
      ${body}
    </body>
    </html>`;
}

console.log("Listening on http://localhost:8000");
await serve(handler);
