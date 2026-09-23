import { useAccess } from '../../hooks';
import { ROLE } from '../../constants/roles';
import { Icon } from '../icon/Icon';

export const ControlPanel = () => {
  const canSeeUsersIcon = useAccess([ROLE.MODERATOR]);

  return (
    <nav className="flex items-center gap-2 text-2xl">
      <Icon to={'/create-sketch'} iconName={'plus'} text={'Создать публикацию'} />
      {canSeeUsersIcon && <Icon iconName={'users'} text={'Список пользователей'} to={'/users'} />}
    </nav>
  );
};
