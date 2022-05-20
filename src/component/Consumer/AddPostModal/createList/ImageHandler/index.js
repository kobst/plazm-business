import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { FiPlus } from "react-icons/fi";
import { ContentTabPanel, PlusIcon, ClickText, ClickTextBottom } from '../styles'
import { dataUrlToFile, cropImageNow } from "../../../../../utils/image";

const ImageHandler = ({croppedImage, setCroppedImage, imagePreview, setImagePreview}) => {
  const [imgSrc, setImgSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const imgRef = useRef(null)
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
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
    try {
      const img = await cropImageNow(
        imgRef.current,
        crop
      )
      setImagePreview(img)
      setCompletedCrop(null)
      setImgSrc(null)
      const file = await dataUrlToFile(img, imageFile.name, imageFile.type)
      setCroppedImage(file);
    } catch (e) {
      console.error(e)
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
        <ReactCrop crop={crop} onComplete={(p) => setCompletedCrop(p)} onChange={setCrop}>
          <img ref={imgRef} src={imgSrc} />
        </ReactCrop>
      </ContentTabPanel>}
      {completedCrop && <button onClick={() => showCroppedImage()}>Confirm</button>}
      {imagePreview &&
      <>
          <img src={imagePreview} />
          <button onClick={() => cropAgain()}>Crop Again</button>
        </>
      }
    </>
  );
};

export default ImageHandler
