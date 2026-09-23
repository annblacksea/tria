import { useSelector } from 'react-redux';
import { ROLE } from '../constants/roles';
import { selectUserID, selectUserRole } from '../selectors';

export const useAccess = (accessesRoles = [], ownerID) => {
  const currentUserRole = useSelector(selectUserRole) || ROLE.GUEST;
  const currentUserID = useSelector(selectUserID);
  const whoCanSee = [...accessesRoles, ROLE.ADMIN];
  const isOwner = currentUserID === ownerID;
  const hasRoleAccess = whoCanSee.includes(currentUserRole);
  const ownerAccess = ownerID && isOwner;

  return hasRoleAccess || ownerAccess;
};
