import React from 'react';

function Modal(props) {
  let overlayClass = 'overlay center' + ((props.show) ? '' : ' invisible');
  return (
    <div className={overlayClass}>
      <div className="modal">
        <div className="modal-top">
          <span onClick={props.onQuit} className="press">
            <i className="fa fa-times"> </i>
          </span>
        </div>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
