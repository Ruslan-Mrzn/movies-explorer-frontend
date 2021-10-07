import React from "react";

import './Header.css';

function Header({bgColor, isMenuOpened, children}) {
  return (
    <header className={`header header_type_${bgColor ? 'colored' : 'uncolored'} header_overflow_${isMenuOpened ? 'visible' : 'hidden'}`}>
      <div className="header__wrapper">
        {children}
      </div>
    </header>
  );
}

export default Header;
