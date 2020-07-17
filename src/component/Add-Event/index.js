import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import closeIcon from '../../images/close-icon.svg'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import DateTimePicker from 'react-datetime-picker';


Modal.setAppElement('#root')




const AddModalBox = ({isOpen,value,data,editValue,setEdit,setIsOpen,closeModal }) => {
  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const [id,setId]= useState()
  const [start,setStart] = useState()
  const [end,setEnd] = useState()
  const [recurring,setRecurring]= useState('daily')
  // const [titleError,setTitleError]= useState()
  // const [startError,setStartError]= useState()
  // const [endError,setEndError]= useState()

  useEffect(()=> {
    if(typeof value !== 'undefined'){
      if(value.id){
      setId(value.id)
      }
    if(value.title){
      setTitle(value.title)
    }
    if(value.start){
      setStart(value.start)
    }
    if(value.end){
      setEnd(value.end)
    }
  }
  },[value])


  const addEvent = async () => {
    const response= await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:title,
          place_id:data._id,
          scheduledEvent:"yes",
          recurring:recurring,
          start_time:start,
          end_time:end
      })
    });
      const body = await response.text();
      window.location.reload() 
      return body

}
const handleEdit= async () => {
  const response= await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id:id,
        name:title,
        place_id:data._id,
        scheduledEvent:"yes",
        recurring:recurring,
        start_time:start,
        end_time:end
    })
  });
    const body = await response.text();
    window.location.reload() 
    console.log(body)
    return body

}

const handleDelete= async()=> {
  const response= await fetch(`${process.env.REACT_APP_API_URL}/api/item-delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     id:id
  })
});
  const body = await response.text();
  window.location.reload() 
  return body

}


const handleSubmit = () => {
  setIsOpen(false)
  setEdit(false)
  addEvent()

}

// const Validation = () => {
//   if(!title){
//       setTitleError(true)
//   }
//   if(!start){
//       setStartError(true)
//   }
//   if(!end){
//     setEndError(true)
//   }
//   if(start && end && title){
//       return true
//   }

// }
  

  const handleChange = (e) => {
    if (e.target.id === 'title') {
        setTitle(e.target.value)
    }
    else if (e.target.id === 'desc') {
      setDescription(e.target.value)
}
    else if (e.target.id === 'start') {
        setStart(e.target.value)
      }
     else if (e.target.id === 'end') {
      setEnd(e.target.value)
    } else if (e.target.id === 'recurring') {
      setRecurring(e.target.value)
    } 
   } 
   const onChange = (e,val) => {
     if(val==='start'){
     setStart(e)}
   
     else{
     setEnd(e)
     }
  }


  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
          <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" />
          </button>
          {editValue?
          <h3>Edit Event</h3>:
          <h3>Add New Event</h3>}
        </div>
        <div className="ContentModal">
          <label>Add Title</label>
        <Input type="text" id='title' placeholder="Title" value={title}  onChange={ (e) => handleChange(e)} />
        <label>Description</label>
        <Input type="text" id='desc' placeholder="Description" value={description}  onChange={ (e) => handleChange(e)} />
        <label>Start Date</label>
        <DateTimePicker
          onChange={(e) => onChange(e,'start')}
          value={start}
        />
        <br/>
        <label>End Date</label>
        <DateTimePicker
          onChange={(e) => onChange(e,'end')}
          value={end}
        />
        <br/>
        <label>Recurring</label>
        <br/>
        <select id='recurring' value={recurring} onChange={e => handleChange(e)}>
            <option selected="selected" value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="mondayFriday">Monday-Friday</option>
          </select>
          <br/>
          {!editValue ?
          <>
        <Button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Save</Button>
        <br/>
        <Button onClick={closeModal} type="submit" className="btn btn-primary">Cancel</Button>
        </>:
        <>
        <Button onClick={() => handleEdit()} type="submit" className="btn btn-primary">Save</Button>
        <br/>
        <Button onClick={() => handleDelete()} type="submit" className="btn btn-primary">Delete</Button>
        </>}
        </div>
      </Modal>
    </div>
  )
}

export default AddModalBox
