import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../UI/Input/Input";
import { FiSearch } from "react-icons/fi";
import { MdCheck } from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars";
import BottomButtons from "../BottomButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLists } from "../../../../reducers/listReducer";
import ValueLoader from "../../../../utils/loader";

const AllListingsContent = styled.div`
  width: 100%;
  .ScrollListing {
    border-bottom: 1px dashed #ffffff;
    margin: 0 0 18px;
    .thumb-vertical {
      position: relative;
      display: block;
      width: 100px;
      height: 100px;
      cursor: pointer;
      border-radius: inherit;
      background-color: #fff;
    }

    .track-vertical {
      position: absolute;
      width: 3px !important;
      display: block !important;
      right: 2px;
      bottom: 2px;
      top: 2px;
      border-radius: 0px;
    }
  }
`;

const SearchWrap = styled.div`
  width: 100%;
  background: #fff;
  height: 50px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  input {
    border: 0;
    outline: 0;
    padding: 0 10px;
    width: calc(100% - 70px);
    height: 50px;
  }
`;

const SearchIconDiv = styled.div`
  width: 70px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #c4c4c4;
    font-weight: bold;
  }
`;

const AllListingHead = styled.div`
  width: 100%;
  border-bottom: 1px dashed #ffffff;
  padding: 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
`;

const AllListingHeading = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const SelectedListed = styled.h1`
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #ff2e9a;
`;

const ListingWrap = styled.div`
  width: 100%;
  border-bottom: 1px dashed #ffffff;
  padding: 0 0 8px;
  display: flex;
  flex-direction: column;
`;

const ListingList = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
  min-height: 36px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 7px;
  cursor: pointer;
  transition: 0.3s;
  .RightTickImg {
    display: none;
  }
  .RightTickImgSelected {
    background: #201d42;
    transition: 0.3s;
    display: block;
    svg {
      display: block;
    }
  }
  &.selectedList {
    background-color: #201d42;
  }
`;

const RightTick = styled.div`
  svg {
    color: #fff;
    font-size: 22px;
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
`;

const AllListings = ({
  setDisplayList,
  setSelectedListForPost,
  selectedListForPost,
  setDescription,
  description,
  mentionArrayList,
  setMentionArrayList,
  mentionArrayUser,
  setMentionArrayUser,
  setDisplayCreateList
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userListsFromStore = useSelector((state) => state.list.userLists);
  const [userListsFiltered, setUserListsFiltered] = useState([]);
  const loadingUserLists = useSelector((state) => state.list.loadingUserLists);
  const [selectedList, setSelectedList] = useState(null);
  const [search, setSearch] = useState("")

  const userLists = userListsFiltered.length >0 ? userListsFiltered : userListsFromStore

  /**fetch user list */
  useEffect(() => {
    if(userLists.length === 0)
    dispatch(fetchUserLists(user._id));
  }, [dispatch, user._id, userLists.length]);

  /** to set selected list */
  useEffect(() => {
    if (selectedListForPost !== null) {
      setSelectedList(
        userLists.filter((i) => i._id === selectedListForPost)[0]._id
      );
    }
  }, [selectedListForPost, userLists]);

  /** lists search functionality implemented */
  useEffect(()=>{
    setUserListsFiltered(userListsFromStore.filter(entry => entry.name.toLowerCase().indexOf(search.toLowerCase())!==-1))
  },[search,userListsFromStore])

  /** to select a particular list */
  const selectList = (id) => {
    if (selectedList === id) setSelectedList(null);
    else setSelectedList(id);
  };

  /** on change handler for search */
  const searchList = (e) => {
    setSearch(e.target.value);
  }
  return (
    <>
      <AllListingsContent>
        <SearchWrap>
          <Input onChange={(e)=>searchList(e)}/>
          <SearchIconDiv>
            <FiSearch />
          </SearchIconDiv>
        </SearchWrap>
        <AllListingHead>
          <AllListingHeading>All lists</AllListingHeading>
          <SelectedListed>
            {selectedList === null ? "0" : "1"} list selected
          </SelectedListed>
        </AllListingHead>
        <Scrollbars
          autoHeight
          autoHeightMin={0}
          autoHeightMax={220}
          thumbMinSize={30}
          renderThumbVertical={(props) => (
            <div {...props} className="thumb-vertical" />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className="track-vertical" />
          )}
          className="ScrollListing"
        >
          <ListingWrap>
            {loadingUserLists ? (
              <LoaderWrap>
                <ValueLoader />
              </LoaderWrap>
            ) : (
              userLists.map((i, key) => {
                return (
                  <ListingList
                    key={key}
                    onClick={() => selectList(i._id)}
                    className={selectedList === i._id ? "selectedList" : ""}
                  >
                    {i.name}
                    <RightTick
                      className={
                        selectedList === i._id
                          ? "RightTickImgSelected"
                          : "RightTickImg"
                      }
                    >
                      <MdCheck />
                    </RightTick>
                  </ListingList>
                );
              })
            )}
          </ListingWrap>
        </Scrollbars>
        <BottomButtons
          type="list"
          selectedList={selectedList}
          setDisplayList={setDisplayList}
          setSelectedListForPost={setSelectedListForPost}
          setDescription={setDescription}
          description={description}
          mentionArrayList={mentionArrayList}
          setMentionArrayList={setMentionArrayList}
          mentionArrayUser={mentionArrayUser}
          setMentionArrayUser={setMentionArrayUser}
          setDisplayCreateList={setDisplayCreateList}
        />
      </AllListingsContent>
    </>
  );
};

export default AllListings;
