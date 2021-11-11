import React from "react";
import './NotFound.css';

const NotFound = ({goBack}) => {

  return (
    <>
      <main className="not-found">
        <p className="not-found__text">
          <span className="not-found__accent">404</span>
          <span className="not-found__not-found">Страница не найдена</span>
        </p>
        <button onClick={goBack} className="button not-found__go-back">Назад</button>
      </main>

    </>
  );
}

export default NotFound;
