import { useContext } from "react";
import { MyPagination } from "./components/CustomPagination";
import { PokedexContext } from "./context/PokedexContext";
import { SwitchDark } from "./components/SwitchDark";
import { SizePageSelector } from "./components/SizePageSelector";
import { visibleTable } from "./components/PokeTable";
import { visibleCards } from "./components/PokeCards";
import { SwitchFormat } from "./components/SwitchFormat";
import PokedexLogo from "./assets/pokedex_logo.png";
import { Pokemon } from "./@types/types";
import { SwitchOnlyFavs } from "./components/SwitchOnlyFavs";
import "./styles.css";

export const PokeApp = () => {
  const {
    pokedex,
    formatMode,
    pokePerPage,
    actualPage,
    darkMode,
    onlyFavs,
    getFavPokedex,
  } = useContext(PokedexContext);

  //Filtro para visualizar todos los pokemon o solamente los favoritos
  let pokedexFiltered: Pokemon[] = [];
  if (onlyFavs) {
    pokedexFiltered = getFavPokedex!();
  } else {
    pokedexFiltered = pokedex;
  }

  return (
    <div id="main" className={darkMode ? "main-dark" : ""}>
      {/* Titulo */}
      <div className="title-container">
        <img src={PokedexLogo} />
      </div>
      {/* opciones */}
      <div className="options">
        <SwitchDark />
        <SwitchFormat />
        <SwitchOnlyFavs />
        <SizePageSelector />
      </div>
      {/*Pokemons en formato lista o carta */}
      {formatMode
        ? visibleCards({
            pokedex: pokedexFiltered,
            pokePerPage,
            actualPage,
            darkMode,
          })
        : visibleTable({
            pokedex: pokedexFiltered,
            pokePerPage,
            actualPage,
            darkMode,
          })}
      {/* Paginacion */}
      <div className="pagination">
        <MyPagination pokedex={pokedexFiltered} />
      </div>
    </div>
  );
};
export default PokeApp;
