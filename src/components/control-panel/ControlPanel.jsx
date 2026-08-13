import { ROLE } from '../../constants/roles';
import { CheckAccess } from '../check-access/CheckAccess';
import { Icon } from '../icon/Icon';

export const ControlPanel = () => {
  return (
    <nav className="flex items-center gap-2 text-2xl">
      <Icon
        componentType={'link'}
        to={'/create-sketch'}
        iconName={'plus'}
        text={'Создать публикацию'}
      />
      <CheckAccess accessesRoles={[ROLE.MODERATOR]}>
        <Icon iconName={'users'} text={'Список пользователей'} to={'/users'} />
      </CheckAccess>
    </nav>
  );
};
