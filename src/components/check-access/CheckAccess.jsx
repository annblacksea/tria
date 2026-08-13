import { useSelector } from 'react-redux';
import { ROLE } from '../../constants/roles';
import { selectUserRole } from '../../selectors';

export const CheckAccess = ({ accessesRoles = [], children, isOwner = false }) => {
  const currentUserRole = useSelector(selectUserRole) ?? ROLE.GUEST;
  const whoCanSee = [...accessesRoles, ROLE.ADMIN];

  const hasAccess = whoCanSee.includes(currentUserRole);

  if (hasAccess || isOwner) {
    return <>{children}</>;
  }

  return null;
};
