import NoFavDia from "../assets/poke_no_fav_dia.png";
import NoFavNoche from "../assets/poke_no_fav_noche.png";
import Fav from "../assets/poke_fav.png";
import { Pokemon } from "../@types/types";
import { useContext } from "react";
import { PokedexContext } from "../context/PokedexContext";

//Boton de pokemons favoritos:
export const ButtonFav = ({ pokemon }: { pokemon: Pokemon }) => {
  const { darkMode, makeFav } = useContext(PokedexContext);
  return (
    <img
      className="button-fav-img"
      src={pokemon.favourite ? Fav : darkMode ? NoFavNoche : NoFavDia}
      alt="texto alternativo"
      onClick={() => {
        makeFav?.(pokemon.id);
      }}
    />
  );
};
