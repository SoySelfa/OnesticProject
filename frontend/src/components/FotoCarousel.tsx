import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { PokedexContext } from "../context/PokedexContext";

//Item para PhotoCarousel donde se usa la foto
const CarouselItem = ({ img }: { img: string }) => {
  return (
    <Carousel.Item>
      <img className="w-100 " src={img} />
    </Carousel.Item>
  );
};

//Carrousel donde estan las fotos del pokemon por delante y
//por detras en version normal y shiny
export const PhotoCarousel = ({
  front,
  back,
  front_shiny,
  back_shiny,
  className,
}: {
  front: string;
  back: string;
  front_shiny: string;
  back_shiny: string;
  className?: string;
}) => {
  const { darkMode } = useContext(PokedexContext);
  return (
    <>
      <Carousel
        className={className}
        //Interval a null para que no se ponga automaticamente
        interval={null}
        //light = Interfac blanca/dark= interfaz negra
        variant={darkMode ? "light" : "dark"}
      >
        {CarouselItem({ img: front })}
        {CarouselItem({ img: back })}
        {CarouselItem({ img: front_shiny })}
        {CarouselItem({ img: back_shiny })}
      </Carousel>
    </>
  );
};
