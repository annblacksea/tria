import { TextButton } from '../buttons/TextButton';

export const Pagination = ({ setPage, currentPage, lastPage }) => {
  return (
    <div className="py-7">
      <ul className="flex justify-center items-center gap-3 ">
        <li>
          <TextButton disabled={currentPage === 1} onClick={() => setPage(1)}>
            Первая
          </TextButton>
        </li>
        <li>
          <TextButton disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            Предыдущая
          </TextButton>
        </li>
        <li>
          <p>{currentPage}</p>
        </li>
        <li>
          <TextButton disabled={currentPage === lastPage} onClick={() => setPage(currentPage + 1)}>
            Следующая
          </TextButton>
        </li>
        <li>
          <TextButton disabled={currentPage === lastPage} onClick={() => setPage(lastPage)}>
            Последняя
          </TextButton>
        </li>
      </ul>
    </div>
  );
};
