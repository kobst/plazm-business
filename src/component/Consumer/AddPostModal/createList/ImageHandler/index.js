import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FiPlus } from "react-icons/fi";
import {
  ContentTabPanel,
  PlusIcon,
  ClickText,
  ClickTextBottom,
} from "../styles";
import { dataUrlToFile, cropImageNow } from "../../../../../utils/image";
import ConfirmIcon from "../../../../../images/ConfrimOk.png";
import CloseCrop from "../../../../../images/closecropimg.png";

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect = 1,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: mediaWidth - (mediaWidth * 0.1),
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ImageHandler = ({
  croppedImage,
  setCroppedImage,
  imagePreview,
  setImagePreview,
}) => {
  const [imgSrc, setImgSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (files) => {
      if (files && files.length > 0) {
        setImageFile(files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImgSrc(reader.result));
        reader.readAsDataURL(files[0]);
      }
    },
  });

  const onImageLoad = (e) => {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, 16 / 9))
  }

  const showCroppedImage = async () => {
    try {
      const img = await cropImageNow(imgRef.current, crop);
      setImagePreview(img);
      setCompletedCrop(null);
      setImgSrc(null);
      const file = await dataUrlToFile(img, imageFile.name, imageFile.type);
      setCroppedImage(file);
    } catch (e) {
      console.error(e);
    }
  };

  const cropAgain = () => {
    setImgSrc(imagePreview);
    setCroppedImage(null);
    setImagePreview(null);
  };

  const remove = () => {
    setImgSrc(null);
    setImageFile(null)
    setCroppedImage(null);
    setImagePreview(null);
    setCompletedCrop(null)
  };

  return (
    <>
      {!imgSrc && !imagePreview && (
        <ContentTabPanel {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <PlusIcon>
            <FiPlus />
          </PlusIcon>
          <ClickText>Click the ‘+’ icon or drag and drop the image.</ClickText>
          <ClickTextBottom>
            You may upload Cover image under the size of 2 MB each. Any
            dimension related message goes here*
          </ClickTextBottom>
        </ContentTabPanel>
      )}
      {!imagePreview && (
        <ContentTabPanel>
          <ReactCrop
            crop={crop}
            onComplete={(p) => setCompletedCrop(p)}
            onChange={setCrop}
          >
            <img className="CloseCropCross" onClick={() => remove()} src={CloseCrop} />
            <img ref={imgRef} src={imgSrc}  onLoad={onImageLoad} />
          </ReactCrop>
        </ContentTabPanel>
      )}
      {completedCrop && imageFile && (
        <button className="ConfirmImgBtn" onClick={() => showCroppedImage()}>
          <img src={ConfirmIcon} />
        </button>
      )}
      {imagePreview && (
        <>
          <img className="PreviewImg" src={imagePreview} />
          <div className="CropAgainContainer">
            <button className="CropAgainBtn" onClick={() => cropAgain()}>
              Crop Again
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ImageHandler;
