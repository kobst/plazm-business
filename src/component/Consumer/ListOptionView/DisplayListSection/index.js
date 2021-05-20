import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdNotificationsActive, MdMessage } from "react-icons/md";
import UploadImg from "../../../../images/upload-img.jpg";
import DropdwonArrowTop from "../../../../images/top_arrow.png";
// import { FaSort } from "react-icons/fa";
// import { CgLock } from "react-icons/cg";
import FollwersImg from "../../../../images/profile-img.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import CheckboxSquare from "../../UI/CheckboxSquare";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserCreatedList } from "../../../../reducers/listReducer";
const ListSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px;
  background: #1d193b;
  :nth-child(even) {
    background-color: #282352;
  }
  :nth-child(odd) {
    background-color: #221e45;
  }
  &.AlternateBgColor {
    background: #24204a;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ListImageWrap = styled.div`
  width: 157px;
  height: 136px;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px 8px 0;
  padding-bottom: 1px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListDetailWrap = styled.div`
  width: calc(100% - 165px);
  display: flex;
  flex-direction: column;
  padding: 14px 10px 14px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 8px;
  }
`;

const ListHeadingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 10px;
`;

const ListHeading = styled.div`
  max-width: 256px;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  text-transform: capitalize;
  color: #cafffc;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DotsDiv = styled.div`
  width: 30px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  svg {
    font-size: 14px;
    color: #fff;
  }
`;

const FollowedSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
`;

const FollowedHeading = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 10px;
  color: #ffffff;
`;

const FollowedListingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const FollowersListing = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowersList = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: -6px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const MoreSection = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #ffffff;
  margin: 0 0 0 20px;
`;

const BottomMoreSections = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 479px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 479px) {
    margin: 0 0 10px;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: #fff;
  margin: 0 10px 0 0;
  svg {
    font-size: 12px;
    color: #fff;
    margin: 0 0 0 5px;
  }
`;

const LastDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: #fff;
  margin: 0;
`;

// const LockDiv = styled.div`
//   width: 18px;
//   height: 18px;
//   border-radius: 50%;
//   border: 0;
//   background: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   svg {
//     font-size: 12px;
//     color: #ff2e9a;
//   }
// `;

const SubscribedBtn = styled.button`
  padding: 2px 15px;
  border-radius: 20px;
  background: #b4adf4;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: #ffffff;
  margin: 0 10px;
  cursor: pointer;
  :hover,
  :focus {
    outline: 0;
  }
`;

const MyListBtn = styled.button`
  padding: 2px 15px;
  border-radius: 20px;
  background: #fdbb30;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: #ffffff;
  margin: 0 10px;
  cursor: pointer;
  :hover,
  :focus {
    outline: 0;
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
  top: -15px;
  width: 109px;
  overflow: visible;
  right: 50px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: " ";
    top: 23px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    right: -96px;
    transform: rotate(90deg);
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
    padding: 3px 5px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
  }
`;

const CustomCheckSquare = styled.div``;
const DisplayListSection = ({ data, setSelectedListId }) => {
  const user = useSelector((state) => state.user.user);
  const [uploadMenu, setUploadMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUploadMenu(false);
    }
  };

  /** to toggle side menu */
  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu);
  };

  /** to delete a list */
  const deleteList = async () => {
    const obj = {
      userId: user._id,
      listId: data._id,
    };
    await dispatch(deleteUserCreatedList(obj));
    setUploadMenu(false)
  };
  return (
    <>
      <ListSection>
        <ListImageWrap>
          <img
            src={data.media.length > 0 ? data.media[0].image : UploadImg}
            alt=""
          />
        </ListImageWrap>
        <ListDetailWrap>
          <ListHeadingWrap>
            <ListHeading>{data.name}</ListHeading>
            <DotsDiv ref={menuRef}>
              <BsThreeDotsVertical onClick={toggleUploadMenu} />
              {uploadMenu && (
                <DropdownContent>
                  <ul>
                    <li onClick={()=>setSelectedListId(data._id)}>View</li>

                    <li>Detailed View</li>
                    <li>Make Public</li>
                    {data.ownerId === user._id ? (
                      <li onClick={() => deleteList()}>Delete</li>
                    ) : null}
                  </ul>
                </DropdownContent>
              )}
            </DotsDiv>
          </ListHeadingWrap>

          <FollowedSection>
            {data.followers.length > 0 ? (
              <FollowedHeading>Followed by</FollowedHeading>
            ) : null}
            <FollowedListingWrap>
              <FollowersListing>
                {data.followers.length > 0
                  ? data.followers.slice(0, 8).map((i, key) => {
                      return (
                        <FollowersList key={key}>
                          <img src={i.photo ? i.photo : FollwersImg} alt="" />
                        </FollowersList>
                      );
                    })
                  : null}
              </FollowersListing>
              {data.followers.length > 7 ? (
                <MoreSection>+{data.followers.length - 7} more</MoreSection>
              ) : null}
            </FollowedListingWrap>
          </FollowedSection>

          <BottomMoreSections>
            <LeftDiv>
              <FirstDiv>
                <span>0</span>
                <MdNotificationsActive />
              </FirstDiv>
              <FirstDiv>
                <span>0</span>
                <MdMessage />
              </FirstDiv>
            </LeftDiv>

            <LastDiv>
              {/* <LockDiv>
                <CgLock />
              </LockDiv> */}

              {data.ownerId === user._id ? (
                <MyListBtn> My lists</MyListBtn>
              ) : (
                <SubscribedBtn>Subscribed</SubscribedBtn>
              )}

              <CustomCheckSquare>
                <CheckboxSquare />
              </CustomCheckSquare>
            </LastDiv>
          </BottomMoreSections>
        </ListDetailWrap>
      </ListSection>
    </>
  );
};

export default DisplayListSection;
