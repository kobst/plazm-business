
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'
import CloseIcon from '../../../images/close.svg'
import GalleryImg from '../../../images/gallery-img.png'
import GalleryImg1 from '../../../images/gallery-img1.png'
import GalleryWishlist from '../../../images/wishlist-gallery.svg'
import GallerModalBox from '../../Add-Gallery/index'
import reactS3 from 'react-s3'

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
const bucket = process.env.REACT_APP_BUCKET_NAME
const dir = process.env.REACT_APP_DIRNAME
const region = process.env.REACT_APP_REGION
const accessKey = process.env.REACT_APP_ACCESS_KEY_ID
const Secret = process.env.REACT_APP_SECRET_ACCESS_KEY
const config = {
  bucketName: bucket,
  dirName: dir,
  region: region,
  accessKeyId: accessKey,
  secretAccessKey:Secret,
}
const Gallery = (props) => {
  const [isOpen,setIsOpen]= useState(false)
  let myInput
  const upload =async(e)=> {
    const imageArr= props.image
    if(imageArr.length<5){
   const data = await reactS3.uploadFile(e.target.files[0],config)
    imageArr.push(data.location)
    props.setImage([...imageArr])
    }
    }
    const CancelPost= (v)=>{
      const deleteImage = props.image.filter((item) => item !== v)
      props.setImage([...deleteImage])
    }
    return(
      <>
      { props.type==='edit'?
      <GallerySection>
        <div class="galleryImage">
        <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
          <p onClick={(e) => myInput.click()}><img src={PlusIcon} alt="" /> Photo</p>
          {/* <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/> */}
        </div>
        {typeof props.image!=='undefined' ?(props.image.map(v => 
                    <div onClick={()=>CancelPost(v)} className="galleryImage">
                    <img src={v} alt="" />
                  </div>)): null
                  }
      </GallerySection>
       : <GallerySection>
        <div class="galleryImage">
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