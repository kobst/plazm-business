import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
// import closeIcon from '../../images/close-icon.svg'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
// import DateTimePicker from 'react-datetime-picker';
import {getMessage} from '../../config'
import Label from '../UI/Label/label'
import crossIocn from '../../images/cross-black.svg'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Gallery from '../UI/EventGallery'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     focused: {
//       border: '1px solid #4A90E2'
// },
//   },
//   textField: {
//     width: 224,
//   },
// }));
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

const renderMessage = getMessage()
const AddModalBox = ({ isOpen,setEvent,events,value, data, editValue, setEdit, setIsOpen, closeModal }) => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [id, setId] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  // const [startCopy,setStartCopy]= useState()
  // const [endCopy,setEndCopy]= useState()
  const [recurring, setRecurring] = useState('')
  // const [valid,setValid]= useState(true)
  const [error,setError]= useState(false)
  const [message,setMessageError]= useState()
  const [titleError,setTitleError]= useState(false)
  const [startError,setStartError]= useState(false)
  const [endError,setEndError]= useState(false)
  const [saveDisable,setSaveDisable]= useState(false)
  const [disableReccuring,setDisableReccuring] = useState(false)
  const [image,setImage] = useState([])
  // const classes = useStyles();

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
      if(value.start && value.end){
      if((new Date(value.start).getDate() < new Date(value.end).getDate())
       ||(new Date(value.start).getMonth() < new Date(value.end).getMonth())
       ||(new Date(value.start).getFullYear() < new Date(value.end).getFullYear())){
           setDisableReccuring(true)
           setRecurring('')
          }
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value,closeModal])

  useEffect(() => {
   if(editValue===false){
    setTitle('')
    setDescription('')
    setStart(new Date())
    setRecurring('Daily')
    setEnd(new Date())
    setImage([])
     }
  }, [editValue,isOpen])
 
  const findContent=(id)=> {

   const val = events.find(v=>v._id===id)
   if(val){
    setDescription(val.description)
   setRecurring(val.recurring)
   setImage(val.media)
   }
  }

  const addEvent = async () => {
    if(Validation()){
      setSaveDisable(true)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        business: data._id,
        description:description,
        eventSchedule: {
         start_time: start,
          end_time: end,
        },
        recurring: recurring,
        media:image
      })
    });
    const body = await response.text();
    setIsOpen(false)
    setSaveDisable(false)
    setEvent()
    return body
  }

}

const handleEdit= async () => {
  if(Validation()){
    setSaveDisable(true)
  const response= await fetch(`${process.env.REACT_APP_API_URL}/api/events`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id:id,
        title: title,
        business: data._id,
        description:description,
        eventSchedule: {
         start_time: start,
          end_time: end,
        },
        recurring: recurring,
        media:image


    })
  });
    const body = await response.text();
    setIsOpen(false)
    setEdit(false)
    setSaveDisable(false)
    setEvent()
    return body
}
  }

  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/event-delete`, {
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
    setSaveDisable(false)
    setEvent()
    return body

  }

  const checkMultiDayEvent=(e,val)=> {
    if(val==='start'){
    if(end>e){
    if((new Date(e).getDate() < new Date(end).getDate())
       ||(new Date(e).getMonth() < new Date(end).getMonth())
       ||(new Date(e).getFullYear() < new Date(end).getFullYear())){
           setDisableReccuring(true)
           setRecurring('')
          }

  }
}
else{
  if(e>start){
    if((new Date(start).getDate() < new Date(e).getDate())
    ||(new Date(start).getMonth() < new Date(e).getMonth())
    ||(new Date(start).getFullYear() < new Date(e).getFullYear())){
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
    if(start && end && title && new Date(end)>new Date(start)){
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
  const onChange = (e,val) => {
    setTitleError(false)
    setStartError(false)
    setEndError(false)
    setError(false)
    setMessageError('')
    setDisableReccuring(false)
    if (val === 'start') {
      setStart(e)

    }

    else {
      setEnd(e)
    }
     checkMultiDayEvent(e,val)

  }
  const onCancel= ()=>{
    setId('')
    setDisableReccuring(false)
    setError(false)
    setMessageError('')
    setStartError(false)
    setEndError(false)
    setTitleError(false)
    setTitle('')
    setImage([])
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
        className="Modal Custom_modal"
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

            
        </div>
        {error? <h4 className="error_msg_popup">{message}</h4>:null}
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
            <form className="openingHrs" noValidate>
            {/* <TextField
            id="start"
           type="datetime-local"
           ampm={false}
           value= {start}
      InputLabelProps={{
             shrink: true,
             }}
             onChange={(e)=>onChange(e)}
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker format="dd/MM/yyyy HH:mm" value={start} onChange={(e)=>onChange(e,'start')}  />
    </MuiPickersUtilsProvider>
           </form>
          </DatePicker >
          <DatePicker active={endError?true:null}>
          <label>End Date</label>
            <form className="openingHrs" noValidate>
            {/* <TextField
            id="end"
           type="datetime-local"
           value= {end}
           ampm={false}
            className={classes.textField}
            InputLabelProps={{
             shrink: true,
             }}
             onChange={(e)=>onChange(e)}
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker format="dd/MM/yyyy HH:mm" value={end} onChange={(e)=>onChange(e,'end')}  />
    </MuiPickersUtilsProvider>
           </form>
          </DatePicker>
          <FormControl>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
        <Select
          id='recurring'
          value={recurring}
          onChange={InputChange}
          disabled={disableReccuring}
        >
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monday-Friday">Monday-Friday</MenuItem>
          <MenuItem value="One-Time">One-Time</MenuItem>
        </Select>
      </FormControl>
          {/* <select id='recurring' value={recurring} onChange={e => handleChange(e)} disabled={disableReccuring}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monday-Friday">Monday-Friday</option>
          </select> */}
          <br />
          <div className="Image_wrap">
          <Gallery name={data.company_name} type="edit" image={image} setImage={setImage}/>
          </div>
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
            <Button style={{marginLeft:"15px"}} onClick={() => handleDelete()} type="submit" className="btn btn-primary">Delete</Button>
          </div>
        </>}
        </div>
      </Modal>
    </div >
  )
}

export default AddModalBox
