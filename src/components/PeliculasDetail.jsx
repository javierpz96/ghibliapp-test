import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Image, Divider, Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { TrailersContext } from "./trailers";

const PeliculasDetail = () => {
  const { trailers, setFavoritos, favoritos } = useContext(TrailersContext);
  const { id } = useParams();
  const [peliculaDetalle, setPeliculaDetalle] = useState({});
  const [trailerYoutube, setTrailerYoutube] = useState("");

  const fetchDetail = async () => {
    const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
    const data = await response.json();
    setPeliculaDetalle(data);
  };

  const catchTrailer = () => {
    return trailers.filter((item) => item.title === peliculaDetalle?.title);
  };

  const handleAddFavorite = () => {
    setFavoritos((prevFavoritos) => {
      const updatedFavorites = [...prevFavoritos];
      if (!updatedFavorites.includes(peliculaDetalle.title)) {
        updatedFavorites.push(peliculaDetalle.title);
      }
      // Guardar en localStorage
      localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleDeleteFavorite = () => {
    setFavoritos((prevFavoritos) => {
      const updatedFavorites = prevFavoritos.filter(
        (item) => item !== peliculaDetalle.title
      );
      // Guardar en localStorage
      localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    console.log(favoritos);
  }, [favoritos]);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (peliculaDetalle?.title) {
      const trailer = catchTrailer();
      if (trailer.length > 0) {
        const url = trailer[0].trailer.split("v=")[1];
        setTrailerYoutube(url);
      }
    }
  }, [peliculaDetalle]);

  return (
    <div className="flex flex-col items-center ">
      <Image
        className="h-[450px] sm:h-[600px] m-5 mt-6"
        isBlurred
        src={peliculaDetalle.image}
        alt="NextUI Album Cover"
      />
      <div className="min-w-[20rem] max-w-[20rem]">
        <p className="text-sm font-medium">{peliculaDetalle.description}</p>
      </div>

      <Divider className="min-w-[20rem] max-w-[20rem] mt-3" />

      <div className="min-w-[20rem] max-w-[20rem] mt-3 text-sm font-medium">
        <p>
          Title: <span className="font-bold">{peliculaDetalle.title}</span>
        </p>
        <p>
          Director:{" "}
          <span className="font-bold">{peliculaDetalle.director}</span>
        </p>
        <p>
          Release date:{" "}
          <span className="font-bold">{peliculaDetalle.release_date}</span>
        </p>
        <p>
          Duration:{" "}
          <b className="font-bold">{peliculaDetalle.running_time} min</b>
        </p>
        <p>
          Score:{" "}
          {peliculaDetalle.rt_score < 40
            ? "⭐⭐"
            : peliculaDetalle.rt_score < 60
            ? "⭐⭐⭐"
            : peliculaDetalle.rt_score < 80
            ? "⭐⭐⭐⭐"
            : peliculaDetalle.rt_score < 95
            ? "⭐⭐⭐⭐⭐"
            : "⭐⭐⭐⭐⭐⭐"}
        </p>
      </div>

      <div className="mt-3">
        <iframe
          width="340"
          height="328"
          src={`https://www.youtube.com/embed/${trailerYoutube}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="min-w-[21rem] max-w-[20rem] flex justify-end mt-5 mb-3">
        {favoritos.includes(peliculaDetalle.title) ? (
          <Button
            color="danger"
            onClick={handleDeleteFavorite}
            variant="shadow"
          >
            Delete film
          </Button>
        ) : (
          <Button
            onClick={handleAddFavorite}
            color="primary"
            variant="shadow"
            endContent={<HeartIcon />}
          >
            Add film
          </Button>
        )}
      </div>
    </div>
  );
};

export default PeliculasDetail;
