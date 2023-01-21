import { useContext } from "react";
import Form from "react-bootstrap/esm/Form";
import { PokedexContext } from "../context/PokedexContext";
import "./styles.css";

//Switch para modo claro (false) y oscuro (true)
export const SwitchDark = () => {
  const { darkMode, setDarkMode } = useContext(PokedexContext);
  const onSwitchAction = () => {
    setDarkMode?.(!darkMode);
  };
  return (
    <div className="switch">
      <a>🌞</a>
      <Form.Check
        defaultChecked={darkMode}
        type="switch"
        onClick={onSwitchAction}
      />
      <a>🌜</a>
    </div>
  );
};
