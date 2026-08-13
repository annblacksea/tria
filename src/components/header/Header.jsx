import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserSession } from '../../selectors';
import { logout } from '../../slices/user-slice';
import { ControlPanel } from '../control-panel/ControlPanel';
import { useServerRequest } from '../../hooks/use-server-request';

export const Header = () => {
  const userLogin = useSelector(selectUserLogin);
  const userData = useSelector(({ user }) => user.userData);
  const userSession = useSelector(selectUserSession);
  const requestServer = useServerRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="container bg-components rounded-4xl px-15 py-3 flex items-center justify-between ">
      <Logo />
      <div>
        {!userSession ? (
          <Link to="/auth">Войти</Link>
        ) : (
          <div className="flex gap-5">
            <ControlPanel />
            <div className="flex flex-col items-center">
              <Link to={`/profile/${userData.id}`}>{userLogin}</Link>
              <button
                onClick={() => {
                  requestServer('logout', userSession);
                  dispatch(logout());
                  navigate(`/`);
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        )}
        {console.log(userSession, userData)}
      </div>
    </header>
  );
};
