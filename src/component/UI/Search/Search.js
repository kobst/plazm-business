
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../../../Public/images/search.svg'
const SearchContainer = styled.div`
font-family: 'Roboto',sans-serif;
margin-top: 20px;
height:33px;
border:1px solid #A8A8A8;
border-radius:4px;
display:flex;
padding:0 15px;
input{
    border:none;
    background: transparent;
    width:100%;
    font-size:14px;
    line-height: 33px;
    padding: 0 0 0 10px;

::placeholder{
    font-size:10px;
    color:#B1B1B1;
}
:focus{
    outline:none;
}
}
`

const Search = (props,children) => {
    return(
    <SearchContainer>
        <img src={SearchIcon} alt={SearchIcon} /><input type="search" placeholder="search" />
    </SearchContainer>
    )
}

export default Search