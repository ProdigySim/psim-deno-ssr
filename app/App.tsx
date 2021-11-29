/** @jsx React.createElement */
import { React } from "./deps.ts";
import { RoutingContext } from "./routingContext.ts";
import { TopNav } from "./components/TopNav.tsx";

declare const history: {
  pushState(state: unknown, title: '', url?: string): void;
};
type Props = {
  initialPath?: string;
};
export function App({ initialPath = "/" }: Props) {
  const [path, setPath] = React.useState(initialPath);
  const pathParts = React.useMemo(() => path.split("/").slice(1), [path]);
  const [firstPath, ...restPath] = pathParts;

  React.useEffect(() => {
    history.pushState({}, '', path);
  }, [path]);
  React.useEffect(() => {
    globalThis.addEventListener('popstate', (e) => {
      setPath(location.pathname);
    });
  })
  return (
    <RoutingContext.Provider value={{ path, pathParts, setPath }}>
      <TopNav />
      <div>
        <h1>Hello World</h1>
        <p>This is some code.</p>
        <CurRoute curPath={firstPath} restPath={restPath} />
      </div>
    </RoutingContext.Provider>
  );
}

type RouterProps = {
  curPath: string | undefined;
  restPath: string[];
};
function CurRoute({ curPath }: RouterProps) {
  switch (curPath) {
    case '':
      return <p>Blog</p>;
    case "about":
      return <p>About</p>;
    case "resume":
      return <p>Resume</p>;
    default:
      return <p>404</p>;
  }
}
