/** jsx React.createElement */
import { React, ReactDOM } from "./deps.ts";

import { App } from "./App.tsx";

window.React = React;
ReactDOM.hydrate(<App />, document.getElementById("root"));
