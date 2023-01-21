import { useEffect, useState } from "react";
import { PokedexContext } from "./PokedexContext";
import { Pokemon } from "../@types/types";
import { getPokedex } from "../helpers/GetPokemons";

interface props {
  children: JSX.Element | JSX.Element[];
}
//Provider donde están los hooks y otros metodos que se usan en toda la aplicacion
export const PokedexProvider = ({ children }: props) => {
  const [formatMode, setFormatMode] = useState<boolean>(false);
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [sizePage, setSizePage] = useState<number>(10);
  const [actualPage, setActualPage] = useState<number>(1);
  const [onlyFavs, setOnlyFavs] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    window.localStorage.getItem("darkMode") === "true"
  );

  //Metodo sencillo para usar repetidas veces el guardado en local storage
  const setLocalStorage = (clave: string, value: string) =>
    window.localStorage.setItem(clave, value);

  //useEffect donde se mira el local storage, para ver si esta ya la pokedex
  useEffect(() => {
    const localStoragePokedex = window.localStorage.getItem("pokedex");

    if (localStoragePokedex?.length) {
      setPokedex(JSON.parse(localStoragePokedex));
    } else {
      getPokedex().then((e) => setPokedex(e));
    }
  }, []);

  //useEffect para actualizar el guardado de la pokedex cada vez que esta se mmodifique
  useEffect(() => {
    setLocalStorage("pokedex", JSON.stringify(pokedex));
  }, [pokedex]);

  //useEffect para actualizar el modo nocturno cada vez que se modifique
  useEffect(() => {
    setLocalStorage("darkMode", darkMode.toString());
  }, [darkMode]);

  //Metodo para obtener la lista de los pokemons que son favoritos
  const getFavPokedex = () => {
    let newPoke: Pokemon[] = [];
    pokedex.map((poke) => {
      if (poke.favourite) newPoke.push(poke);
    });
    return newPoke;
  };
  //Metodo para hacer a un pokemon favorito o deshacer el favorito
  const makeFav = (id: number) => {
    setPokedex((prevPokedex) =>
      prevPokedex.map((poke) => {
        if (poke.id === id) {
          return { ...poke, favourite: !poke.favourite };
        }
        return poke;
      })
    );
  };

  return (
    <PokedexContext.Provider
      value={{
        darkMode,
        setDarkMode,
        pokedex,
        setPokedex,
        pokePerPage: sizePage,
        setSizePage,
        actualPage,
        setActualPage,
        formatMode,
        setFormatMode,
        onlyFavs,
        setOnlyFavs,
        getFavPokedex,
        makeFav,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
