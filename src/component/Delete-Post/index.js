import React from 'react'
import Modal from 'react-modal'

// import closeIcon from '../../images/close-icon.svg'

import Button from '../UI/Button/Button'

const DeleteModalBox = ({ isOpen,closeModal,postId,setDeleteOpen}) => {


  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/item-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: postId
      })
    });
    const body = await response.text();
    setDeleteOpen(false)
   window.location.reload()
    return body

  }

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
            <h3>Delete Post</h3> 
        </div>
        <div className="ContentModal">
        <label>Are you sure you want to delete the post?</label>
        <div className="modalButton">
              <Button onClick={()=>closeModal()}  type="submit" className="btn btn-primary cancel">Cancel</Button>
              <Button onClick={()=>handleDelete()}  type="submit" className="btn btn-primary">Delete</Button>
            </div>
     </div>
        
      </Modal>
    </div >
  )
}

export default DeleteModalBox
