import ReactDOM from "react-dom/client";
import PokeApp from "./PokeApp";
import { PokedexProvider } from "./context/PokedesProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PokedexProvider>
    <PokeApp />
  </PokedexProvider>
);
