import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import {
  FirstRow,
  ClockIcon,
  AddImagesLabel,
  ImagesRow,
  ImagesNameSec,
  ImagesCross,
  ErrorDiv,
} from "./styled.js";
import GalleryIcon from "../../../../images/GalleryIcon.png";

const AddImages = ({ formik }) => {
  const ref = useRef();

  const uploadImage = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length) {
      const images = formik.values.images;
      formik.setFieldValue("images", [...images, ...selectedFiles]);
    }
  };

  const removeImage = (index) => {
    formik.setFieldValue(
      "images",
      formik.values.images.filter((_, idx) => idx !== index)
    );
  };

  return (
    <>
      <FirstRow>
        <ClockIcon>
          <img src={GalleryIcon} />
        </ClockIcon>
        <input
          id="myInput"
          onChange={(e) => uploadImage(e)}
          ref={ref}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple
          style={{ display: "none" }}
        />
        <AddImagesLabel onClick={() => ref.current.click()}>
          Add Images
        </AddImagesLabel>
        <ImagesRow>
          {formik.values.images.map((img, idx) => (
            <ImagesNameSec key={img?.lastModified}>
              {img.name}
              <ImagesCross>
                <IoMdClose onClick={() => removeImage(idx)} />
              </ImagesCross>
            </ImagesNameSec>
          ))}
        </ImagesRow>
      </FirstRow>
      {formik.errors && formik.errors.images ? (
        <FirstRow>
          <ErrorDiv>{formik.errors.images}</ErrorDiv>
        </FirstRow>
      ) : null}
    </>
  );
};

export default AddImages;
