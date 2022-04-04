import React, { Fragment, useEffect, useState } from "react";
import useStore from "../../../Consumer/useState/index";
import {
  HeaderBar,
  LeftHeaderBar,
  UserNameCircle,
  BreadcrumbsDiv,
  BackArrow,
  BreadcrumbsText,
  RightHeaderBar,
  LocationWrap,
  UserImgWrap,
  UserImg,
} from "./styled";
import BackBtn from "../../../../images/back-btn.png";
import "./styles.css";
import GridIcon from "../../../../images/grid_icon_blue.png";
import ListIcon from "../../../../images/Grid_icon.png";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { setGloablLoader } from "../../../../reducers/consumerReducer";



const Header = () => {
  const [tabTitle, setTabTitle] = useState();
  const [coords, setCoords] = useState();
  const subListTabName = ["Lists Subscribe", "My List", "Discover More"];
  const routeObj = {
    u: "User",
    b: "Business",
    list: "List",
  };
  const dispatch = useDispatch();
  const prevRoute = useHistory();
  const history = useLocation()
    .pathname.split("/")
    .filter((item) => item);
  const selectedTab = useStore((state) => state.tabSelected);
  const listTabSelected = useStore((state) => state.listTabSelected);
  const selectedList = useStore((state) => state.selectedList);
  const draggedLocation = useStore((state) => state.draggedLocation);
  const sublocality = useStore((state) => state.sublocality);
  const city = useStore((state) => state.city);
  const selectedUser = useSelector((state) => state.user);
  const selectedBusiness = useSelector((state) => state.business);
  const setGridMode = useStore((state) => state.setGridMode);
  const gridMode = useStore((state) => state.gridMode);
  const handleToggle = () => {
    if (gridMode) {
      setGridMode(false);
    }
    // if (!gridMode) {
    //   setGridMode(true);
    // }
    if (
      (!gridMode && (selectedTab === 1 || selectedTab === 2)) ||
      (!gridMode &&
        selectedTab === -1 &&
        routeObj[history[0]] === routeObj.list &&
        history.length > 1)
    ) {
      setGridMode(true);
    }
  };

  useEffect(() => {
    switch (selectedTab) {
      case 1:
        setTabTitle("Explore");
        break;
      case 2:
        setTabTitle("Home");
        break;
      case 3:
        setTabTitle("Notifications");
        break;
      case 4:
        setTabTitle("Favorites");
        break;
      case 5:
        setTabTitle("Lists");
        break;
      case -1:
        setTabTitle((prev) => prev);
        break;
    }
    // if (selectedTab !== 1) {
    //   setGridMode(false);
    // }
  }, [selectedTab]);

  useEffect(() => {
    let loc = draggedLocation.lat + " lat " + draggedLocation.lng + " long ";
    setCoords(loc);
  }, [draggedLocation]);


    /** for logout functionality redirection */
    const redirectUserToLoginScreen = () => {
      dispatch(setGloablLoader(false));
      history.push("/consumer/login");
    };

    /** logout consumer */
    const consumerLogout = async () => {
      try {
        dispatch(setGloablLoader(true));
        await Auth.signOut();
        setTimeout(() => redirectUserToLoginScreen(), 3000);
      } catch (error) {
        dispatch(setGloablLoader(false));
      }
    };

  const isObjectId = (id) => {
    return id.length === 24 && !isNaN(Number("0x" + id));
  };
  return (
    <HeaderBar>
      <LeftHeaderBar>
        <UserNameCircle>{selectedUser.user.name[0]}</UserNameCircle>
        <BreadcrumbsDiv>
          <BackArrow onClick={prevRoute.goBack}>
            <img src={BackBtn} />
          </BackArrow>
          <BreadcrumbsText>
            {history.length === 1 && selectedTab !== -1 && selectedTab !== 5 ? (
              <span className="crumb-text">{tabTitle}</span>
            ) : (
              <div className="crumb-text">{tabTitle}</div>
            )}{" "}
            {routeObj[history[0]] && history.length > 1 && (
              <div className="crumb-text">{"/ " + routeObj[history[0]]}</div>
            )}{" "}
            {routeObj[history[0]] && history.length === 1 && (
              <span className="crumb-text">{"/ " + routeObj[history[0]]}</span>
            )}
            {history.length > 1 && isObjectId(history[1]) && (
              <Fragment>
                {routeObj[history[0]] === routeObj.u &&
                  selectedUser?.selectedUser?.name && (
                    <span className="crumb-text">
                      {"/ " + selectedUser.selectedUser.name}
                    </span>
                  )}
                {routeObj[history[0]] === routeObj.b &&
                  selectedBusiness.business[0]?.company_name && (
                    <span className="crumb-text">
                      {"/ " + selectedBusiness.business[0]?.company_name}
                    </span>
                  )}
                {routeObj[history[0]] === routeObj.list && selectedList && (
                  <span className="crumb-text">{"/ " + selectedList.name}</span>
                )}
              </Fragment>
            )}
            {selectedTab === 5 && (
              <span className="crumb-text">
                {"/ " + subListTabName[listTabSelected]}
              </span>
            )}
          </BreadcrumbsText>
        </BreadcrumbsDiv>
      </LeftHeaderBar>

      <RightHeaderBar>
        <button className="toggle ChangeMode" onClick={handleToggle}>
          {gridMode ? "List" : "Grid"}
          {gridMode ? <img src={ListIcon} /> : <img src={GridIcon} />}
        </button>

        <LocationWrap>
          {sublocality + " "}
          {city}
        </LocationWrap>

        {/* <div color="#FF7171" width="20px" onClick={consumerLogout} >Logout</div> */}


        <UserImgWrap onClick={consumerLogout}>
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
  );
};

export default Header;
