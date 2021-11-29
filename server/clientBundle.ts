const { files } = await Deno.emit("./app/client.tsx", { bundle: "module" });
export const clientBundle = files["deno:///bundle.js"] || "";
