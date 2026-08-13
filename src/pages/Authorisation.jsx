import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/user-slice';
import { Form, TextButton, Input, H2 } from '../components';
import { useServerRequest } from '../hooks/use-server-request';

const validateAuthScheme = yup.object().shape({
  login: yup.string().required('Введите логин').min(3, 'Слишком короткий логин'),
  password: yup.string().required('Введите пароль').min(6, 'Пароль слишком короткий'),
});

export const Authorisation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(validateAuthScheme),
    mode: 'onChange', //нужно подумать, когда выводить ошибки, решу позже
  });

  const [authError, setAuthError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverRequest = useServerRequest();

  const onSubmit = async ({ login, password }) => {
    setAuthError(null);

    try {
      const result = await serverRequest('authorize', login, password);

      if (result?.error) {
        setAuthError(result.error);
        return;
      }

      dispatch(setUser(result.res));
      navigate('/');
    } catch (error) {
      setAuthError(error.error);
    }
  };

  const isButtonDisabled = !isValid || isSubmitting || !isDirty;

  return (
    <section className="container h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-200 h-[60vh] p-15 bg-[#9ec0c0] rounded-4xl shadow-2xl">
        <H2 className="text-center">Авторизация</H2>
        {(isSubmitting && <p>Загрузка...</p>) || (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              name="login"
              {...register('login', { onChange: () => setAuthError(null) })}
            />
            {errors.login && <p>{errors.login.message}</p>}
            <Input
              type="password"
              name="password"
              {...register('password', { onChange: () => setAuthError(null) })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <TextButton type="submit" disabled={isButtonDisabled}>
              Войти
            </TextButton>
            {authError && <p>{authError}</p>}
          </Form>
        )}
        <Link to="/registration">Регистрация</Link>
      </div>
    </section>
  );
};
