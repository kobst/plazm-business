
import React from 'react'
import styled from 'styled-components'
import './checkbox-style.css'

const DivText = styled.label`
    border: 0;
    height: 15px;
    font-size: 16px;
    line-height: normal;
    width: 15px;
    padding:0;
    margin: 0 5px 0 0;
    :focus{
        outline:none;
    }
`

const Checkbox = () => (
    <>
        <DivText className="container">
            <input type="checkbox" />
            <span className="checkmark"></span>
        </DivText>
    </>
)

export default Checkbox