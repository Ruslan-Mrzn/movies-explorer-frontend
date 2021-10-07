import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation"
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

import './Main.css';

function Main({onClickMenu, isMenuOpened, authorized}) {
  return (
    <>
      <Header bgColor={true} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation autorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
