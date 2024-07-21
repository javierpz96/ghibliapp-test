import { useEffect, useState, useContext } from "react";
import { TrailersContext } from "./trailers";
import { Button } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import "./propuesta.css";

const Propuesta = () => {
  const { favoritos } = useContext(TrailersContext);

  const sendMessage = () => {
    const message = `🎬 ¡Hey! ¿Qué tal una maratón de Studio Ghibli? 🍿 Estas son mis favoritas 🌟✨ ${favoritos}`;
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="cont-fav">
      {favoritos ? (
        <Button
          className="absolute-mode"
          size="lg"
          color="primary"
          onClick={sendMessage}
        >
          Enviar prouesta a alguien 📩
        </Button>
      ) : (
        <Card>
          <CardBody>
            <p>Aún no tienes peliculas agregadas.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Propuesta;
