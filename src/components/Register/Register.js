import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({onSubmit}) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid);
  }

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
    setIsFormValid(name && email && password && isNameValid && isEmailValid && isPasswordValid)
    // onSubmit(name, email, password)
  }

  return (
    <main className="register">
      <div className="register__wrapper">
        <h1 className="visually-hidden">Страница регистрации</h1>
        <Logo />
        <form className={`form form_type_authorization`} name={`register-form`} onSubmit={handleSubmit} noValidate={true}>
          <h2 className={`form__title`}>Добро пожаловать!</h2>
          <div className="form__labels-block">
            <label className="form__label">
              <span className="form__label-text">Имя</span>
              <input name="name" className="form__input" onChange={handleNameChange} value={name || ''} type="text" autoComplete="off" placeholder="Введите имя" required/>
            </label>
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
          <button type="submit" className={`button form__submit-button form__submit-button_type_register`} value="Зарегистрироваться">Зарегистрироваться</button>
          <p className="form__support">
            Уже зарегистрированы?&nbsp;
            <Link to="signin" className="link form__link">Войти</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register;
