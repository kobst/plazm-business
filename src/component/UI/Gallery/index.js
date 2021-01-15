
import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'
import CloseIcon from '../../../images/close.svg'
import GalleryImg from '../../../images/gallery-img.png'
import GalleryImg1 from '../../../images/gallery-img1.png'
import GalleryWishlist from '../../../images/wishlist-gallery.svg'
import GallerModalBox from '../../Add-Gallery/index'

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
  const [isOpen,setIsOpen]= useState(false)
  let myInput
  const editName=(name)=>{
    return `${props.name}-${name}`
  }
  const upload =async(e)=> {
    const imageArr= props.image
    if(imageArr.length<5){
      const file = e.target.files[0]
      const newName= editName(file.name) 
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
       props.setImage([...imageArr])
     }
     
   ).catch(
     error => console.log(error) // Handle the error response object
   )
    }
    }
    const CancelPost= (v)=>{
      const deleteImage = props.image.filter((item) => item.image !== v.image)
      props.setImage([...deleteImage])
    }
    return(
      <>
      { props.type==='edit'?
      <GallerySection>
        <div className="galleryImage">
        <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
          <p onClick={(e) => myInput.click()}><img src={PlusIcon} alt="" /> Photo</p>
          {/* <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/> */}
        </div>
        {typeof props.image!=='undefined' ?(props.image.map(v => 
                    <div onClick={()=>CancelPost(v)} className="galleryImage">
                    <img src={v.image} alt="" />
                  </div>)): null
                  }
      </GallerySection>
       : <GallerySection>
        <div className="galleryImage">
          <p onClick={() => setIsOpen(true)}><img src={PlusIcon} alt="" /> Photo</p>
          <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/>


        </div>
        <div className="galleryImage">
          <img src={GalleryImg1} alt="" />
          <img src={GalleryWishlist} alt="Wishlist" className="wishlistGalery" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
      </GallerySection>
    }
    </>
    )
}

export default Gallery