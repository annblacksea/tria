import { Carousel } from '../carousel/Carousel';

export const SketchContent = ({ images, description }) => {
  return (
    <div>
      <Carousel images={images} />
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
};
