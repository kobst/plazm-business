import React from "react"
import styled from "styled-components"
import CommentStaticImg from '../../../../../../images/CommentStaticImg.png'


const BottomBarLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 224px;
  overflow: hidden;
  margin: 0;  
  width: 100%;
`

const ImageComment = ({image}) => {
    return (
    <>
    <BottomBarLikes>
      <img src={image!==""?image:CommentStaticImg} alt="" />
    </BottomBarLikes>
    </>
    )
}
  
export default ImageComment;