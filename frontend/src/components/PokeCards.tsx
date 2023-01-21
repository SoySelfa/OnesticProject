import { Card } from "react-bootstrap";
import { Pokemon } from "../@types/types";
import { PhotoCarousel } from "./FotoCarousel";
import { getTypes } from "../helpers/GetTypes";
import { ReactNode, useState } from "react";
import { PokeInfo } from "./PokeInfo";
import { ButtonFav } from "./ButtonFav";

//Funcion donde se crea la carta para el formato de vista de carta
const PokeCard = ({
  pokemon,
  darkMode,
}: {
  pokemon: Pokemon;
  darkMode: boolean;
}) => {
  //Hook para controlar el modal
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card
        style={{ width: "17rem" }}
        className={darkMode ? "poke-card bg-dark text-white" : "poke-card "}
      >
        <Card.Body>
          <PhotoCarousel {...pokemon.sprites} />{" "}
          <Card.Title className="poke-card-title">
            {/* Formato de 3 cifras para el numero de la pokedex */}
            {pokemon.name +
              " - " +
              "0".repeat(3 - pokemon.entry_number.toString().length) +
              pokemon.entry_number}
          </Card.Title>
          <div className="poke-card-center">
            <div className="poke-card-center-types">
              Tipo/s: {getTypes(pokemon)}
            </div>
            <div className="poke-card-center-buttons">
              <ButtonFav pokemon={pokemon} />
              {/*Boton de activacion del modal */}
              <a onClick={() => setModalShow(true)}>ℹ</a>
            </div>
          </div>
          <Card.Footer className="poke-card-footer">
            {pokemon.description}
          </Card.Footer>
        </Card.Body>
      </Card>
      {/*Modal donde se enseñan los detalles del pokemon*/}
      <PokeInfo
        pokemon={pokemon}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
//Elecciñon de que cartas se van a enseñar en la pagina actual
export const visibleCards = ({
  pokedex,
  pokePerPage,
  actualPage,
  darkMode,
}: {
  pokedex: Pokemon[];
  pokePerPage: number;
  actualPage: number;
  darkMode: boolean;
}) => {
  let cards: ReactNode[] = [];
  for (let i = 0; i < pokedex.length; i++) {
    if (
      pokePerPage * (actualPage - 1) < i + 1 &&
      pokePerPage * actualPage >= i + 1
    ) {
      cards.push(
        <PokeCard
          key={pokedex[i].id.toString()}
          pokemon={pokedex[i]}
          darkMode={darkMode}
        />
      );
    }
  }
  return <div className="grid-flex-layout">{cards}</div>;
};
