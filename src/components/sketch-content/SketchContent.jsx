import { Carousel } from '../carousel/Carousel';
import { Icon } from '../icon/Icon';

export const SketchContent = ({ author, publishedAt, text }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
            <span className="mr-10">{author}</span>
            <span>{publishedAt}</span>
          </div>
          <div className="flex gap-3">
            <Icon iconName={'pencil'} text={'Редактировать'} />
            <Icon iconName={'heart'} text={'В избранное'} />
          </div>
        </div>
        <Carousel />

        <p>{text}</p>
      </div>
    </div>
  );
};
