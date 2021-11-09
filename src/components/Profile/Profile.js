import React from 'react';
// import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Preloader from '../Preloader/Preloader';
import './Profile.css';

function Profile({logout, isLoading, onSubmit, onClickMenu, isMenuOpened, authorized}) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid);
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsFormValid(email && name && isEmailValid && isNameValid)
    // onSubmit(name, email, password)
  }

  return (
    <>
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      {
        isLoading ? <Preloader />
        :
        <main className="profile">
          <div className="profile__wrapper">
            <h1 className="visually-hidden">Страница редактирования профиля</h1>
            <form className={`form form_type_profile`} name={`profile-form`} onSubmit={handleSubmit} noValidate={true}>
              <h2 className={`form__title`}>Привет, Виталий!</h2>
              <div className="form__labels-block">
                <label className="form__label">
                  <span className="form__label-text">Имя</span>
                  <input name="name" className="form__input" onChange={handleNameChange} value={name || ''} type="text" autoComplete="off" placeholder="Введите имя" required/>
                </label>
                <label className="form__label">
                  <span className="form__label-text">E-mail</span>
                  <input name="email" className="form__input" onChange={handleEmailChange} value={email || ''} type="email" autoComplete="off" placeholder="Введите почту" required/>
                </label>
              </div>
              <span className={`form__error form__error_${isFormValid ? '' : 'visible'}`}>Что-то пошло не так...</span>
              <button type="submit" className={`button form__submit-button form__submit-button_type_profile`} value="Редактировать">Редактировать</button>
              <button onClick={logout} type="button" className="button form__button">Выйти из аккаунта</button>
            </form>
          </div>
        </main>
      }
    </>
  )
}

export default Profile;
