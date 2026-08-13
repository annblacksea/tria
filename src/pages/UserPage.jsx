import { useParams } from 'react-router-dom';
import { H2 } from '../components';
import { selectUserID } from '../selectors';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const params = useParams();
  const pageOwnerId = params.id;
  const currentUserId = useSelector(selectUserID);
  const isOwner = pageOwnerId === currentUserId;
  return (
    <section className="container">
      <H2>Owner: {pageOwnerId}</H2>
      <H2>currentUser: {currentUserId}</H2>
      <H2>isOwner: {String(isOwner)}</H2>
    </section>
  );
};
