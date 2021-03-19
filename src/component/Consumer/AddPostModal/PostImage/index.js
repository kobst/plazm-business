import React from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

const AllListingsContent = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 15px;
`;

const PostImageDiv = styled.div`
  border: 1px dashed #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 184px;
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
`;




const PostImage = ({image, setImageUpload, loader}) => {
  return (
    <>
      <AllListingsContent>
        <PostImageDiv>
          <img src={image} alt="" />
        <CloseList disabled={loader} onClick={()=>setImageUpload(null)}>
          <IoMdCloseCircle/>
        </CloseList>
        </PostImageDiv>
      </AllListingsContent>
    </>
  );
};

export default PostImage;
