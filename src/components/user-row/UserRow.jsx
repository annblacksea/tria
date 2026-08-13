import { useSelector } from 'react-redux';
import { ROLE } from '../../constants/roles';
import { selectUserRole } from '../../selectors';
import { CheckAccess } from '../check-access/CheckAccess';
import { useState } from 'react';
import { Icon } from '../icon/Icon';
import { useServerRequest } from '../../hooks';

export const UserRow = ({ login, roleId, roles, onUserRemove, userId }) => {
  const adminRole = useSelector(selectUserRole);
  const requestServer = useServerRequest();
  const [initialRoleId, setInitialRoleId] = useState(roleId);
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);

  const isSaveButtonDisabled = +selectedRoleId === +initialRoleId;

  const onRoleChange = ({ target }) => {
    console.log(typeof target.value);
    setSelectedRoleId(target.value);
  };

  const onRoleSave = async (userId, newUserRole) => {
    try {
      const { res, error } = await requestServer('saveUserUpdates', userId, {
        role_id: newUserRole,
      });

      if (error) {
        console.error(error);
        return;
      } else {
        setInitialRoleId(selectedRoleId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchRoleName = (searchedId) => {
    const role = roles.find(({ id, name }) => searchedId === id);
    return role.name;
  };

  return (
    <li className="grid grid-cols-[1fr_150px_80px]">
      <div className="flex items-center gap-4">
        <p className="flex gap-5">
          {login}
          {adminRole === ROLE.MODERATOR && <span>({searchRoleName(roleId)})</span>}
        </p>
        <CheckAccess>
          <Icon onClick={onUserRemove} iconName={'trash-o'} text={'Удалить пользователя'} />
        </CheckAccess>
      </div>

      <CheckAccess>
        <select value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id: roleId, name: roleName }) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>
        <Icon
          iconName={'floppy-o'}
          text={'Сохранить новую роль пользователя'}
          disabled={isSaveButtonDisabled}
          onClick={() => onRoleSave(userId, selectedRoleId)}
        />
      </CheckAccess>
    </li>
  );
};
