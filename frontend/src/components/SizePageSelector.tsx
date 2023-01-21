import { useContext } from "react";
import Form from "react-bootstrap/esm/Form";
import { PokedexContext } from "../context/PokedexContext";
import "./styles.css";

//Selector de tamaño de pagina
export const SizePageSelector = () => {
  const { pokePerPage, setSizePage, pokedex, setActualPage, darkMode } =
    useContext(PokedexContext);

  return (
    <div>
      <Form.Select
        value={pokePerPage}
        className={darkMode ? "selector-dark  text-white" : ""}
        onChange={(e: any) => {
          setActualPage?.(1);
          setSizePage!(e.currentTarget.value);
        }}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>

        <option value={pokedex.length}>{pokedex.length}</option>
      </Form.Select>
    </div>
  );
};
