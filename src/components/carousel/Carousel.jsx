import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '../icon/Icon';
import styles from './carousel.module.css';

export const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const images = [
    {
      id: 1,
      link: 'https://fastly.picsum.photos/id/777/1200/800.jpg?hmac=2qSWsQ6WMPlNyQxQkxO7w4_nEEOUWHhHYnvXJDnkPlA',
      description: 'Девушка на берегу озера',
    },
    {
      id: 2,
      link: 'https://fastly.picsum.photos/id/1029/1200/800.jpg?hmac=X2hQ0S0g1EX_3DUr-gUV1veXSC-dGiJ6oS6pscnyFys',
      description: 'Городской парк',
    },
    {
      id: 3,
      link: 'https://fastly.picsum.photos/id/832/1200/800.jpg?hmac=6490r5lsrzsp7HqmXL5h5jWs_a9qzzljKi_arzD7U24',
      description: 'Женщина в белой блузе',
    },
  ];

  return (
    <div className="embla flex gap-5">
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
