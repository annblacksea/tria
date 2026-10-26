import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '../icon/Icon';
import styles from './carousel.module.css';

export const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="embla flex gap-5 py-7">
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <ul className={styles.embla__container}>
          {images.map(({ id, link, description }) => (
            <li className={styles.embla__slide} key={id}>
              <img src={link} alt={description} />
            </li>
          ))}
        </ul>
      </div>
      <Icon
        iconName={'fa-solid fa-arrow-left'}
        text={'Предыдущий слайд'}
        className="embla__prev -order-1"
        onClick={scrollPrev}
      />
      <Icon
        iconName={'fa-solid fa-arrow-right'}
        text={'Следующий слайд'}
        className="embla__next"
        onClick={scrollNext}
      />
    </div>
  );
};
