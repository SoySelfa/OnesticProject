import { Pagination } from "react-bootstrap";
import { useContext } from "react";
import { PokedexContext } from "../context/PokedexContext";
import { Pokemon } from "../@types/types";

//Paginacion
//Dependiendo del tamaño y la posicion, se crean mas o menos botones
export const MyPagination = ({ pokedex }: { pokedex: Pokemon[] }) => {
  const {
    actualPage,
    pokePerPage: pokePerPage,
    setActualPage,
  } = useContext(PokedexContext);

  const totalPages: number = Math.ceil(pokedex.length / pokePerPage);

  //Lista donde estaran los botones que seean necesarios
  let buttons = [];

  //Si ocupa la pagina entera no hay paginación
  if (totalPages < 2) return null;

  //Pagina inicial(si no es visible como boton numerado):  <<
  if (actualPage > 3)
    buttons.push(
      <Pagination.First key="page first" onClick={() => setActualPage?.(1)} />
    );

  //Pagina anterior(Si no es la primera):  <
  if (actualPage > 1)
    buttons.push(
      <Pagination.Prev
        key="page prev"
        onClick={() => setActualPage?.(actualPage - 1)}
      />
    );

  //Boton 2 anteriores numerado
  if (actualPage > 2)
    buttons.push(
      <Pagination.Item
        key={"page " + (actualPage - 2)}
        onClick={() => setActualPage?.(actualPage - 2)}
      >
        {actualPage - 2}
      </Pagination.Item>
    );

  //Boton anterior numerado
  if (actualPage > 1)
    buttons.push(
      <Pagination.Item
        key={"page " + (actualPage - 1)}
        onClick={() => setActualPage?.(actualPage - 1)}
      >
        {actualPage - 1}
      </Pagination.Item>
    );

  //Boton Actual
  buttons.push(
    <Pagination.Item active key="page actual">
      {actualPage}
    </Pagination.Item>
  );

  //Boton posterior numerado
  if (actualPage < totalPages)
    buttons.push(
      <Pagination.Item
        key={"page " + (actualPage + 1)}
        onClick={() => setActualPage?.(actualPage + 1)}
      >
        {actualPage + 1}
      </Pagination.Item>
    );

  //Boton 2 posteriores numerado
  if (actualPage < totalPages - 1)
    buttons.push(
      <Pagination.Item
        key={"page " + (actualPage + 2)}
        onClick={() => setActualPage?.(actualPage + 2)}
      >
        {actualPage + 2}
      </Pagination.Item>
    );

  //Pagina posterior (Si no es la ultima):  >
  if (actualPage < totalPages)
    buttons.push(
      <Pagination.Next
        key="page next"
        onClick={() => setActualPage?.(actualPage + 1)}
      />
    );

  //Ultima pagina (si no es visible como boton numerado):  >>
  if (actualPage < totalPages - 2)
    buttons.push(
      <Pagination.Last
        key="page last"
        onClick={() => setActualPage?.(totalPages)}
      />
    );

  return <>{buttons}</>;
};
