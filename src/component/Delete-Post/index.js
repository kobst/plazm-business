import React from 'react'
import Modal from 'react-modal'
import crossIocn from '../../images/cross-black.svg'

// import closeIcon from '../../images/close-icon.svg'

import Button from '../UI/Button/Button'

const DeleteModalBox = ({ isOpen,closeModal,postId,setDeleteOpen}) => {


  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post-delete`, {
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
    return body

  }


 const onCancel=()=>{
     closeModal()
 }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
         onRequestClose={()=> closeModal()}
        className="Modal editModal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
            <h3>Delete Post</h3> 
            <Button onClick={() => onCancel()} type="submit" className="btn btn-primary cancel"><img src={crossIocn} alt="Delete" /></Button>
        </div>
        <div className="ContentModal">
        <label>Are you sure you want to delete the post?</label>
        <div className="modalButton">
              <Button onClick={()=>handleDelete()}  type="submit" className="btn btn-primary">Delete</Button>
            </div>
     </div>
        
      </Modal>
    </div >
  )
}

export default DeleteModalBox
