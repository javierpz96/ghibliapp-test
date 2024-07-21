import "./App.css";
import { Route, Routes } from "react-router-dom";
import { TrailerProvider } from "./components/trailers";
import NavbarComponent from "./components/NavbarComponent";
import Peliculas from "./components/Peliculas";
import PeliculasDetail from "./components/PeliculasDetail";
import PeliculasFavoritas from "./components/PeliculasFavoritas";
import Propuesta from "./components/Propuesta";
import Test from "./components/Test";

function App() {
  return (
    <>
      <NavbarComponent />
      <TrailerProvider>
        <Routes>
          <Route path="/" element={<Peliculas />}></Route>
          <Route path="/detalles/:id" element={<PeliculasDetail />}></Route>
          <Route path="/favoritos" element={<PeliculasFavoritas />}></Route>
          <Route path="/propuesta" element={<Propuesta />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </TrailerProvider>
    </>
  );
}

export default App;
