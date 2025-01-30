import React from 'react';
import './Modal.css';

function Modal({ src, alt, content, isOpen, onClose, style }) {
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="modal" onClick={handleClickOutside}>
        <div className={`modal-content ${style}`}>
          <img className={`modal-image ${style}`} src={src} alt={alt} />
          <p className={`modal-text ${style}`}>{content}</p>
        </div>
      </div>
    )
  );
}

export default Modal;