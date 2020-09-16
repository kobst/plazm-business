import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
// import closeIcon from '../../images/close-icon.svg'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import DateTimePicker from 'react-datetime-picker';
import {getMessage} from '../../config'
import moment from 'moment'
import Label from '../UI/Label/label'
import crossIocn from '../../images/cross-black.svg'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
// import Gallery from '../UI/Gallery'

const DatePicker = styled.div`
padding:0px;
border-bottom: 1px solid #dddd;
margin:5px 0 15px;
border-color: ${props => (props.active ? 'red':null)};
label{
  color: #757575;
  font-size: 13px;
  margin:0 10px 0 0;
}
`
const FormGroup = styled.div`
margin-bottom: 22px;
@media (max-wiwth:767px){
  margin-bottom: 15px;
}
`
const P = styled.p`
font-size: 12px;
line-height: 14px;
color: #979797;
margin: 10px auto 40px;

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
  const [startCopy,setStartCopy]= useState()
  const [endCopy,setEndCopy]= useState()
  const [recurring, setRecurring] = useState('')
  // const [valid,setValid]= useState(true)
  const [error,setError]= useState(false)
  const [message,setMessageError]= useState()
  const [titleError,setTitleError]= useState(false)
  const [startError,setStartError]= useState(false)
  const [endError,setEndError]= useState(false)
  const [saveDisable,setSaveDisable]= useState(false)
  const [disableReccuring,setDisableReccuring] = useState(false)
  const classes = useStyles();

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
        console.log(value.start)
         const startDate = new Date(value.start).toISOString().split('.')
        setStart(startDate[0])
      }
      if (value.end) {
         const endDate = new Date(value.end).toISOString().split('.')
        setEnd(endDate[0])
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
      setSaveDisable(true)
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
    setSaveDisable(false)
    window.location.reload()
    return body
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
        _id:id,
        name:title,
        place_id:data._id,
        scheduledEvent:"yes",
        content:description,
        recurring:recurring,
        start_time:startCopy,
        end_time:endCopy
    })
  });
    const body = await response.text();
    setIsOpen(false)
    setEdit(false)
    setSaveDisable(false)
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

  const checkMultiDayEvent=(e)=> {
    if(e.target.id==='start'){
    if(end>e.target.value){
    if(((new Date(e.target.value).getDate() < new Date(end).getDate()))
       ||(new Date(e.target.value).getMonth() < new Date(end).getMonth())
       ||(new Date(e.target.value).getFullYear() < new Date(end).getFullYear())){
           setDisableReccuring(true)
           setRecurring('')
          }

  }
}
else{
  if(e.target.value>start){
    if(((new Date(start).getDate() < new Date(e.target.value).getDate()))
    ||(new Date(start).getMonth() < new Date(e.target.value).getMonth())
    ||(new Date(start).getFullYear() < new Date(e.target.value).getFullYear())){
           setDisableReccuring(true)
           setRecurring('')
          }

  }

}
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
      if(new Date(start).toString()=== new Date(end).toString()){
        setError(true)
        setMessageError(renderMessage.time_err)
        return false
      }
      if((new Date(start).getDate() === new Date(end).getDate()) 
         && (new Date(start).getMonth()=== new Date(end).getMonth())
         &&(new Date(start).getFullYear()=== new Date(end).getFullYear())){
           if(new Date(start).getTime() > new Date(end).getTime()){
        setError(true)
        setMessageError(renderMessage.diff_err)
        return false
           }
      }
      if(new Date(start) > new Date(end)){
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
    }
  }
  const onChange = (e) => {
    setTitleError(false)
    setStartError(false)
    setEndError(false)
    setError(false)
    setMessageError('')
    setDisableReccuring(false)
    if (e.target.id === 'start') {
      console.log(e.target.value)
      console.log(new Date(e.target.value))
      setStart(e.target.value)
      setStartCopy(new Date(e.target.value))

    }

    else {
      setEnd(e.target.value)
      setEndCopy(new Date(e.target.value))
    }
    checkMultiDayEvent(e)

  }
  const onCancel= ()=>{
    setDisableReccuring(false)
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
  const InputChange = (e)=>{
      setRecurring(e.target.value)
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
            
            <Button onClick={() => onCancel()} type="submit" className="btn btn-primary cancel"><img src={crossIocn} alt="Delete" /></Button>

            {error? <h4>{message}</h4>:null}
        </div>
        <div className="ContentModal">
          <FormGroup>
            <Label name="Add Title"/>
            <Input type="text" className={titleError?'active':null} id='title' value={title} onChange={(e) => handleChange(e)} />
          </FormGroup>
          <FormGroup>
          <Label name="Description"/>
          <Input type="text" id='desc'  value={description} onChange={(e) => handleChange(e)} />
          </FormGroup>
          <Label name="Event Time"/>
          <DatePicker active={startError?true:null}>
            <label>Start Date</label>
            <form className={classes.container} noValidate>
            <TextField
            id="start"
           type="datetime-local"
           value= {start}
            className={classes.textField}
            InputLabelProps={{
             shrink: true,
             }}
             onChange={(e)=>onChange(e)}
          />
           </form>
          </DatePicker >
          <DatePicker active={endError?true:null}>
          <label>End Date</label>
            <form className={classes.container} noValidate>
            <TextField
            id="end"
           type="datetime-local"
           value= {end}
            className={classes.textField}
            InputLabelProps={{
             shrink: true,
             }}
             onChange={(e)=>onChange(e)}
          />
           </form>
          </DatePicker>
          <FormControl>
        <InputLabel id="demo-simple-select-label">Reccuring</InputLabel>
        <Select
          id='recurring'
          value={recurring}
          onChange={InputChange}
          disabled={disableReccuring}
        >
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monday-Friday">Monday-Friday</MenuItem>
        </Select>
      </FormControl>
          {/* <select id='recurring' value={recurring} onChange={e => handleChange(e)} disabled={disableReccuring}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monday-Friday">Monday-Friday</option>
          </select> */}
          <br />
          {/* <Gallery /> */}
          <P>You may upload images under the size of 2 MB each. Any dimension related message goes here</P>
          {!editValue ?
            <>
              <div className="modalButton">
              <Button disabled={saveDisable} onClick={() => addEvent()} type="submit" className="btn btn-primary">Save</Button>
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
