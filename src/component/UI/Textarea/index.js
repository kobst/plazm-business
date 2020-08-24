
import React from 'react'
import styled from 'styled-components'

const TextareaText = styled.textarea`
background: #FFFFFF;
border: 0.25px solid rgba(239, 77, 182, 0.5);
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
border-radius: 5px;
height:171px;
width:100%;
padding:15px;
color:#280A33;
resize:none;
:focus{
    outline:none;
}
::placeholder{
color:#7C9CBF
}
@media (max-width:991px){
}

`

const Textarea = (props) => {
    return(
    <TextareaText {...props}/>
    )
}

export default Textarea