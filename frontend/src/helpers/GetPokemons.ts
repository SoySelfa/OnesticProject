import { Pokemon } from "../@types/types";

//Llamada para obtener la pokedex con los datos que unicamente se necesitan para la aplicacion
//La primera llamada, la cual es directamente a la pokedex de Sinnoh, no se obtienen todos los datos,
//pero si, a partir de este, te da el resto de urls para poder obtener los datos faltantes.
export const getPokedex = async (): Promise<Pokemon[]> => {
  const pokedexData = await dataFetch(`https://pokeapi.co/api/v2/pokedex/5/`);
  return await Promise.all(
    pokedexData.pokemon_entries.map(async (poke: any) => {
      const pokeSpecie = await dataFetch(poke["pokemon_species"].url);
      const pokeData = await dataFetch(pokeSpecie.varieties[0].pokemon.url);
      //La descripcion se obtiene la primera que tenga el pokemon en español
      const description = pokeSpecie.flavor_text_entries.find(
        (e: any) => e["language"]["name"] === "es"
      )["flavor_text"];
      return {
        entry_number: poke.entry_number,
        //La id tambien es el numero de la pokedex nacional
        id: pokeData.id,
        //Se capitaliza el nombre
        name: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
        types: pokeData.types,
        sprites: {
          back: pokeData.sprites.back_default,
          front: pokeData.sprites.front_default,
          back_shiny: pokeData.sprites.back_shiny,
          front_shiny: pokeData.sprites.front_shiny,
        },
        description,
        stats: pokeData.stats,
        //Se deja como no favorito por dfecto
        favourite: false,
      };
    })
  );
};

//Metodo fetch simple para mejor clectura en getPokedex
const dataFetch = async (url: string): Promise<any> => {
  const resp = await fetch(url);
  return await resp.json();
};
