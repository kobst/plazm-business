
import React, { useState } from 'react'
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
  let myInput
  const upload =async(e)=> {
    const imageArr= props.image
    if(imageArr.length<1&& counter<1){
      const file = e.target.files[0]
      const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${file.name}`
      const value = await fetch(`${process.env.REACT_APP_API_URL}/api/upload_photo`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         Key:file.name,
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
       imageArr.push(baseUrl)
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
      const deleteImage = props.image.filter((item) => item !== v)
      props.setImage([...deleteImage])
    }
    return(
    
      <GallerySection className="Imgcontent">
        {props.image.length!==0 ?(props.image.map(v => 
                    <div onClick={()=>CancelPost(v)} className="EventsImage">
                    <img className="" src={v} alt="" />
                  </div>)): <div className="galleryImage">
        <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
          <p onClick={(e) => myInput.click()}><img src={PlusIcon} alt="" /> Photo</p>
        </div>
                  }
      </GallerySection>
    )
}

export default Gallery