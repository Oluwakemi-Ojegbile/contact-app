import React from "react";

const Modal = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal-container">
      <div className="overlay" onClick={() => props.toggleForm()}></div>
      <div className="modal_wrapper">{props.children}</div>
    </div>
  );
};
export default Modal;
