import { ReactNode } from "react";
import Steel from "../assets/Icon_Acero.webp";
import Water from "../assets/Icon_Agua.webp";
import Bug from "../assets/Icon_Bicho.webp";
import Dragon from "../assets/Icon_Dragon.webp";
import Electric from "../assets/Icon_Electrico.webp";
import Ghost from "../assets/Icon_Fantasma.webp";
import Fire from "../assets/Icon_Fuego.webp";
import Fairy from "../assets/Icon_Hada.webp";
import Ice from "../assets/Icon_Hielo.webp";
import Fighting from "../assets/Icon_Lucha.webp";
import Normal from "../assets/Icon_Normal.webp";
import Grass from "../assets/Icon_Planta.webp";
import Psychic from "../assets/Icon_Psiquico.webp";
import Rock from "../assets/Icon_Roca.webp";
import Dark from "../assets/Icon_Siniestro.webp";
import Ground from "../assets/Icon_Tierra.webp";
import Poison from "../assets/Icon_Veneno.webp";
import Flying from "../assets/Icon_Volador.webp";
import { Pokemon } from "../@types/types";
import "./styles.css";

//Metodo par obtener la imagen del tipo del pokemon
export const getTypes = (poke: Pokemon) => {
  let types: ReactNode[] = [];

  poke.types.forEach((pokeType, i) => {
    types.push(
      <img
        className="img-type"
        key={"Type " + i + " " + poke.id}
        src={conversion(pokeType.type.name)}
      />
    );
  });

  return types;
};
const conversion = (type: string) => {
  switch (type) {
    case "steel":
      return Steel;
    case "water":
      return Water;
    case "bug":
      return Bug;
    case "dragon":
      return Dragon;
    case "electric":
      return Electric;
    case "ghost":
      return Ghost;
    case "fire":
      return Fire;
    case "fairy":
      return Fairy;
    case "ice":
      return Ice;
    case "fighting":
      return Fighting;
    case "normal":
      return Normal;
    case "grass":
      return Grass;
    case "psychic":
      return Psychic;
    case "rock":
      return Rock;
    case "dark":
      return Dark;
    case "ground":
      return Ground;
    case "poison":
      return Poison;
    case "flying":
      return Flying;
  }
};
