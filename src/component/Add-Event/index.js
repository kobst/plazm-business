import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
// import closeIcon from '../../images/close-icon.svg'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import DateTimePicker from 'react-datetime-picker';
import {getMessage} from '../../config'
import moment from 'moment'

import styled from 'styled-components'

const DatePicker = styled.div`
padding:0px;
border-bottom: 1px solid #dddd;
margin-bottom:15px;
border-color: ${props => (props.active ? 'red':null)};
label{
  color: #757575;
  font-size: 14px;
  margin:0 10px 0 0;
}

`

Modal.setAppElement('#root')
moment.updateLocale('en-gb', {
  calendar : {
      lastDay : '[Yesterday at] HH:mm',
      sameDay : '[Today at] HH:mm',
      nextDay : '[Tomorrow at] HH:mm',
      lastWeek : '[last] dddd [at] HH:mm',
      nextWeek : 'dddd [at] HH:mm',
      sameElse : 'L'
  }
})

const renderMessage = getMessage()
const AddModalBox = ({ isOpen,events,value, data, editValue, setEdit, setIsOpen, closeModal }) => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [id, setId] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [recurring, setRecurring] = useState('Daily')
  // const [valid,setValid]= useState(true)
  const [error,setError]= useState(false)
  const [message,setMessageError]= useState()
  const [titleError,setTitleError]= useState(false)
  const [startError,setStartError]= useState(false)
  const [endError,setEndError]= useState(false)

  useEffect(() => {
    if (typeof value !== 'undefined') {
      if (value.id) {
        setId(value.id)
        findContent(value.id)
      }
      if (value.title) {
        setTitle(value.title)
      }
      if (value.start) {
        setStart(value.start)
      }
      if (value.end) {
        setEnd(value.end)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value,closeModal])

  useEffect(() => {
   if(editValue===false){
    setTitle('')
    setDescription('')
    setStart('')
    setRecurring('Daily')
    setEnd('')
     }
  }, [editValue,isOpen])
 
  const findContent=(id)=> {

   const val = events.find(v=>v._id===id)
   setDescription(val.content)
   setRecurring(val.eventSchedule.recurring)
  }

  const addEvent = async () => {
    if(Validation()){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        place_id: data._id,
        content:description,
        scheduledEvent: "yes",
        recurring: recurring,
        start_time: start,
        end_time: end
      })
    });
    const body = await response.text();
    setIsOpen(false)
    setEdit(false)
    window.location.reload()
    return body
  }

}
const handleEdit= async () => {
  if(Validation()){
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
        content:description,
        recurring:recurring,
        start_time:start,
        end_time:end
    })
  });
    const body = await response.text();
    setIsOpen(false)
    setEdit(false)
    window.location.reload() 
    return body
}
  }

  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/item-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    });
    const body = await response.text();
    setIsOpen(false)
    setEdit(false)
   window.location.reload()
    return body

  }


  const Validation = () => {
    if(!title){
        setTitleError(true)
    }
    if(!start){
        setStartError(true)
    }
    if(!end){
      setEndError(true)
    }
    if(title){
      if(title.length>50){
        setError(true)
        setMessageError(renderMessage.title_error)
        return false
      }
    }
    if(description){
      if(description.length>200){
        setError(true)
        setMessageError(renderMessage.description_error)
        return false
      }
    }
    if(start && end){
      if(start>end){
        setError(true)
        setMessageError(renderMessage.date_err)
        return false
      }
    }
    if(start && end && title && end>start){
        return true
    }

  }


  const handleChange = (e) => {
    setTitleError(false)
    setStartError(false)
    setEndError(false)
    setError(false)
    setMessageError('')
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
  const onChange = (e, val) => {
    setTitleError(false)
    setStartError(false)
    setEndError(false)
    setError(false)
    setMessageError('')
    if (val === 'start') {
      setStart(e)
    }

    else {
      setEnd(e)
    }
  }
  const onCancel= ()=>{
    setError(false)
    setMessageError('')
    setStartError(false)
    setEndError(false)
    setTitleError(false)
    setTitle('')
    setDescription('')
    setRecurring('Daily')
    setStart('')
    setEnd('')
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
          {editValue ?
            <h3>Edit Event</h3> :
            <h3>Add New Event</h3>}
            {error? <h4>{message}</h4>:null}
        </div>
        <div className="ContentModal">
          <Input type="text" className={titleError?'active':null} id='title' placeholder="Add Title" value={title} onChange={(e) => handleChange(e)} />
          <Input type="text" id='desc' placeholder="Description" value={description} onChange={(e) => handleChange(e)} />
          <DatePicker active={startError?true:null}>
            <label>Start Date</label>
            <DateTimePicker
              yearPlaceholder="YYYY"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              hourPlaceholder="HH"
              locale={moment.locale('en-gb')}
              minutePlaceholder="MM"
              onChange={(e) => onChange(e, 'start')}
              value={start}
            />
          </DatePicker>
          <DatePicker active={endError?true:null}>
            <label>End Date</label>
            <DateTimePicker
              yearPlaceholder="YYYY"
              locale={moment.locale('en-gb')}
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              hourPlaceholder="HH"
              minutePlaceholder="MM"
              onChange={(e) => onChange(e, 'end')}
              value={end}
            />
          </DatePicker>
          <select id='recurring' value={recurring} onChange={e => handleChange(e)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monday-Friday">Monday-Friday</option>
          </select>
          <br />
          {!editValue ?
            <>
              <div className="modalButton">
              <Button onClick={() => onCancel()} type="submit" className="btn btn-primary cancel">Cancel</Button>
              <Button onClick={() => addEvent()} type="submit" className="btn btn-primary">Save</Button>
            </div>
        </>:
        <>
          <div className="modalButton">
            <Button onClick={() => handleEdit()} type="submit" className="btn btn-primary">Save</Button>
            <Button onClick={() => handleDelete()} type="submit" className="btn btn-primary">Delete</Button>
          </div>
        </>}
        </div>
      </Modal>
    </div >
  )
}

export default AddModalBox
