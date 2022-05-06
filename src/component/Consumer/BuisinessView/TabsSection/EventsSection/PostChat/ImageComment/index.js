import React from "react";
import styled from "styled-components";
import CommentStaticImg from "../../../../../../../images/CommentStaticImg.png";

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 536px;
  max-height: 224px;
  margin: 0;
  @media (max-width: 767px) {
    margin: 0 auto;
  }
  img {
    max-height: 224px;
    /* width: 100%;
    height: 100%; */
  }
`;

const ImageComment = ({ image }) => {
  return (
    <>
      {image !== "" ? (
        <BottomBarLikes>
          <img src={image !== "" ? image : CommentStaticImg} alt="" />
        </BottomBarLikes>
      ) : null}
    </>
  );
};

export default ImageComment;
