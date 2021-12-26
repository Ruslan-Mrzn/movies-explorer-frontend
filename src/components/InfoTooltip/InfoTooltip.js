import React from 'react';
import './InfoTooltip.css';

function InfoTooltip({isOpen, onClose, message}) {

  const handleEscClose = React.useCallback( (evt) => {
    if (evt.key ==='Escape') {
        onClose(false);
    }
  }, [onClose])

  const handleOverlayClose = React.useCallback( (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        onClose(false);
    }
  }, [onClose])

  const handleClose = (evt) => {
    evt.preventDefault();
    onClose(false);
  }

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('click', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('click', handleOverlayClose);
    }
  }, [isOpen, handleEscClose, handleOverlayClose])

  return (
    <article className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__info-text">
          {message}
        </p>
        <button type="button" onClick={handleClose} className="popup__close-button" value="закрыть форму" title="закрыть"></button>
      </div>
    </article>
  );
}

export default InfoTooltip;
