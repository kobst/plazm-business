
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
  console.log(props.image)
  const [isOpen,setIsOpen]= useState(false)
  const [imageUrl,setImageUrl]= useState([])
  const [imageCopy,setImageCopy]= useState([])

  useEffect(() => {
    if (typeof props.image!== 'undefined') {
        setImageUrl(props.image)
      }
      
    },[props.image,imageUrl])


  let myInput
  const upload =async(e)=> {
    const imageArr= imageCopy
   const data = await reactS3.uploadFile(e.target.files[0],config)
    imageArr.push(data.location)
    setImageCopy([...imageArr])
    setImageUrl([...imageArr])
    props.setImage([...imageArr])
    }
   console.log(imageUrl)
    return(
      <>
      { props.type==='edit'?
      <GallerySection>
        <div class="galleryImage">
        <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
          <p onClick={(e) => myInput.click()}><img src={PlusIcon} alt="" /> Photo</p>
          {/* <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/> */}
        </div>
        {imageUrl ?(imageUrl.map(v => 
                    <div className="galleryImage">
                    <img src={v} alt="" />
                  </div>)): null
                  }
        
        {/* <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>  */}
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
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={GalleryWishlist} alt="Wishlist" className="wishlistGalery" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
      </GallerySection>
    }
    </>
    )
}

export default Gallery