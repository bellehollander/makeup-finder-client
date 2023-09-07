import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MakeupFinder } from "./makeup";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MakeupFinder />
  </BrowserRouter>
);
