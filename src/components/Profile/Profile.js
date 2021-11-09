import React from 'react';
// import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkIsEmail } from '../../utils/utils';

import './Profile.css';

function Profile({logout, isLoading, onSubmit, onClickMenu, isMenuOpened, authorized}) {

  const currentUser = React.useContext(CurrentUserContext);

  console.log(currentUser);
  //const [user, setUser] = React.useState({});
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  console.log(name);
  console.log(email);
  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid && currentUser.name !== evt.target.value);
    setNameErrorMessage(evt.target.validationMessage);
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid && checkIsEmail(evt.target.value) && currentUser.email !== evt.target.value);
    setEmailErrorMessage(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(name, email)
  }

  React.useEffect(() => {
    setIsFormValid(name && email && isNameValid && isEmailValid)
  }, [name, email, isNameValid, isEmailValid])

  React.useEffect(() => {
    mainApi.getCurrentUser()
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
      })
      .catch((err) => {
        console.error(`Ошибка ${err.status}`);
      })
  }, []);

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
                  <input name="name" className="form__input" onChange={handleNameChange} value={name || ''} type="text" autoComplete="off" placeholder="Введите имя" minLength="2" maxLength="30" required/>
                  <span className={`form__error form__error_${isNameValid ? '' : 'visible'}`}>{nameErrorMessage}</span>
                </label>
                <label className="form__label">
                  <span className="form__label-text">E-mail</span>
                  <input name="email" className="form__input" onChange={handleEmailChange} value={email || ''} type="email" autoComplete="off" placeholder="Введите почту" required/>
                  <span className={`form__error form__error_${isEmailValid ? '' : 'visible'}`}>{emailErrorMessage}</span>
                </label>
              </div>
              <span className={`form__error form__error_${isFormValid ? '' : 'visible'}`}>Что-то пошло не так...</span>
              <button disabled={!isFormValid ? true : ''} type="submit" className={`button form__submit-button form__submit-button_type_profile`} value="Редактировать">Редактировать</button>
              <button onClick={logout} type="button" className="button form__button">Выйти из аккаунта</button>
            </form>
          </div>
        </main>
      }
    </>
  )
}

export default Profile;
