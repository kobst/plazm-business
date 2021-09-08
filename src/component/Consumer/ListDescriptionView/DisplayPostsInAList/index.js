import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import DropdwonArrowTop from "../../../../images/top_arrow.png";
import UserMessage from "../../HomeSearch/BusinessListing/UserMessage";
import { useHistory } from "react-router";
import {
  checkMime,
  replaceBucket,
} from "../../../../utilities/checkResizedImage";
import AddPostModal from "../../AddPostModal";
import ModalComponent from "../../UI/Modal";
import DeletePostModal from "../../AddPostModal/DeletePostModal";

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 10px 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 12px 0 12px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: calc(100% - 20px);
    background: #878787;
    top: 50px;
    left: 26px;
    z-index: 1;
    display: none;
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0 0 5px 0;
  margin: 0;
`;

const ProfileThumbBanner = styled.div`
  width: 100%;
  height: 50px;
  margin: 0;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    max-height: 50px;
  }
`;

const ProfileThumbOverlay = styled.div`
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.6) -30%,
    rgba(0, 0, 0, 0.6) 100%
  );
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;

  svg {
    color: #ff0000;
    margin: 0;
  }
  div {
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  div {
    cursor: pointer;
  }
  .ListName {
    max-width: calc(100% - 95px);
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0 0 5px;
    }
  }
`;


const DescriptionViewItem = styled.div`
  .background-active {
    background-color: #221e45;
  }
  .background-inactive {
    background-color: #282352;
  }
`;

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 102px;
  overflow: auto;
  background: #fe02b9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 25px;
  width: 30px;
  overflow: visible;
  right: -5px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: " ";
    top: -12px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 78px;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  @media (max-width: 767px) {
    top: 31px;
    right: 0;
    left: -5px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 0px 5px;
    text-decoration: none;
    font-size: 12px;
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
  }
`;

/** display business details */
const DisplayPostInAList = ({ data, id, setListIndex, setSelectedListId }) => {
  // const [favoriteBusiness, setFavoriteBusiness] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [uploadMenu, setUploadMenu] = useState(false);
  // const user = useSelector((state) => state.user.user);
  const [image, setImage] = useState(
    data.business[0].default_image_url
      ? data.business[0].default_image_url
      : ProfileImg
  );

  useEffect(() => {
    if (data.business[0].default_image_url) {
      const findMime = checkMime(data.business[0].default_image_url);
      const image = replaceBucket(
        data.business[0].default_image_url,
        findMime,
        30,
        30
      );
      setImage(image);
    } else {
      setImage(ProfileImg);
    }
  }, [data]);

  const checkError = () => {
    if (data.business[0].default_image_url) {
      setImage(data.business[0].default_image_url);
    } else {
      setImage(ProfileImg);
    }
  };

  // const dispatch = useDispatch();
  // const getUtcHour = new Date().getUTCHours();
  // const getUtcMinutes = new Date().getUTCMinutes();
  // const currentUtcDay = new Date().getUTCDay();
  const history = useHistory();
  // const days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  // /** to check if business is open/close */
  // const checkBusinessOpenClose = () => {
  //   if (
  //     data.business[0].hours_format &&
  //     data.business[0].hours_format.length > 0
  //   ) {
  //     for (let i = 0; i < data.business[0].hours_format.length; i++) {
  //       const startDayIndex = days.indexOf(
  //         data.business[0].hours_format[i].StartDay
  //       );
  //       const endDayIndex = days.indexOf(
  //         data.business[0].hours_format[i].EndDay
  //       );
  //       if (currentUtcDay >= startDayIndex && currentUtcDay <= endDayIndex) {
  //         const time = moment(getUtcHour + ":" + getUtcMinutes, "HH:mm");
  //         const beforeTime = moment(
  //           data.business[0].hours_format[i].Start,
  //           "HH:mm"
  //         );
  //         const afterTime = moment(
  //           data.business[0].hours_format[i].End,
  //           "HH:mm"
  //         );
  //         if (time.isBetween(beforeTime, afterTime)) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  //   return false;
  // };

  // /** to check if the business is liked */
  // useEffect(() => {
  //   const find = user.favorites.find((i) => i === data.business[0]._id);
  //   if (find) {
  //     setFavoriteBusiness(true);
  //   } else setFavoriteBusiness(false);
  // }, [user, data]);

  // /** to add a business to user favorites */
  // const addFavorite = async () => {
  //   const obj = {
  //     businessId: data.business[0]._id,
  //     userId: user._id,
  //   };
  //   await dispatch(AddBusinessFavorite(obj));
  // };

  // /** to remove a business to user favorites */
  // const removeFavorite = async () => {
  //   const obj = {
  //     businessId: data.business[0]._id,
  //     userId: user._id,
  //   };
  //   await dispatch(RemoveBusinessFavorite(obj));
  // };

  /** to display business details page */
  const displayBusinessDetail = () => {
    setListIndex(data.business[0]._id);
    history.push(`/b/${data.business[0]._id}`);
  };

  /** to delete a post */
  const deletePost = () => {
    setDeletePostModal(true);
    setUploadMenu(false);
  };

  /** to edit a post */
  const editPost = () => {
    setAddPostModal(true);
    setUploadMenu(false);
  };
  return data ? (
    <>
      <DescriptionViewItem>
        <div
          className={id % 2 === 0 ? "background-active" : "background-inactive"}
        >
          <UserMsgWrap>
            <UserMessageContent>
              <ProfileNameHeader>
                <ProfileThumbBanner>
                  <img src={image} onError={() => checkError()} alt="" />
                  <ProfileThumbOverlay />
                  <ProfileName>
                    <div onClick={() => displayBusinessDetail()}>
                      {data.business[0].company_name}
                    </div>
                  </ProfileName>
                </ProfileThumbBanner>
                {/* <ProfileNameWrap>
                <ProfileName>
                  <div onClick={() => displayBusinessDetail()}>
                    {data.business[0].company_name}
                  </div>
                  <RightWrap>
                    {data.business[0].hours_format &&
                    data.business[0].hours_format.length === 0 ? (
                      <div className="CloseDiv">Close</div>
                    ) : checkBusinessOpenClose() === true ? (
                      <div className="OpenDiv">Open</div>
                    ) : (
                      <div className="CloseDiv">Close</div>
                    )}

                    {data.business[0].hours_format &&
                    data.business[0].hours_format.length > 0 &&
                    checkBusinessOpenClose() === true ? (
                      favoriteBusiness ? (
                        <img
                          src={RedHeartIcon}
                          onClick={() => removeFavorite()}
                          className="favoriteBusiness"
                          alt=""
                        />
                      ) : (
                        <img
                          src={FavoritesIcon}
                          onClick={() => addFavorite()}
                          className="favoriteBusinessBorder"
                          alt=""
                        />
                      )
                    ) : null}
                  </RightWrap>
                </ProfileName>
                <ChatInput>
                  <p>
                    <span>
                      {data.business[0].favorites !== null
                        ? data.business[0].favorites.length
                        : 0}
                    </span>{" "}
                    Followers{" "}
                    <span className="postSpan">
                      {data.totalPosts.length > 0
                        ? data.totalPosts[0].totalPosts
                        : 0}
                    </span>{" "}
                    Posts
                  </p>
                </ChatInput>
                <BusinessHashTags data={data.business[0].filter_tags} />
              </ProfileNameWrap> */}
              </ProfileNameHeader>
            </UserMessageContent>
          </UserMsgWrap>

          <UserMessage
            uploadMenu={uploadMenu}
            setUploadMenu={setUploadMenu}
            postData={data}
            businessData={data.business[0]}
            listView={true}
            setSelectedListId={setSelectedListId}
            listDescriptionView={true}
          />
          {uploadMenu && (
            <DropdownContent>
              <ul>
                <li onClick={() => editPost()}>Edit</li>
                <li onClick={() => deletePost()}>Delete</li>
              </ul>
            </DropdownContent>
          )}
        </div>
      </DescriptionViewItem>
      {addPostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addPostModal}
          closeModal={() => setAddPostModal(false)}
        >
          <AddPostModal
            businessId={data.business[0]._id}
            closeModal={() => setAddPostModal(false)}
            data={data}
          />
        </ModalComponent>
      )}
      {deletePostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={deletePostModal}
          closeModal={() => setDeletePostModal(false)}
        >
          <DeletePostModal
            closeModal={() => setDeletePostModal(false)}
            id={data._id}
          />
        </ModalComponent>
      )}
    </>
  ) : null;
};

export default DisplayPostInAList;
