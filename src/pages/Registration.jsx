import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, TextButton, H2, Input } from '../components';
import { server } from '../bff/server';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../hooks/use-server-request';

const validateRegisterScheme = yup.object().shape({
  login: yup
    .string()
    .required('введите логин')
    .matches(
      /^[a-z0-9.-]*$/,
      'может содержать только строчные латинские буквы, цифры, точку и дефис'
    )
    .matches(/^[^A-Z]*$/, 'должен содержать только строчные (маленькие) буквы')
    .matches(/^[^0-9].*$/, 'не может начинаться с цифры')
    .matches(/^((?![.-]{2}).)*$/, 'точка и дефис не могут быть подряд')
    .matches(
      /^(?![.-])[a-z0-9.-]*(?<![.-])$/,
      'не может начинаться или заканчиваться на точку или дефис'
    )
    .max(13, 'должен не больше 13 символов')
    .min(4, 'должен быть длиннее 3 символов'),
  password: yup
    .string()
    .required('введите пароль')
    .matches(/^[A-Za-z0-9]*$/, 'должен содержать только латинские буквы и цифры')
    .matches(/^(?=.*[a-z])/, 'должна быть хотя бы одна строчная буква')
    .matches(/^(?=.*[A-Z])/, 'должна быть хотя бы одна заглавная буква')
    .matches(/^(?=.*\d)/, 'должна быть хотя бы одна цифра')
    .max(15, 'должен быть не больше 15 символов')
    .min(6, 'должен длиннее 6 символов'),
  passcheck: yup
    .string()
    .required('повторите пароль')
    .oneOf([yup.ref('password'), null], 'повтор пароля не совпадает'), //проверка введенного пароля
});

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(validateRegisterScheme),
    mode: 'onChange', //нужно подумать, когда выводить ошибки, решу позже)
  });

  const [regError, setRegError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverRequest = useServerRequest();

  const onSubmit = async ({ login, password }) => {
    setRegError(null);
    try {
      const result = await server.register(login, password);
      if (result?.error) {
        setRegError(result.error);
        return;
      }
      console.log(result);
      dispatch(setUser(result.res));
      navigate(`/profile/${result.res?.userData.id}`);
    } catch (error) {
      setRegError('Что-то пошло не так');
    }
  };

  const isButtonDisabled = !isValid || isSubmitting || !isDirty;

  return (
    <section className="container h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-200 h-[60vh] p-15 bg-[#9ec0c0] rounded-4xl shadow-2xl">
        <H2 className="text-center">Регистрация</H2>
        {(isSubmitting && <p>Загрузка...</p>) || (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              name="login"
              {...register('login', { onChange: () => setRegError(null) })}
            />
            {errors.login && <p>{errors.login.message}</p>}
            <Input
              type="password"
              name="password"
              {...register('password', { onChange: () => setRegError(null) })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              type="password"
              name="passcheck"
              {...register('passcheck', { onChange: () => setRegError(null) })}
            />
            {errors.passcheck && <p>{errors.passcheck.message}</p>}

            <TextButton type="submit" disabled={isButtonDisabled}>
              Зарегистрироваться
            </TextButton>
            {regError && <p>{regError}</p>}
          </Form>
        )}
      </div>
    </section>
  );
};
