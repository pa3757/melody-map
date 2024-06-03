import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import App from "./component/Result";
import { TestProvider } from "./context/TestContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>

  <TestProvider>
    <App />
  </TestProvider>
  //</React.StrictMode>
);
