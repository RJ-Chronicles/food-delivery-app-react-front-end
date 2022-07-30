import classes from './Modal.module.css'
import { Fragment } from 'react'
import  ReactDOM  from 'react-dom'
const Backdrop = props =>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const portalEmelement = document.getElementById('overlays');
const Modal = props =>{
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalEmelement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalEmelement)}
        {/* <Backdrop/>
        <ModalOverlay>{props.children}</ModalOverlay>
        */}
    </Fragment> 
}

export default Modal;