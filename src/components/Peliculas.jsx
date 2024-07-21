import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Link } from "react-router-dom";
import trailerData from "../TrailerFilm.json";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [trailers, setTrailers] = useState(trailerData);

  const fetchPeliculas = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films");
      const data = await response.json();
      setPeliculas(data);
    } catch (error) {
      console.log("Hubo un error", error);
    }
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filterPelicula = () => {
    if (searchInput !== "") {
      return peliculas.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    return peliculas;
  };

  useEffect(() => {
    fetchPeliculas();
  }, []);

  return (
    <div>
      <div className="px-12 mt-5">
        <Input
          value={searchInput}
          onChange={handleChangeInput}
          size="sm"
          type="text"
          label="Pelicula"
        />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-6 px-6">
        {filterPelicula().map((item) => (
          <Card
            key={item.id}
            isFooterBlurred
            className="w-full h-[350px] sm:h-[600px] col-span-12 sm:col-span-1 object-center object-cover"
          >
            <CardHeader className="absolute z-10 flex-col items-start">
              <p className="text-sm text-white/80 uppercase font-bold ">
                {item.release_date}
              </p>
              <div>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
              </div>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-screen "
              src={item.image}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">
                  Producer: <span className="font-bold">{item.producer}</span>
                </p>
              </div>
              <Link to={`/detalles/${item.id}`}>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  Ver Más
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;
