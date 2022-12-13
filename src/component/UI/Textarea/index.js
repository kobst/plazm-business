
import React from 'react';
import styled from 'styled-components';

const TextareaText = styled.textarea`
background: #FFFFFF;
border: 0.25px solid rgba(239, 77, 182, 0.5);
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
border-radius: 5px;
height:171px;
font-family: 'Roboto',sans-serif;
width:100%;
padding:15px;
font-size: 12px;
line-height: 18px;
color: #6C6C6C;
resize:none;
:focus{
    outline:none;
}
::placeholder{
color:#7C9CBF
}
@media (max-width:991px){
    height:100px;
}

`;

const Textarea = (props) => {
  return (
    <TextareaText {...props}/>
  );
};

export default Textarea;
