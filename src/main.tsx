import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/globals/reset.scss";
import "./styles/globals/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
