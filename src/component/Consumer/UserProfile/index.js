import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserProfileBody,
  UserProfileContainer,
  ProfileTopBanner,
  BackgroundOpacity,
  PanelContent,
  LeftPanel,
  TopProfileDetails,
  UserProfileImg,
  UserProfileName,
  UserProfileDescription,
  BottomButtonList,
  ListButtons,
  RightPanel,
  LoaderWrap,
} from "./styled.js";
import { BsGrid } from "react-icons/bs";
import {
  clearUserProfilePageListData,
  filterListsByUser,
} from "../../../reducers/listReducer.js";
import { fetchUserProfileData } from "../../../reducers/userReducer";
import ListsGrid from "./ListsGrid";
import DiscoverMore from "../../../images/DiscoverMore.svg";
import PlazmLogo from "../../../images/plazmLogo.jpeg";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import ValueLoader from "../../../utils/loader";

const UserProfile = ({}) => {
  const dispatch = useDispatch("");
  const { id } = useParams();
  const [flag, setFlag] = useState(true);
  const [activeTab, setActiveTab] = useState("created");
  const [data, setData] = useState({ data: [], total: 0 });
  const [page, setPage] = useState({ created: 1, subscribed: 1 });
  const loading = useSelector((state) => state.user.loadingFilterUserLists);
  const loadingFilterUserLists = useSelector(
    (state) => state.list.loadingFilterUserLists
  );
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const userSubscribedLists = useSelector(
    (state) => state.list.userSubscribedLists
  );
  const userCreatedLists = useSelector((state) => state.list.userCreatedLists);
  useEffect(() => {
    if (id || (user && user._id)) dispatch(clearUserProfilePageListData());
    dispatch(
      filterListsByUser({
        id: id || user._id,
        created: true,
        page: 1,
        limit: 200,
      })
    );
    dispatch(
      filterListsByUser({
        id: id || user._id,
        subscribed: true,
        page: 1,
        limit: 200,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await dispatch(fetchUserProfileData(id || user._id));
      const data = await unwrapResult(result);
      if (data) {
        setFlag(false);
      }
    };
    fetchUserProfile();
  }, [dispatch, id]);

  useEffect(() => {
    const listData =
      activeTab === "created" ? userCreatedLists : userSubscribedLists;
    setData(listData);
  }, [activeTab]);

  const fetchMoreLists = () => {
    if (activeTab === "created") {
      setPage((p) => {
        dispatch(
          filterListsByUser({
            id: user._id,
            created: true,
            page: p.created + 1,
            limit: 12,
          })
        );
        return { ...p, created: p.created + 1 };
      });
    } else {
      setPage((p) => {
        dispatch(
          filterListsByUser({
            id: user._id,
            subscribed: true,
            page: p.subscribed + 1,
            limit: 12,
          })
        );
        return { ...p, subscribed: p.subscribed + 1 };
      });
    }
  };

  return flag ? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : (
    <UserProfileBody>
      <UserProfileContainer>
        <ProfileTopBanner>
          <img src="https://picsum.photos/seed/picsum/200/300" />
          <BackgroundOpacity />
        </ProfileTopBanner>
        <PanelContent>
          <LeftPanel>
            <TopProfileDetails>
              <UserProfileImg>
                <img src={PlazmLogo} />
              </UserProfileImg>
              <UserProfileName>
                {selectedUser?.name}{" "}
                <span>
                  {userCreatedLists?.total + userSubscribedLists?.total} lists
                </span>
              </UserProfileName>
              <UserProfileDescription>
                UX Consultant | UI Designer | Motion Graphics Artist | Food
                Lover | Avid Reader | Mountain Biking | Rock Music
              </UserProfileDescription>
            </TopProfileDetails>
            <BottomButtonList>
              <ListButtons
                className={activeTab === "created" ? "active" : null}
                onClick={() => setActiveTab("created")}
              >
                <img src={DiscoverMore} />
                {selectedUser?.name?.split(" ")?.[0]}’s Lists
              </ListButtons>
              <ListButtons
                className={activeTab === "subscribed" ? "active" : null}
                onClick={() => setActiveTab("subscribed")}
              >
                <BsGrid />
                Subscribed Lists
              </ListButtons>
            </BottomButtonList>
          </LeftPanel>
          <RightPanel>
            <ListsGrid
              loader={loading || loadingFilterUserLists}
              data={
                activeTab === "created"
                  ? userCreatedLists.data
                  : userSubscribedLists.data
              }
              totalLists={
                activeTab === "created"
                  ? userCreatedLists.total
                  : userSubscribedLists.total
              }
              offset={
                activeTab === "created" ? page.created * 3 : page.subscribed * 3
              }
              loadMore={fetchMoreLists}
              heading={activeTab}
            />
          </RightPanel>
        </PanelContent>
      </UserProfileContainer>
    </UserProfileBody>
  );
};

export default UserProfile;
