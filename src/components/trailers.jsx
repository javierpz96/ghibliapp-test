import { createContext, useState } from "react";
import trailersJson from "../TrailerFilm.json";

// 1. Crear el Contexto
export const TrailersContext = createContext();

// 2. Crear el Provider, para proveer el contexto
export function TrailerProvider({ children }) {
  const [trailers, setTrailers] = useState(trailersJson);
  const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [favoritos, setFavoritos] = useState(storedFavorites);
  return (
    <TrailersContext.Provider
      value={{ trailers, setTrailers, favoritos, setFavoritos }}
    >
      {children}
    </TrailersContext.Provider>
  );
}
