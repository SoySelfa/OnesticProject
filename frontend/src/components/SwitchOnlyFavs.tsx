import Form from "react-bootstrap/esm/Form";
import { PokedexContext } from "../context/PokedexContext";
import { useContext } from "react";
import NoFavDia from "../assets/poke_no_fav_dia.png";
import NoFavNoche from "../assets/poke_no_fav_noche.png";
import Fav from "../assets/poke_fav.png";
import "./styles.css";

//Switch para mostrar unicamente los pokemons favoritos
export const SwitchOnlyFavs = () => {
  const { onlyFavs, setOnlyFavs, darkMode } = useContext(PokedexContext);
  const onSwitchAction = () => {
    setOnlyFavs?.(!onlyFavs);
  };
  return (
    <div className="switch">
      <img className="switch-favs-img" src={darkMode ? NoFavNoche : NoFavDia} />
      <Form.Check
        type="switch"
        defaultChecked={onlyFavs}
        onClick={() => onSwitchAction()}
      />
      <img className="switch-favs-img" src={Fav} />
    </div>
  );
};
