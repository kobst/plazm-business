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
} from "./styled.js";
import { BsGrid } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import {
  clearUserProfilePageListData,
  filterListsByUser,
} from "../../../reducers/listReducer.js";
import ListsGrid from "./ListsGrid";
import DiscoverMore from "../../../images/DiscoverMore.svg";

const UserProfile = ({}) => {
  const dispatch = useDispatch("");
  const [activeTab, setActiveTab] = useState("created");
  const [data, setData] = useState({ data: [], total: 0 });
  const [page, setPage] = useState({ created: 1, subscribed: 1 });
  const loading = useSelector((state) => state.user.loadingFilterUserLists);
  const loadingFilterUserLists = useSelector(
    (state) => state.list.loadingFilterUserLists
  );
  const user = useSelector((state) => state.user.user);
  const userSubscribedLists = useSelector(
    (state) => state.list.userSubscribedLists
  );
  const userCreatedLists = useSelector((state) => state.list.userCreatedLists);
  useEffect(() => {
    if (user && user._id) dispatch(clearUserProfilePageListData());
    dispatch(
      filterListsByUser({ id: user._id, created: true, page: 1, limit: 12 })
    );
    dispatch(
      filterListsByUser({ id: user._id, subscribed: true, page: 1, limit: 12 })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  return (
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
                <img src="https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY" />
              </UserProfileImg>
              <UserProfileName>
                {user?.name}{" "}
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
                {user?.name?.split(" ")?.[0]}’s Lists
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
