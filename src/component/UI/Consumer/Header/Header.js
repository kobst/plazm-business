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
import { useSelector } from "react-redux";

const Header = () => {
  const [tabTitle, setTabTitle] = useState();
  const [coords, setCoords] = useState();
  const routeObj = {
    u: "User",
    b: "Business",
    list: "List",
  };
  const history = useLocation()
    .pathname.split("/")
    .filter((item) => item);
  const selectedTab = useStore((state) => state.tabSelected);
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
    if (!gridMode) {
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
        setTabTitle("Discover Lists");
        break;
      case -1:
        setTabTitle((prev) => prev);
        break;
    }
  }, [selectedTab]);

  useEffect(() => {
    let loc = draggedLocation.lat + " lat " + draggedLocation.lng + " long ";
    setCoords(loc);
  }, [draggedLocation]);

  const isObjectId = (id) => {
    return id.length === 24 && !isNaN(Number("0x" + id));
  };
  return (
    <HeaderBar>
      <LeftHeaderBar>
        <UserNameCircle>P</UserNameCircle>
        <BreadcrumbsDiv>
          <BackArrow>
            <img src={BackBtn} />
          </BackArrow>
          <BreadcrumbsText>
            {tabTitle}{" "}
            {routeObj[history[0]] && <span>{"/ " + routeObj[history[0]]}</span>}
            {history.length > 1 && isObjectId(history[1]) && (
              <Fragment>
                {routeObj[history[0]] === routeObj.u &&
                  selectedUser?.selectedUser?.name && (
                    <span>{"/ " + selectedUser.selectedUser.name}</span>
                  )}
                {routeObj[history[0]] === routeObj.b &&
                  selectedBusiness.business[0]?.company_name && (
                    <span>
                      {"/ " + selectedBusiness.business[0]?.company_name}
                    </span>
                  )}
                {routeObj[history[0]] === routeObj.list && selectedList && (
                  <span>{"/ " + selectedList.name}</span>
                )}
              </Fragment>
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
  );
};

export default Header;
