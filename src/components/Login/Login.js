import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import './Login.css';

import { checkIsEmail } from '../../utils/utils';

function Login({onSubmit, isLoading}) {

  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid && checkIsEmail(evt.target.value));
    setEmailErrorMessage(evt.target.validationMessage);

  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setIsPasswordValid(evt.target.validity.valid);
    setPasswordErrorMessage(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(email, password)
  }

  React.useEffect(() => {
    setIsFormValid(email && password && isEmailValid && isPasswordValid)
  }, [email, isEmailValid, isPasswordValid, password])

  React.useEffect(() => {
    mainApi.getCurrentUser()
      .then(() => history.push('/movies'))
  }, [history])

  return (
    <main className="login">
      <div className="login__wrapper">
        <h1 className="visually-hidden">Страница авторизации</h1>
        <Logo />
        {
          isLoading ? <Preloader />
          :
          <form className={`form form_type_authorization`} name={`login-form`} onSubmit={handleSubmit} noValidate={true}>
            <h2 className={`form__title`}>Рады видеть!</h2>
            <div className="form__labels-block">
              <label className="form__label">
                <span className="form__label-text">E-mail</span>
                <input name="email" className="form__input" onChange={handleEmailChange} value={email || ''} type="email" autoComplete="off" placeholder="Введите почту" required/>
                <span className={`form__error form__error_${isEmailValid ? '' : 'visible'}`}>{emailErrorMessage}</span>
              </label>
              <label className="form__label">
                <span className="form__label-text">Пароль</span>
                <input name="password" className="form__input" onChange={handlePasswordChange} value={password || ''} type="password" autoComplete="off" placeholder="Введите пароль" minLength="4" required/>
                <span className={`form__error form__error_${isPasswordValid ? '' : 'visible'}`}>{passwordErrorMessage}</span>
              </label>
            </div>
            <button disabled={!isFormValid ? true : ''} type="submit" className={`button form__submit-button form__submit-button_type_login`} value="Войти">Войти</button>
            <p className="form__support">
              Ещё не зарегистрированы?&nbsp;
              <Link to="signup" className="link form__link">Регистрация</Link>
            </p>
          </form>
        }
      </div>
    </main>
  )
}

export default Login;
