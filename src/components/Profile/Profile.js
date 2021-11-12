import React from 'react';
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkIsEmail, checkIsName } from '../../utils/utils';
import './Profile.css';

function Profile({logout, isLoading, onSubmit, onClickMenu, isMenuOpened, authorized}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [isFormEdit, setIsFormEdit] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleNameChange = (evt) => {
    setIsFormEdit(true);
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid && checkIsName(evt.target.value));
    setNameErrorMessage(evt.target.validationMessage);

    if(evt.target.validity.valid && !checkIsName(evt.target.value)) {
      setNameErrorMessage("Имя должно содержать только латинские или кириллические символы, пробел или дефис")
    }
  }

  const handleEmailChange = (evt) => {
    setIsFormEdit(true);
    setEmail(evt.target.value);
    setIsEmailValid(evt.target.validity.valid && checkIsEmail(evt.target.value));
    setEmailErrorMessage(evt.target.validationMessage);

    if(evt.target.validity.valid && !checkIsEmail(evt.target.value)) {
      setEmailErrorMessage(`Проверьте корректность указанной электронной почты`)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(name, email)
  }

  React.useEffect(() => {
    setIsFormValid(isFormEdit && name && email && isNameValid && isEmailValid && (currentUser.name !== name || currentUser.email !== email))
  }, [name, email, isNameValid, isEmailValid, currentUser, isFormEdit])

  React.useEffect(() => {
    setIsUpdating(true)
    mainApi.getCurrentUser()
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
      })
      .catch((err) => {
        console.error(`Ошибка ${err.status}`);
      })
      .finally(() => setIsUpdating(false))
  }, []);

  return (
    <>
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <main className="profile">
        {
          (isLoading || isUpdating || !currentUser.name) ? <Preloader />
          :
          <div className="profile__wrapper">

            <h1 className="visually-hidden">Страница редактирования профиля</h1>
            <form className={`form form_type_profile`} name={`profile-form`} onSubmit={handleSubmit} noValidate={true}>
              <h2 className={`form__title ${!currentUser.name ? `form__title_hidden` : ''} `}>{`Привет, ${currentUser.name}!`}</h2>
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
                    minLength="2"
                    maxLength="30"
                    required
                  />
                  <span className={`form__error ${isNameValid ? '' : 'form__error_visible'}`}>{nameErrorMessage}</span>
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
                  <span className={`form__error ${isEmailValid ? '' : 'form__error_visible'}`}>{emailErrorMessage}</span>
                </label>
              </div>
              <button
                disabled={!isFormValid ? true : ''}
                type="submit"
                className={`button form__submit-button form__submit-button_type_profile`}
                value="Редактировать"
              >
                Редактировать
              </button>
              <button onClick={logout} type="button" className="button form__button">Выйти из аккаунта</button>
            </form>
          </div>
        }
      </main>
    </>
  )
}

export default Profile;
