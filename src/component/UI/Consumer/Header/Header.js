import React, { useEffect, useState } from "react";
import useStore from '../../../Consumer/useState/index'
import { HeaderBar, LeftHeaderBar, UserNameCircle, BreadcrumbsDiv, BackArrow, BreadcrumbsText, RightHeaderBar, LocationWrap, UserImgWrap, UserImg } from './styled'
import BackBtn from '../../../../images/back-btn.png'
import "./styles.css";
import GridIcon from '../../../../images/grid_icon_blue.png'

const Header = () => {

    const [tabTitle, setTabTitle] = useState()
    const [coords, setCoords] = useState()

    const selectedTab = useStore((state) => state.tabSelected)
    const selectedList = useStore((state) => state.selectedList)
    const draggedLocation = useStore((state) => state.draggedLocation)
    const sublocality = useStore((state) => state.sublocality)
    const city = useStore((state) => state.city)

    const setGridMode = useStore((state) => state.setGridMode)
    const gridMode = useStore((state) => state.gridMode)


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
        <HeaderBar>
            <LeftHeaderBar>
                <UserNameCircle>P</UserNameCircle>
                <BreadcrumbsDiv>
                    <BackArrow><img src={BackBtn} /></BackArrow>
                    <BreadcrumbsText>Lists / <span>Lists Subscribed</span></BreadcrumbsText>
                </BreadcrumbsDiv>
            </LeftHeaderBar>

            <RightHeaderBar>
                
                <button className="toggle ChangeMode" onClick={handleToggle}>
                    {gridMode? "List" : "Grid"}
                    <img src={GridIcon} />
                </button>

                <LocationWrap>
                    <h6>{sublocality}</h6>
                    <h6>{city}</h6>
                    Queensland, New York
                </LocationWrap>
                
                <UserImgWrap>
                    <UserImg>
                        <img src="https://picsum.photos/id/237/200/300" />
                    </UserImg>
                </UserImgWrap>


                {/* <div className="title">
                    <h4>{tabTitle}</h4>
                </div> */}

                
                {/* <h6>{coords}</h6> */}
          

            </RightHeaderBar>

            
        </HeaderBar>
    )

}

export default Header