
import React from 'react';
import styled from 'styled-components';
import CrossIcon from '../../../images/cross-brown.svg';

const BadgesText = styled.label`
height: 34px;
background: #f3f1f5;
font-size: 14px;
display: inline-flex;
border-radius: 4px;
justify-content: center;
align-items: center;
padding: 0 15px;
margin-right: 10px;
color:#280A33;
margin: 10px 10px 0px 0;
line-height:26px;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08);
border-radius: 17px;
border:1px solid #facdd0;
min-width:175px;
img{
    width:11px;
    margin-left:auto;
}
::empty{
  display:none;
}
@media (max-width:767px){
  min-width:147px;
  font-size: 12px;
}
`;


const Badges = (props) => {
  return (
    <BadgesText>{props.name} <img src={CrossIcon} alt="Cross" /></BadgesText>
  );
};

export default Badges;
