import { useContext } from "react";
import Form from "react-bootstrap/esm/Form";
import { PokedexContext } from "../context/PokedexContext";
import "./styles.css";

//Switch para elegir entre lista (false) y carta(true)
export const SwitchFormat = () => {
  const { formatMode, setFormatMode } = useContext(PokedexContext);
  const onSwitchAction = () => {
    setFormatMode?.(!formatMode);
  };
  return (
    <div className="switch">
      <a>📋</a>
      <Form.Check
        type="switch"
        defaultChecked={formatMode}
        onClick={() => onSwitchAction()}
      />
      <a>🎴</a>
    </div>
  );
};
