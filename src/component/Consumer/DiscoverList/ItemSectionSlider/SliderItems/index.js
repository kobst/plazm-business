import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import EventImg from "../../../../../images/eventimg.png";
import LockImage from "../../../../../images/lock.png";
import FollwersImg from "../../../../../images/profile-img.png";
import {
  ItemsWrapper,
  CoverImg,
  ItemsDescription,
  CollectionPara,
  Lock,
  DisplayItemContent,
  InnerCoverImg,
  InnerItemsDescription,
  InnerCollectionPara,
  AuthorInfo,
  FollowedBy,
  FollowedByListUl,
  InnerDescriptionPara,
  SubscribeBtn,
  InnerBottomBtns
} from "../../styled";
import {
  SubscribeToAListAction,
  UnSubscribeToAList,
  userSubscribeToAList,
  userUnSubscribeToAList,
} from "../../../../../reducers/listReducer";
import {
  removeSubscribedList,
  addSubscribedList,
} from "../../../../../reducers/userReducer";

import useStore from "../../../useState";
import ValueLoader from "../../../../../utils/loader";

import { useHistory } from "react-router-dom";
import ButtonBlue from "../../../UI/ButtonBlue";

const getImage = (selectedList) => {
  if (selectedList && selectedList.media && selectedList.media.length > 0) {
    const img =
      selectedList.media.find(({ image_type }) => image_type === "COVER") ||
      selectedList.media[0];
    console.log(img, "img");
    return img["image"];
  }
  return EventImg;
};

const NewInBuzzItems = ({
  data,
  // setSelectedListId,
  setDiscoverBtn,
  setReadMore,
  heading,
  modal,
  setModal,
  selectedId,
  setSelectedId,
  setTotalLists,
  totalLists,
  displayIn
}) => {
  const user = useSelector((state) => state.user.user);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(() => getImage(data));

  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setSelectedList = useStore((state) => state.setSelectedList);

  const divRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  /** to set position on hover of text */
  const displayData = () => {
    const { top, right } = divRef.current.getBoundingClientRect();
    setTimeout(() => {
      const offsetLeftMinus = displayIn === 'GRID' ? 200 : 300
      setOffsetLeft(right - offsetLeftMinus);
      setOffsetTop(top - 30);
      setModal(true);
      setSelectedId({ id: data._id, heading: heading });
    }, 500);
  };

  /** to open list description view */
  const ReadMore = () => {
    // console.log(" reading more");
    setDiscoverBtn(false);
    setSelectedListId(data._id);
    setSelectedList(data);
    setReadMore(true);
    history.push(`/list/${data._id}`);
  };

  /** to unsubscribe from a list */
  const listUnSubscribe = async () => {
    setLoader(true);
    const obj = {
      userId: user._id,
      listId: data._id,
    };
    const list = await dispatch(UnSubscribeToAList(obj));
    const response = await unwrapResult(list);
    if (response) {
      setLoader(false);
      dispatch(removeSubscribedList(response.listId));
      dispatch(
        userUnSubscribeToAList({
          type: heading,
          listId: response.listId,
          user: user,
        })
      );
      /** to update subscribe count */
      setTotalLists(totalLists - 1);
    }
  };

  /** to subscribe from a list */
  const listSubscribe = async () => {
    setLoader(true);
    const obj = {
      userId: user._id,
      listId: data._id,
    };
    const list = await dispatch(SubscribeToAListAction(obj));
    const response = await unwrapResult(list);
    if (response) {
      setLoader(false);
      dispatch(addSubscribedList(response.listId));
      dispatch(
        userSubscribeToAList({
          type: heading,
          listId: response.listId,
          user: user,
        })
      );
      /** to update subscribe count */
      setTotalLists(totalLists + 1);
    }
  };

  const hideData = () => {
    setModal(false);
    setSelectedId(null);
  };

  return (
    <>
      <ItemsWrapper ref={divRef} className="UserProfileGridList">
        <CoverImg
          onMouseOver={() => displayData()}
          onMouseLeave={() => hideData()}
          className="UserProfileCoverImg"
        >
          <img src={image} alt="" onError={() => setImage(EventImg)} />
          {!data.isPublic && data.isPublic !== null && (
            <Lock>
              <img src={LockImage} alt="" />
            </Lock>
          )}
          <ItemsDescription>
            <CollectionPara>{data.name}</CollectionPara>
            {modal &&
              selectedId &&
              selectedId.id === data._id &&
              selectedId.heading === heading &&
              offsetLeft !== 0 && (
                <DisplayItemContent
                  className="InnerModal"
                  offsetLeft={offsetLeft}
                  offsetTop={offsetTop}
                >
                  <InnerCoverImg className="InnerModalCoverImg">
                    <img
                      src={image}
                      alt=""
                      onError={() => setImage(EventImg)}
                    />
                    <InnerItemsDescription>
                      <InnerCollectionPara>{data.name}</InnerCollectionPara>
                    </InnerItemsDescription>
                  </InnerCoverImg>
                  <AuthorInfo>
                    by{" "}
                    <strong>
                      {data.ownerId && data.ownerId.length > 0
                        ? data.ownerId[0].name
                        : data.ownerId && data.ownerId.name}
                    </strong>
                    <br />
                    Last Updated{" "}
                    {moment(data.updatedAt).format(
                      "MMM DD,YYYY, hh:MM a"
                    )} EST{" "}
                  </AuthorInfo>
                  <FollowedBy>
                    {data?.subscribers?.length > 0 && <h2>Followed by</h2>}
                    <FollowedByListUl>
                      {data?.subscribers?.length > 0 &&
                        data.subscribers.slice(0, 8).map((i, key) => {
                          return (
                            <li key={key}>
                              <img
                                src={
                                  i.photo && i.photo !== ""
                                    ? i.photo
                                    : FollwersImg
                                }
                                alt=""
                              />
                            </li>
                          );
                        })}
                      {data?.subscribers?.length > 7 ? (
                        <div className="MorePlus">
                          +{data.subscribers.length - 7} more
                        </div>
                      ) : null}
                    </FollowedByListUl>
                  </FollowedBy>
                  <InnerDescriptionPara>
                    {data?.description}....
                    <strong onClick={() => ReadMore()}>Read More</strong>
                  </InnerDescriptionPara>
                  <InnerBottomBtns>
                  <ButtonBlue>Visit</ButtonBlue>
                  {data?.subscribers.length === 0 ||
                  !data?.subscribers.find((i) => i._id === user._id) ? (
                    <>
                    
                    <SubscribeBtn
                      onClick={() => listSubscribe()}
                      disabled={loader}
                    >
                      {loader ? <ValueLoader /> : "Subscribe"}
                    </SubscribeBtn></>
                  ) : (
                    <SubscribeBtn
                      onClick={() => listUnSubscribe()}
                      disabled={loader}
                    >
                      {loader ? <ValueLoader /> : "UnSubscribe"}
                    </SubscribeBtn>
                  )}
                  </InnerBottomBtns>
                </DisplayItemContent>
              )}
          </ItemsDescription>
        </CoverImg>
      </ItemsWrapper>
    </>
  );
};

export default NewInBuzzItems;
