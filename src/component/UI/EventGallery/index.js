
import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'
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
// const dir = process.env.REACT_APP_DIRNAME
const region = process.env.REACT_APP_REGION
// const accessKey = process.env.REACT_APP_ACCESS_KEY_ID
// const Secret = process.env.REACT_APP_SECRET_ACCESS_KEY
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
  const [counter,setCounter]= useState(0)
  let myInput
  const upload =async(e)=> {
    const imageArr= props.image
    if(imageArr.length<1&& counter<1){
      let params = {Bucket: bucket, Key: e.target.files[0].name, Body: e.target.files[0]};
      s3.upload(params, function(err, data) {
         console.log(err, data);
    })
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