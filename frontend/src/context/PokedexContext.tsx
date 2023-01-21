import { Dispatch, SetStateAction, createContext } from "react";
import { Pokemon } from "../@types/types";

interface ContextProps {
  darkMode: boolean;
  setDarkMode?: Dispatch<SetStateAction<boolean>>;
  pokedex: Pokemon[];
  setPokedex?: Dispatch<SetStateAction<Pokemon[]>>;
  pokePerPage: number;
  setSizePage?: Dispatch<SetStateAction<number>>;
  actualPage: number;
  setActualPage?: Dispatch<SetStateAction<number>>;
  formatMode: boolean;
  setFormatMode?: Dispatch<SetStateAction<boolean>>;
  onlyFavs: boolean;
  setOnlyFavs?: Dispatch<SetStateAction<boolean>>;
  getFavPokedex?: () => Pokemon[];
  makeFav?: (id: number) => void;
}

export const PokedexContext = createContext<ContextProps>({
  darkMode: false,
  pokedex: [],
  pokePerPage: 10,
  actualPage: 1,
  formatMode: false,
  onlyFavs: false,
});
