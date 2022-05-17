import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {centerCrop, makeAspectCrop,} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { FiPlus } from "react-icons/fi";
import { ContentTabPanel, PlusIcon, ClickText, ClickTextBottom, CroppedFinalImgSec, FinalImgdesp } from '../styles'
import { dataUrlToFile, getCroppedImg } from "../../../../../utils/image";
// import { imgPreview } from './ImgPreview'

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ImageHandler = ({croppedImage, setCroppedImage, imagePreview, setImagePreview}) => {
  const [imgSrc, setImgSrc] = useState();
  const [imageFile, setImageFile] = useState();
  // const [croppedImage, setCroppedImage] = useState();
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({unit: '%'});
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    accept:{
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: (files) => {
      if (files && files.length > 0) {
        setImageFile(files[0])
        const reader = new FileReader();
        reader.addEventListener('load', () =>
        setImgSrc(reader.result),
        );
        reader.readAsDataURL(files[0]);
      }
    },
  });

  const showCroppedImage = async () => {
    const { width, height } = imgRef.current
    console.log(imgRef.current, 'imgRef.current', width, height);
    try {
      console.log(imgSrc);
      const img = await getCroppedImg(
        imgSrc,
        completedCrop,
        0,
        imageFile.type
      )
      // console.log('donee', { img })
      // setImagePreview(img)
      // const ip = await imgPreview(imgRef.current, crop)
      setImagePreview(img)
      // console.log('===================ip=================');
      // console.log(ip);
      // console.log('====================================');
      // canvasPreview(
      //   imgRef.current,
      //   previewCanvasRef.current,
      //   completedCrop,
      //   undefined,
      //   1,
      // )
      setCompletedCrop(null)
      setImgSrc(null)
      const file = await dataUrlToFile(img, imageFile.name, imageFile.type)
      setCroppedImage(file);
    } catch (e) {
      console.error(e)
    }

  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const cropAgain = () => {
    setImgSrc(imagePreview)
    setCroppedImage(null);
    setImagePreview(null);
  }

  return (
    <>{!imgSrc && !imagePreview && (
      <ContentTabPanel {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()}  />
        <PlusIcon>
          <FiPlus />
        </PlusIcon>
        <ClickText>Click the ‘+’ icon or drag and drop the image.</ClickText>
        <ClickTextBottom>
          You may upload Cover image under the size of 2 MB each. Any dimension
          related message goes here*
        </ClickTextBottom>
      </ContentTabPanel>)}
      {!imagePreview && <ContentTabPanel>
        <ReactCrop  aspect={aspect} crop={crop} onComplete={(p) => setCompletedCrop(p)} onChange={(_, percentCrop) => setCrop(percentCrop)}>
          <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
      </ContentTabPanel>}
      {completedCrop && <button onClick={() => showCroppedImage()}>Confirm</button>}
      {imagePreview &&
      <>
          <img src={imagePreview} />
          {/* <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          /> */}
          <button onClick={() => cropAgain()}>Crop Again</button>
        </>
      }
    </>
  );
};

export default ImageHandler
