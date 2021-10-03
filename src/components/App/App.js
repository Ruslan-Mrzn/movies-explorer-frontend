import React from "react";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';


function App() {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  const onClickMenu = (isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
  }


  return (
    // <Main />
    <Movies authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />

  );
}

export default App;
