import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "/src/app/index.css";
import HomePage from "../pages/home-page";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
