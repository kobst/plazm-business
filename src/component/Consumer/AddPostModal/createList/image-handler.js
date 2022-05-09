import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {centerCrop, makeAspectCrop,} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { FiPlus } from "react-icons/fi";
import { Croppie } from "croppie";
import { ContentTabPanel, PlusIcon, ClickText, ClickTextBottom, CroppedFinalImgSec, FinalImgdesp } from './styles'
import { dataUrlToFile, getCroppedImg } from "../../../../utils/image";

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
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  // const [croppedImage, setCroppedImage] = useState();
  const [crop, setCrop] = useState();
  const [cropped, setCropped] = useState();
  const [aspect, setAspect] = useState(16 / 9)
  const { getRootProps, getInputProps } = useDropzone({
    accept:{
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: (files) => {
      if (files && files.length > 0) {
        setImageFile(files[0])
        const reader = new FileReader();
        reader.addEventListener('load', () =>
        setImage(reader.result),
        );
        reader.readAsDataURL(files[0]);
      }
    },
  });

  const showCroppedImage = async () => {
    try {
      console.log(image);
      const img = await getCroppedImg(
        image,
        cropped,
        0,
        imageFile.type
      )
      console.log('donee', { img })
      setImagePreview(img)
      setCropped(null)
      setImage(null)
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
    setImage(imagePreview)
    setCroppedImage(null);
    setImagePreview(null);
  }

  return (
    <>{!image && !imagePreview && (
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
        <ReactCrop  aspect={aspect} crop={crop} onComplete={(p) => setCropped(p)} onChange={(_, percentCrop) => setCrop(percentCrop)}>
          <img src={image} onLoad={onImageLoad} />
        </ReactCrop>
      </ContentTabPanel>}
      {cropped && <button onClick={() => showCroppedImage()}>Confirm</button>}
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
