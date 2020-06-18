
import React from 'react'
import styled from 'styled-components'
import LikeIcon from '../../../Public/images/like.svg'
import CommentIcon from '../../../Public/images/comment.svg'

const ListContainer = styled.div`
display:flex;
font-family: 'Roboto',sans-serif;
border-bottom: 1px solid #ddd;
padding: 15px 0;
`
const ImgSec = styled.div`
width:24px;
height:24px;
background:#C4C4C4;
border-radius:100%;
`
const TextSec = styled.div`
width: calc(100% - 42px);
margin-left: 15px;
h4{
    font-size:16px;
    font-weight:500px;
}
span{
    font-size:12px;
    margin-left:auto;
    margin-bottom:10px;
}
p{
    font-size:14px;
    margin-bottom:0px;
    margin-top:5px;
}
`
const FlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
`
const Icon = styled.div`
text-align:right;
img{
    margin-left: 30px;
    cursor:pointer;
}
`


const Listing = (props,children) => {
    return(
        <ListContainer>
        <ImgSec/>
        <TextSec>
            <FlexRow>
                <h4>Steve’s Pizza</h4>
                <span>2 hours ago</span>
            </FlexRow>
            <p>The situation here in Boston is better than other states. We have so far 46 confirmed cases and the quarantined places took...</p>
            <Icon>
            <img src={LikeIcon} alt={LikeIcon} />
            <img src={CommentIcon} alt={CommentIcon} />
            </Icon>
        </TextSec>
        </ListContainer>
    )
}

export default Listing