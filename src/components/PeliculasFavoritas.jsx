import { useEffect, useState, useContext } from "react";
import { TrailersContext } from "./trailers";
import { Card, CardBody } from "@nextui-org/react";

const PeliculasFavoritas = () => {
  const { favoritos } = useContext(TrailersContext);

  console.log(favoritos);

  return (
    <div>
      <div className="p-3">
        <h2 className="text-xl font-bold">Peliculas favoritas:</h2>
      </div>
      {favoritos.map((item) => [
        <Card className="m-2">
          <CardBody>
            <p>{item}</p>
          </CardBody>
        </Card>,
      ])}
    </div>
  );
};

export default PeliculasFavoritas;
