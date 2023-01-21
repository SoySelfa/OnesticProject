import { Modal } from "react-bootstrap";
import { Pokemon } from "../@types/types";
import { PhotoCarousel } from "./FotoCarousel";
import { getTypes } from "../helpers/GetTypes";
import { PokedexContext } from "../context/PokedexContext";
import { useContext } from "react";
import { ButtonFav } from "./ButtonFav";
import "./styles.css";

//Se crea la interfaz con la informacion del pokemon
export const PokeInfo = ({
  pokemon,
  show,
  onHide,
}: {
  pokemon: Pokemon;
  show: boolean;
  onHide: () => void;
}) => {
  const { darkMode } = useContext(PokedexContext);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={darkMode ? "text-white" : ""}
    >
      <Modal.Header closeButton className={darkMode ? "modal-header-dark" : ""}>
        <Modal.Title id="contained-modal-title-vcenter">
          {pokemon.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={darkMode ? "modal-body-dark" : "modal-body"}>
        <div className="modal-title">
          <h4>
            {/*Metodo para obtener el numero de la pokedex en formato de 3 cifras*/}
            {"Pokedex Sinnoh - " +
              "0".repeat(3 - pokemon.entry_number.toString().length) +
              pokemon.entry_number}
          </h4>
          <h5>
            {/*Metodo para obtener el numero de la pokedex en formato de 3 cifras*/}
            {"Pokedex Nacional - " +
              "0".repeat(3 - pokemon.id.toString().length) +
              pokemon.id}
          </h5>
        </div>
        <div className="modal-center">
          <PhotoCarousel
            className="modal-center-carousel"
            {...pokemon.sprites}
          />
          {/* Tabla con las estadisticas */}
          <table
            className={
              darkMode
                ? "table table-striped table-dark"
                : "table table-striped "
            }
          >
            <thead className="table-row">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Estadistica Base</th>
                <th scope="col">Esfuerzo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <th scope="row">Vida</th>
                <td>{pokemon.stats[0].base_stat} </td>
                <td>{pokemon.stats[0].effort}</td>
              </tr>
              <tr className="table-row">
                <th scope="row">Ataque</th>
                <td>{pokemon.stats[1].base_stat} </td>
                <td>{pokemon.stats[1].effort}</td>
              </tr>
              <tr className="table-row">
                <th scope="row">Defensa</th>
                <td>{pokemon.stats[2].base_stat} </td>
                <td>{pokemon.stats[2].effort}</td>
              </tr>
              <tr className="table-row">
                <th scope="row">Ataque Especial</th>
                <td>{pokemon.stats[3].base_stat} </td>
                <td>{pokemon.stats[3].effort}</td>
              </tr>
              <tr className="table-row">
                <th scope="row">Defensa Especial</th>
                <td>{pokemon.stats[4].base_stat} </td>
                <td>{pokemon.stats[4].effort}</td>
              </tr>
              <tr className="table-row">
                <th scope="row">Velocidad</th>
                <td>{pokemon.stats[5].base_stat} </td>
                <td>{pokemon.stats[5].effort}</td>
              </tr>
            </tbody>
          </table>

          <div className="modal-center-types">
            {"Tipo/s:"}
            {getTypes(pokemon)}
            {ButtonFav({ pokemon })}
          </div>
          <p>{pokemon.description}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
