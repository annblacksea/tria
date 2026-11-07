import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../icon/Icon';
import { Input } from '../input/Input';
import { sanitazeContent } from '../../utils/sanitaze-content';
import { useServerRequest } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSketchData } from '../../slices/sketch-slice';
import { openModal } from '../../slices/modal-slice';

export const SketchForm = ({ sketch }) => {
  const [titleText, setTitleText] = useState('');
  const descriptionRef = useRef(null);
  const requestServer = useServerRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setTitleText(sketch.title);
  }, [sketch.title]);

  const onSave = async () => {
    const newTitle = sanitazeContent(titleText);
    const newDescription = sanitazeContent(descriptionRef.current.innerHTML);

    try {
      const result =
        sketch.id === ''
          ? await requestServer('addNewSketch', newTitle, [], newDescription)
          : await requestServer('saveSketchUpdates', sketch.authorId, sketch.id, {
              title: newTitle,
              description: newDescription,
            });

      if (!result || result.res.error) {
        return;
      }

      await dispatch(setSketchData(result.res));

      navigate(`/sketch/${result.res.id}`);
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

  const onTitleChange = ({ target }) => setTitleText(target.value);

  return (
    <div className="relative p-13 bg-[var(--color-background)] ">
      <Input value={titleText} onChange={onTitleChange} />
      <div
        className="h-30 mt-10 whitespace-pre-line bg-[var(--color-card-bg)]"
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
