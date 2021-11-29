/** @jsx React.createElement */
import { React } from "./deps.ts";
import { App } from "../app/App.tsx";

export function renderServerApp(initialPath?: string) {
  return <App initialPath={initialPath} />;
}
