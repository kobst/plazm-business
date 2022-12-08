import React from 'react';
import styled from 'styled-components';
import {IoMdCloseCircle} from 'react-icons/io';
import CrossIcon from '../../../../images/cross-icon.svg';

const AllListingsContent = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
`;

const PostImageDiv = styled.div`
  border: 1px dashed #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 184px;
  margin: 0 0 15px;
  @media (max-width: 767px) {
    height: 124px;
  }
  img {
    max-height: 180px;
    @media (max-width: 767px) {
      height: 120px;
    }
  }
`;

const CloseList = styled.button`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  background: transparent;
  border: 0;
  svg {
    color: #fff;
    font-size: 20px;
  }
  :hover,
  :focus {
    outline: 0;
  }
`;

const UploadImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  position: relative;
  cursor: pointer;
  img {
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
  :hover {
    :after {
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.7) url(${CrossIcon});
      width: 45px;
      height: 45px;
      left: 0;
      top: 0;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

const WrapperDiv = styled.div`
  display: flex;
`;

const PostImage = ({
  image,
  setImageUpload,
  loader,
  type,
  imageUrl,
  deleteImage,
  clearImages,
  setImageFile,
}) => {
  const removeImages = () => {
    setImageUpload(null);
    setImageFile(null);
  };
  return (
    <>
      <AllListingsContent>
        {type === 'eventImages' ? (
          <WrapperDiv>
            <UploadImage disabled={loader} onClick={() => deleteImage()}>
              <img src={imageUrl} alt="Upload" />
            </UploadImage>

            <CloseList disabled={loader} onClick={() => clearImages()}>
              <IoMdCloseCircle />
            </CloseList>
          </WrapperDiv>
        ) : (
          <PostImageDiv>
            <img src={image} alt="" />
            <CloseList disabled={loader} onClick={() => removeImages()}>
              <IoMdCloseCircle />
            </CloseList>
          </PostImageDiv>
        )}
      </AllListingsContent>
    </>
  );
};

export default PostImage;
