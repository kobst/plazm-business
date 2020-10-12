
import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'
import CloseIcon from '../../../images/close.svg'
import GalleryImg from '../../../images/gallery-img.png'
import GalleryImg1 from '../../../images/gallery-img1.png'
import GalleryWishlist from '../../../images/wishlist-gallery.svg'
import GallerModalBox from '../../Add-Gallery/index'
import reactS3 from 'react-s3'
import AWS from 'aws-sdk';

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
const region = process.env.REACT_APP_REGION
// const config = {
//   bucketName: bucket,
//   dirName: dir,
//   region: region,
//   accessKeyId: accessKey,
//   secretAccessKey:Secret,
// }

AWS.config.update({region: region});

let s3 = new AWS.S3({apiVersion: '2006-03-01'});

const Gallery = (props) => {
  const [isOpen,setIsOpen]= useState(false)
  let myInput
  const upload =async(e)=> {
    const imageArr= props.image
    if(imageArr.length<5){
      let params = {Bucket: bucket, Key: e.target.files[0].name, Body: e.target.files[0]};
      s3.upload(params, function(err, data) {
         console.log(err, data);
    })
  //  const data = await reactS3.uploadFile(e.target.files[0],config)
  //   imageArr.push(data.location)
  //   props.setImage([...imageArr])
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
        <div className="galleryImage">
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