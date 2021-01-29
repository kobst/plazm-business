
import React from 'react'
import styled from 'styled-components'

const InputText = styled.input`
    border: 0;
    height: 40px;
    font-size: 16px;
    line-height: normal;
    width: 100%;
    padding:0;
    margin:0;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 0px;
    color: #222;
    font-weight: bold;
    :focus{
        outline:none;
    }
    ::placeholder{
    color:#7C9CBF
    }
    @media (max-width:767px){
        font-size: 14px;
    }
`

const Input = (props) => {
    return(
        <InputText ref={props.refs} {...props} />
    )
}

export default Input