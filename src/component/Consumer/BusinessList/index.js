import React,{useEffect, useState} from "react";
import styled from "styled-components"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

const BuisinessViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
    flex-direction: column;
    padding: 30px;
    @media (max-width: 767px) {
        padding: 15px;
    }
    h3 {
        color: #FF2E9A;
        padding: 0;
        margin: 0 0 15px;
        font-size: 24px;
        font-weight: 600;
        @media (max-width: 767px) {
            font-size: 18px;
        }
    }
    p{
        font-size: 14px;
        font-weight: 500;
        margin: 0 0 10px;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s ease-in-out 0s;
        :hover{
            color: #00C2FF;
            transition: all 0.2s ease-in-out 0s;
        }
        @media (max-width: 767px) {
            font-size: 13px;
        }
    }
`

const BusinessListWrap = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;    
`

const BusinessList = ({setDisplayTab, profile}) => {
    const business = useSelector(state => state.place.place)
    const history = useHistory()
    return (
    <>
    <BuisinessViewContent>
        <h3>Business Lists</h3>
        <Scrollbars  
        autoHeight
        autoHeightMin={0}
        autoHeightMax={800}
        thumbMinSize={30}
        >
            <BusinessListWrap>
                {business.map(i=><p onClick={()=>history.push(`/b/${i._id}`)}>{i.company_name}</p>)}
            </BusinessListWrap>
        </Scrollbars>
    </BuisinessViewContent>
    </>
    )
}
  
  export default BusinessList