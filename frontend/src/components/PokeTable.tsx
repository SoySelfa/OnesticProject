import { ReactNode, useState } from "react";
import { Pokemon } from "../@types/types";
import { getTypes } from "../helpers/GetTypes";
import { ButtonFav } from "./ButtonFav";
import { PokeInfo } from "./PokeInfo";
import "./styles.css";

//Funcion donde se crea la carta para el formato de vista de tabla
const PokeTableRow = ({ pokemon }: { pokemon: Pokemon }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <tr className="table-row">
        <th scope="row">{pokemon.entry_number}</th>
        <td>
          <img src={pokemon.sprites.front} alt={pokemon.name + " foto"} />
        </td>
        <td> {pokemon.name}</td>
        <td>{getTypes(pokemon)}</td>
        <td>
          <ButtonFav pokemon={pokemon} />
        </td>
        <td>
          <a onClick={() => setModalShow(true)}>ℹ</a>
        </td>
      </tr>
      {/*Modal donde se enseñan los detalles del pokemon*/}
      <PokeInfo
        pokemon={pokemon}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export const visibleTable = ({
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
  let table: ReactNode[] = [];
  for (let i = 0; i < pokedex.length; i++) {
    if (
      pokePerPage * (actualPage - 1) < i + 1 &&
      pokePerPage * actualPage >= i + 1
    ) {
      table.push(
        <PokeTableRow key={"tableRow " + pokedex[i].id} pokemon={pokedex[i]} />
      );
    }
  }
  return (
    <div className="table-container">
      <table
        className={
          darkMode ? "table table-striped table-dark" : "table table-striped "
        }
      >
        <thead className="table-row">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Foto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Favorito</th>
            <th scope="col">Info</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </div>
  );
};
