import React,{useState} from "react"
import styled from "styled-components"
import CommentStaticImg from '../../../../../../../images/CommentStaticImg.png'


const BottomBarLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 536px;
  max-height: 224px;
  margin: 0;
  img{
    max-height: 224px;
  }
`

const ImageComment = ({}) => {
    return (
    <>
    <BottomBarLikes>
      <img src={CommentStaticImg} alt="" />
    </BottomBarLikes>
    </>
    )
}
  
export default ImageComment