import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/kaushan-script/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./app/global.css";
import { App } from "./App";
import { ThemeProvider } from "@/components/theme-provider";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    {/* Light-first: rice paper by default; "ink night" is opt-in and remembered. */}
    <ThemeProvider defaultTheme="light">
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
