import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
// import Mention from 'react-textarea-mention';
import Button from '../UI/Button/Button'
import crossIocn from '../../images/cross-black.svg'
import Label from '../UI/Label/label'
import Gallery from '../UI/Gallery'
import { MentionsInput, Mention } from 'react-mentions'


const EditModalBox = React.memo(({ isOpen,closeModal,users,value,setIsOpen,message,user}) => {
   const [description, setDescription] = useState()
   const [image,setImage]= useState([])
   const [mentionArray,setMentionArray]= useState([])

  useEffect(() => {
      if(value){
       setDescription(value.data)
       setImage(value.media)
       if(value.taggedUsers){
         const arrayValue = []
        value.taggedUsers.map(v=> arrayValue.push(v._id))
         setMentionArray(arrayValue)
       }
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
  const response= await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id:value._id,
        business:value.business,
        data:description,
        media:image,
        taggedUsers:mentionArray,
    })
    
  });
    const body = await response.text();
    message.send(
      JSON.stringify({
        action: "post",
        businessId: user._id
      })
    )
    setIsOpen(false)
    return body
    }
  }

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    const valueArr= mentionArray
    if(mentions.length!==0){
    valueArr.push(mentions[0].id)
    setMentionArray(valueArr)
    }
    setDescription(newPlainTextValue)
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
        className="Modal editModal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
            <h3>Edit Post</h3> 
            <Button onClick={() => onCancel()} type="submit" className="btn btn-primary cancel"><img src={crossIocn} alt="Delete" /></Button>
        </div>
        <div className="ContentModal">
        <Label name="Post Description"/>
        <MentionsInput markup="@{{__type__||__id__||__display__}}" value={description} onChange={handleChange} className="mentions">
                <Mention
                  type="user"
                  trigger="@"
                  data={users}
                  className="mentions__mention"
                />
                  </MentionsInput>
        {/* <Mention
         textAreaProps={{defaultValue:description}}
        onChange={handleChange}
         field="name"
         data={users}
      /> */}
      <div className="Image_wrap">
      <Gallery name={user.company_name} type="edit" image={image} setImage={setImage}/>
      </div>
        <div className="modalButton">
              <Button onClick={()=>handleEdit()} type="submit" className="btn btn-primary">Save</Button>
            </div>
     </div>
        
      </Modal>
    </div >
  )
})

export default EditModalBox
