import { React } from "./deps.ts";

interface IRoutingContext {
  path: string;
  pathParts: string[];
  setPath: (path: string) => void;
}

export const RoutingContext = React.createContext<IRoutingContext>({
  path: "/",
  pathParts: [""],
  setPath: () => {},
});
