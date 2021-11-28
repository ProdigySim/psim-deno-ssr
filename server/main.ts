import { ReactDOM, ReactDOMServer, serve } from "./deps.ts";
import { renderServerApp } from "./ServerApp.tsx";

const htmlHeaders = {
  "content-type": "text/html; charset=utf8",
  "cache-control":
    "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
};
function handler(): Response {
  console.log('request attempted');
  try {
  return new Response(
    getPageHtml(ReactDOMServer.renderToString(renderServerApp())),
    {
      headers: htmlHeaders,
    },
  );
  } catch(e) {
    console.error(e);
    return new Response(getPageHtml(`<h1>Internal Server Error</h1>`, 'Error'), {
      headers: htmlHeaders,
      status: 500,
    });
  }
}

function getPageHtml(body: string, title?: string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title ?? 'Hola Warudo'}</title>
    </head>
    <body >
      ${body}
    </body>
    </html>`;
}

console.log("Listening on http://localhost:8000");
await serve(handler);
