
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../../../images/search.svg'
const SearchContainer = styled.div`
font-family: 'Roboto',sans-serif;
height:50px;
border:none;
margin-top:10px;
display:flex;
padding:0 15px;
position:relative;
border-top: 1px solid rgba(255, 71, 157, 0.25);
border-bottom: 1px solid rgba(255, 71, 157, 0.25);
margin: 10px -15px 0;
padding: 0 32px;
input{
    border:none;
    background: transparent;
    width:100%;
    font-size:14px;
    line-height: 33px;

::placeholder{
    font-size:14px;
    color: #DADADA;
}
:focus{
    outline:none;
}
@media (max-width:767px){
    height:40px; 
    padding: 0 15px;
}
`

const Search = (props,children) => {
    return(
    <SearchContainer>
        <input type="search" placeholder="Search by Name" /><img src={SearchIcon} alt={SearchIcon} />
    </SearchContainer>
    )
}

export default Search