import React, { useEffect, useState } from "react";
import useStore from '../../../Consumer/useState/index'
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

const Header = (
    {gridMode,
    setGridMode}) => {

    const selectedTab = useStore((state) => state.tabSelected)
    const selectedList = useStore((state) => state.selectedList)
    const draggedLocation = useStore((state) => state.draggedLocation)

    const [tabTitle, setTabTitle] = useState()
    const [coords, setCoords] = useState()

    const handleToggle = () => {
        console.log(gridMode)
        if (gridMode){
            console.log("setting grid mode")
            setGridMode(false)
        } 
        if (!gridMode) {
            console.log("setting list mode")
            setGridMode(true)
        }
    }

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
            if (selectedList) {
                setTabTitle(selectedList.name)
            }
        }

    }, [selectedTab])


    useEffect(()=> {
        let loc = draggedLocation.lat + " lat " + draggedLocation.lng + " long "
        setCoords(loc)

    }, [draggedLocation])

    return (
        <div className="header">
            <div className="left-header">
            <button className="toggle" onClick={handleToggle}>
                List / Grid
            </button>
            </div>

            <div className="title">
                <h4>{tabTitle}</h4>
            </div>

            <div className="right-header">
                <h6>{coords}</h6>
            </div>
        </div>
    )

}

export default Header