import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import './Register.css';

import { checkIsEmail, checkIsName } from '../../utils/utils';

function Register({onSubmit, isLoading}) {

  const history = useHistory();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [isLoadingPage, SetIsLoadingPage] = React.useState(true);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid && checkIsName(evt.target.value));
    setNameErrorMessage(evt.target.validationMessage);

    if(evt.target.validity.valid && !checkIsName(evt.target.value)) {
      setNameErrorMessage(`Имя должно содержать только латинские или кириллические символы, пробел или дефис`)
    }
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid && checkIsEmail(evt.target.value));
    setEmailErrorMessage(evt.target.validationMessage);

    if(evt.target.validity.valid && !checkIsEmail(evt.target.value)) {
      setEmailErrorMessage(`Проверьте корректность указанной электронной почты`)
    }
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setIsPasswordValid(evt.target.validity.valid);
    setPasswordErrorMessage(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(name, email, password)
  }

  React.useEffect(() => {
    setIsFormValid(name && email && password && isNameValid && isEmailValid && isPasswordValid)
  }, [name, email, password, isNameValid, isEmailValid, isPasswordValid])

  React.useEffect(() => {
    mainApi.getCurrentUser()
      .then((user) => {
        if(!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== JSON.stringify(user)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        history.push('/movies')
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status}`, `${err.status === 500 ? 'Сервер временно недоступен' : 'Пожалуйста, зарегистрируйтесь или авторизуйтесь' }`)
      })
      .finally(() => SetIsLoadingPage(false))
  }, [history])

  return (

    !isLoadingPage &&

    <main className="register">
      <div className="register__wrapper">
        <h1 className="visually-hidden">Страница регистрации</h1>
        <Logo />
        {
          isLoading ? <Preloader />
          :
          <form className={`form form_type_authorization`} name={`register-form`} onSubmit={handleSubmit} noValidate={true}>
            <h2 className={`form__title`}>Добро пожаловать!</h2>
            <div className="form__labels-block">
              <label className="form__label">
                <span className="form__label-text">Имя</span>
                <input
                  name="name"
                  className="form__input"
                  onChange={handleNameChange}
                  value={name || ''}
                  type="text"
                  autoComplete="off"
                  placeholder="Введите имя"
                  minLength="2" maxLength="30"
                  required
                />
                <span className={`form__error form__error_${isNameValid ? '' : 'visible'}`}>{nameErrorMessage}</span>
              </label>
              <label className="form__label">
                <span className="form__label-text">E-mail</span>
                <input
                  name="email"
                  className="form__input"
                  onChange={handleEmailChange}
                  value={email || ''}
                  type="email"
                  autoComplete="off"
                  placeholder="Введите почту"
                  required
                />
                <span className={`form__error form__error_${isEmailValid ? '' : 'visible'}`}>{emailErrorMessage}</span>
              </label>
              <label className="form__label">
                <span className="form__label-text">Пароль</span>
                <input
                  name="password"
                  className="form__input"
                  onChange={handlePasswordChange}
                  value={password || ''}
                  type="password"
                  autoComplete="off"
                  placeholder="Введите пароль"
                  minLength="4"
                  required
                />
                <span className={`form__error form__error_${isPasswordValid ? '' : 'visible'}`}>{passwordErrorMessage}</span>
              </label>
            </div>
            <button
              disabled={!isFormValid ? true : ''}
              type="submit"
              className={`button form__submit-button form__submit-button_type_register`}
              value="Зарегистрироваться"
            >
              Зарегистрироваться
            </button>
            <p className="form__support">
              Уже зарегистрированы?&nbsp;
              <Link to="signin" className="link form__link">Войти</Link>
            </p>
          </form>
        }
      </div>
    </main>
  )
}

export default Register;
