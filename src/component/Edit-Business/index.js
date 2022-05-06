import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'


Modal.setAppElement('#root')



const ModalBox = ({value, isOpen,setIsOpen,closeModal }) => {
  const [company,setCompany] = useState()
  const [website,setWebsite] = useState()
  const [phone,setPhone] = useState()
  const [rating,setRating] = useState()
  const [type,setType] = useState()
  const [status,setStatus] = useState()
  const [map,setMap] = useState()
  const [latitude,setLatitude] = useState()
  const [longitude,setLongitude] = useState()
  const [userAddress,setAddress] = useState()

  useEffect(()=> {
    if(typeof value!=='undefined'){
    if(value.company_name){
      setCompany(value.company_name)
    }
    if(value.web_site){
      setWebsite(value.web_site)
    }
    if(value.telephone){
      setPhone(value.telephone)
    }
    if(value.rating){
      setRating(value.rating)
    }
    if(value.type){
      setType(value.type)
    }
    if(value.status){
      setStatus(value.status)
    }
    if(value.map_link){
      setMap(value.map_link)
    }
    if(value.latitude){
      setLatitude(value.latitude)
    }
    if(value.longitude){
      setLongitude(value.longitude)
    }
    if(value.address){
      setAddress(value.address)
    }
  }


  },[value,isOpen])

  const updateBusiness = async () => {
    const response= await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
            _id:value._id,
            status: status,
            userAddress: userAddress,
            telephone: phone,
            companyName:company,
            placeId: value.place_id,
            mapLink:map,
            type:type,
            rating: rating,
            website: website,
            userSub: value.userSub,
            latitude: latitude,
            longitude: longitude,
                
            
      })
    });
      const body = await response.text();
      window.location.reload() 
      return body

}

const handleSubmit = () => {
  setIsOpen(false)
  updateBusiness()

}
  

  const handleChange = (e) => {
    if (e.target.id === 'company') {
        setCompany(e.target.value)
    }
    else if (e.target.id === 'add') {
      setAddress(e.target.value)
}
    else if (e.target.id === 'website') {
        setWebsite(e.target.value)
      }
     else if (e.target.id === 'phone') {
      setPhone(e.target.value)
    } else if (e.target.id === 'rating') {
      setRating(e.target.value)
    } else if (e.target.id === 'type') {
      setType(e.target.value)
    } else if (e.target.id === 'status') {
      setStatus(e.target.value)
    }else if (e.target.id === 'map') {
        setMap(e.target.value)
    }else if (e.target.id === 'lat') {
        setLatitude(e.target.value)
    }else if (e.target.id === 'long') {
          setLongitude(e.target.value)
   } 
}
// const onClose = ()=>{
//   setCompany('')
//   setWebsite('')
//   setAddress('')
//   setPhone('')
//   setRating('')
//   setType('')
//   setStatus('')
//   setMap('')
//   setLatitude('')
//   setLongitude('')

// }


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
          {/* <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" />
          </button> */}
          <h3>Edit Business Profile</h3>
        </div>
        <div className="ContentModal">

        <Input type="text" id='company' placeholder="Business Name" value={company}  onChange={ (e) => handleChange(e)} />
        <Input type="text" id='add' placeholder="Address" value={userAddress}  onChange={ (e) => handleChange(e)} />
        <Input type="text" id='website' placeholder="Website" value={website}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='phone' placeholder="Phone Number" value={phone}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='rating' placeholder="Rating" value={rating}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='map' placeholder="Map Link" value={map}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='type' placeholder="Type" value={type}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='status' placeholder="Status" value={status}  onChange={ (e) => handleChange(e)} />

        <Input type="text" id='lat' placeholder="Latitude" value={latitude}  onChange={ (e) => handleChange(e)} />
        <Input type="text" id='long' placeholder="Longitude" value={longitude}  onChange={ (e) => handleChange(e)} />
        <div className="modalButton">
          <Button onClick={closeModal} type="submit" className="btn btn-primary cancel">Cancel</Button>
          <Button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalBox
