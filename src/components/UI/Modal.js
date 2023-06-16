import './Modal.css';
import {Fragment} from 'react';
import ReactDOM from 'react-dom'


const Backdrop=(props)=>{
    return <div className='backdrop' onClick={props.onCloseCart}></div>
}
const ModalOverlay=(props)=>{
    return(
        <div className='modal'>
            <div className='content'>{props.children}</div>
        </div>
    )
}

const portalElememt=document.getElementById('overlays');

const Modal=(props)=>{
    return (
        <Fragment>
       {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>,portalElememt)}
       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElememt)}
        </Fragment>
    )
}

export default Modal;
