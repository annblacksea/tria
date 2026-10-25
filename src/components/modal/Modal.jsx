import { useDispatch, useSelector } from 'react-redux';
import { TextButton } from '../buttons/TextButton';
import { selectModalConfirmData, selectModalIsOpen, selectModalOnConfirm } from './../../selectors';
import { closeModal } from '../../slices/modal-slice';
import { useServerRequest } from '../../hooks';
import { removeCommentAsync } from '../../thunks';

export const Modal = () => {
  const isOpen = useSelector(selectModalIsOpen);
  const onConfirm = useSelector(selectModalOnConfirm);
  const confirmData = useSelector(selectModalConfirmData);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  let handleConfirm = null;
  let text = '';

  if (!isOpen) {
    return null;
  }

  switch (onConfirm) {
    case 'DELETE_COMMENT':
      handleConfirm = () => {
        dispatch(removeCommentAsync(requestServer, confirmData.authorId, confirmData.id));
        dispatch(closeModal());
      };
      text = 'Вы действительно хотите удалить комментарий?';
      break;

    default:
      dispatch(closeModal());
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center  bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col justify-between w-full max-w-200 h-[60vh] p-15 bg-[#9ec0c0] rounded-4xl shadow-2xl">
        <h3 className="text-center">{text}</h3>
        <div className="flex justify-between mt-auto">
          <TextButton onClick={handleConfirm}>Да</TextButton>
          <TextButton onClick={() => dispatch(closeModal())}>Отмена</TextButton>
        </div>
      </div>
    </div>
  );
};
