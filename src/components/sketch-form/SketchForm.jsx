import { useRef } from 'react';
import { Icon } from '../icon/Icon';
import { Input } from '../input/Input';
import { sanitazeContent } from '../../utils/sanitaze-content';
import { useServerRequest } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSketchData } from '../../slices/sketch-slice';
import { openModal } from '../../slices/modal-slice';

export const SketchForm = ({ sketch }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const requestServer = useServerRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSave = async () => {
    const newTitle = sanitazeContent(titleRef.current.value);
    const newDescription = sanitazeContent(descriptionRef.current.innerHTML);

    try {
      const result = await requestServer('saveSketchUpdates', sketch.authorId, sketch.id, {
        title: newTitle,
        description: newDescription,
      });

      if (!result || result.res.error) {
        return;
      }

      await dispatch(setSketchData(result.res));

      navigate(`/sketch/${sketch.id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onDelete = async () => {
    try {
      await dispatch(
        openModal({
          onConfirm: 'DELETE_SKETCH',
          confirmData: { ownerId: sketch.authorId, sketchId: sketch.id },
        })
      );
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="relative">
      <Input ref={titleRef} defaultValue={sketch.title} />
      <div
        className="whitespace-pre-line"
        ref={descriptionRef}
        contentEditable
        suppressContentEditableWarning
      >
        {sketch.description}
      </div>
      <div className="absolute -top-7 right-5 z-10 flex gap-3">
        <Icon iconName={'floppy-o'} text={'Сохранить изменения'} onClick={onSave} />
        <Icon iconName={'trash'} text={'Удалить этюд'} onClick={onDelete} />
      </div>
    </div>
  );
};
