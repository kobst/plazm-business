import React, { useEffect, useState } from "react";
import useStore from '../../../Consumer/GridComponents/useState/index'
import styled from "styled-components";
import "./styles.css";



// const HeaderBarContent = styled.div`
//   height: 85px;
//   display: flex;
//   box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
//   flex-direction: row;
//   z-index: 100;
//   color: #ffffff;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0;
// `;

const Header = () => {

    const selectedTab = useStore((state) => state.tabSelected)

    const [tabTitle, setTabTitle] = useState("Home")


    useEffect(()=>{
        console.log(selectedTab + "selected Tab Header")
        if (selectedTab === 1) {
            setTabTitle("Explore")
        }
        if (selectedTab === 2) {
            setTabTitle("Home")
        }
        if (selectedTab === 3) {
            setTabTitle("Notifications")
        }
        if (selectedTab === 4) {
            setTabTitle("Favorites")
        }
        if (selectedTab === 5) {
            setTabTitle("Discover Lists")
        }
        if (selectedTab === -1) {
            setTabTitle("Explore")
        }

    }, [selectedTab])

    return (
        <div className="header">
                <h4 className="title">
                    {tabTitle}
                </h4>
        </div>
    )

}

export default Header