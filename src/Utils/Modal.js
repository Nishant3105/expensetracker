import ReactDOM from 'react-dom'

const ModalOverlay=(props)=>{
    return (
        <div>{props.children}</div>
    )
}

const Modal = (props) => {
    const portalELement=document.getElementById('profile-modal')
  return (
    ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay> ,portalELement)
  )
}

export default Modal