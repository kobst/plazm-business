import React from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";
import PostIng from '../../../../images/sliderimg.png'

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

const CloseList = styled.div`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  svg {
    color: #fff;
    font-size: 20px;
  }
`;




const PostImage = ({image, setImageUpload}) => {
  return (
    <>
      <AllListingsContent>
        <PostImageDiv>
          <img src={image} alt="" />
        <CloseList>
          <IoMdCloseCircle onClick={()=>setImageUpload(null)}/>
        </CloseList>
        </PostImageDiv>
      </AllListingsContent>
    </>
  );
};

export default PostImage;