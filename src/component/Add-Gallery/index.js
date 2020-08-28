import React from 'react'
import Modal from 'react-modal'

// import closeIcon from '../../images/close-icon.svg'

import Button from '../UI/Button/Button'

const GallerModalBox = ({ isOpen,closeModal}) => {




  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
         onRequestClose={()=> closeModal()}
        className="Modal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
          {/* <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" />
          </button> */}
            <h3>Delete Postdfsfsfsfsf</h3> 
        </div>
        <div className="ContentModal">
        <label>Are you sure you want to delete the post?</label>
        <div className="modalButton">
              <Button onClick={()=>closeModal()}  type="submit" className="btn btn-primary cancel">Cancel</Button>
            </div>
     </div>
        
      </Modal>
    </div >
  )
}

export default GallerModalBox
