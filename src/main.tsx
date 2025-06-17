import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/menu/side-menu";
import Home from "./App";
import HistoriaPage from "./pages/historia";
import JuegosPage from "./pages/juegos";
import GaleriaPage from "./pages/galeria/galeria";

// Historia
import SabiasQuePage from "./pages/historia/sabias-que";
import AnecdotasPage from "./pages/historia/anecdotas";
import ChistesPage from "./pages/historia/chistes";
import LeyendasPage from "./pages/historia/leyendas";
import OrigenDePage from "./pages/historia/origen-de";

// Juegos
import TriviaPage from "./pages/juegos/trivia";
import SopaLetrasPage from "./pages/juegos/sopa-letras";
import MemoriaPage from "./pages/juegos/memoria";
import MatchingPage from "./pages/juegos/matching";
import RompecabezasPage from "./pages/juegos/rompecabezas";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <SideBar />
      <Routes>
          {/* Página de inicio */}
          <Route index element={<Home />} />

          {/* Historia */}
          <Route path="historia" element={<HistoriaPage />} />
          <Route path="historia/sabias-que" element={<SabiasQuePage />} />
          <Route path="historia/anecdotas" element={<AnecdotasPage />} />
          <Route path="historia/chistes" element={<ChistesPage />} />
          <Route path="historia/leyendas" element={<LeyendasPage />} />
          <Route path="historia/origen-de" element={<OrigenDePage />} />

          {/* Juegos */}
          <Route path="juegos" element={<JuegosPage />} />
          <Route path="juegos/trivia" element={<TriviaPage />} />
          <Route path="juegos/sopa-letras" element={<SopaLetrasPage />} />
          <Route path="juegos/memoria" element={<MemoriaPage />} />
          <Route path="juegos/matching" element={<MatchingPage />} />
          <Route path="juegos/rompecabezas" element={<RompecabezasPage />} />

          {/* Página de galería */}
          <Route path="galeria" element={<GaleriaPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
