/** @jsx React.createElement */
import { React } from "../deps.ts";
import { RoutingContext } from "../routingContext.ts";

type Props = {
  href: string;
};
export const Link: React.FC<Props> = ({ href, children }) => {
  const routingCtx = React.useContext(RoutingContext);
  const clickHandler = (() => {
    if (href[0] === "/") {
      return (e: React.MouseEvent) => {
        console.log("clickhandler");
        e.preventDefault();
        routingCtx.setPath(href);
      };
    }
    // TODO: support origin checking
    return undefined;
  })();
  return <a href={href} onClick={clickHandler}>{children}</a>;
};
