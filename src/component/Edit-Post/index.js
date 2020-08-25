import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Mention from 'react-textarea-mention';
import Button from '../UI/Button/Button'


const EditModalBox = ({ isOpen,closeModal,users,value,setIsOpen}) => {
   const [description, setDescription] = useState()
   const [saveDisable, setSaveDisable] = useState(false)

  useEffect(() => {
      if(value){
       setDescription(value.content)
      }
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value,closeModal])

  const Validation = () => {
    if (!(description.trim())) {
      return false
    } else {
      return true
    }
  }

const handleEdit= async () => {
  if(Validation()){
      setSaveDisable(true)
  const response= await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id:value._id,
        name:value.name,
        place_id:value.place_id,
        content:description,
    })
  });
    const body = await response.text();
    setIsOpen(false)
    window.location.reload() 
    return body
    }
  }

const handleChange = (e) => {
     setDescription(e)
  }
  const onCancel=()=>{
      setDescription('')
      closeModal()
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
         onRequestClose={()=> onCancel()}
        className="Modal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
          {/* <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" />
          </button> */}
            <h3>Edit Post</h3> 
        </div>
        <div className="ContentModal">
        <label>Post Description</label>
        <Mention
         textAreaProps={{defaultValue:description}}
        onChange={handleChange}
         field="name"
         data={users}
      />
        <div className="modalButton">
              <Button onClick={()=>onCancel()} disabled={saveDisable} type="submit" className="btn btn-primary cancel">Cancel</Button>
              <Button onClick={()=>handleEdit()} type="submit" className="btn btn-primary">Save</Button>
            </div>
     </div>
        
      </Modal>
    </div >
  )
}

export default EditModalBox
