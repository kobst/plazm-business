import React,{useEffect, useState} from "react";
import styled from "styled-components"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const BuisinessViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
    flex-direction: column;
`

const BusinessList = ({setDisplayTab, profile}) => {
    const business = useSelector(state => state.place.place)
    const history = useHistory()
    return (
    <>
    <BuisinessViewContent>
        <h3>Business Lists</h3>
        {business.map(i=><p onClick={()=>history.push(`/b/${i._id}`)}>{i.company_name}</p>)}
    </BuisinessViewContent>
    </>
    )
}
  
  export default BusinessList