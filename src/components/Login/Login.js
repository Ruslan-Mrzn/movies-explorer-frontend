import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

function Login({onSubmit}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);



  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setIsPasswordValid(evt.target.validity.valid);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsFormValid(email && password && isEmailValid && isPasswordValid)
    // onSubmit(name, email, password)
  }

  return (
    <main className="login">
      <div className="login__wrapper">
        <h1 className="visually-hidden">Страница авторизации</h1>
        <Logo />
        <form className={`form form_type_authorization`} name={`login-form`} onSubmit={handleSubmit} noValidate={true}>
          <h2 className={`form__title`}>Рады видеть!</h2>
          <div className="form__labels-block">
            <label className="form__label">
              <span className="form__label-text">E-mail</span>
              <input name="email" className="form__input" onChange={handleEmailChange} value={email || ''} type="email" autoComplete="off" placeholder="Введите почту" required/>
            </label>
            <label className="form__label">
              <span className="form__label-text">Пароль</span>
              <input name="password" className="form__input" onChange={handlePasswordChange} value={password || ''} type="password" autoComplete="off" placeholder="Введите пароль" required/>
            </label>
          </div>
          <span className={`form__error form__error_${isFormValid ? '' : 'visible'}`}>Что-то пошло не так...</span>
          <button type="submit" className={`button form__submit-button form__submit-button_type_login`} value="Войти">Войти</button>
          <p className="form__support">
            Ещё не зарегистрированы?&nbsp;
            <Link to="signup" className="link form__link">Регистрация</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login;
