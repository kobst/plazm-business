
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'

const GallerySection = styled.div`
margin-top: 20px;
display: flex;
padding: 0 10px;
flex-wrap: wrap;
img{
  border-radius: 13px;
  max-width:100%;
}
@media (max-width:767px){
  padding: 0px;
}
`
const bucket = process.env.REACT_APP_BUCKET
const Gallery = (props) => {
  const [counter,setCounter]= useState(0)
  const [imageValue,setImageValue]= useState([])

  useEffect(() => {
    if(props.image){
      setImageValue(props.image)
    }
   
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  let myInput
  const editName=(name)=>{
    return `${props.name}-${name}`
  }
  const upload =async(e)=> {
    const imageArr= props.image
      setImageValue(imageArr)
    if(imageArr.length<1&& counter<1){
      const file = e.target.files[0]
      const newName = editName(file.name)
      const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${newName}`
      const value = await fetch(`${process.env.REACT_APP_API_URL}/api/upload_photo`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         Key:newName,
         ContentType:file.type
       })
     });
     const body =await value.text();
     const Val = JSON.parse(body)
 
     await fetch(Val, { 
     method: 'PUT',
     headers: {
       "Content-Type": file.type,
     },
     body: file 
   }).then(
     response => {
       imageArr.push({image:baseUrl})
       setImageValue([...imageArr])
       props.setImage([...imageArr])
     }
     
   ).catch(
     error => console.log(error) // Handle the error response object
   )
  //     setCounter(1)
  //  const data = await reactS3.uploadFile(e.target.files[0],config)
  //   imageArr.push(data.location)
  //   props.setImage([...imageArr])
    }
    }
    const CancelPost= (v)=>{
      setCounter(0)
      const deleteImage = props.image.filter((item) => item.image !== v.image)
      setImageValue([...deleteImage])
      props.setImage([...deleteImage])
    }
    return(
    
      <GallerySection className="Imgcontent">
        {props.image.length!==0 ?(imageValue.map(v => 
                    <div onClick={()=>CancelPost(v)} className="EventsImage">
                    <img className="" src={v.image} alt="" />
                  </div>)): <div className="galleryImage">
        <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
          <p onClick={(e) => myInput.click()}><img src={PlusIcon} alt="" /> Photo</p>
        </div>
                  }
      </GallerySection>
    )
}

export default Gallery