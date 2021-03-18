import React, { useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Textarea from "../../UI/Textarea";
import BottomButtons from "../BottomButtons";
import AddImageImg from "../../../../images/addImage.svg";
import SelectedListing from "../SelectedListing";
import PostImage from "../PostImage";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers } from '../../../../reducers/consumerReducer';
import { findAllLists } from '../../../../reducers/listReducer';

const PostContent = styled.div`
  width: 100%;
  color: #fff;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px;
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const CloseModal = styled.div`
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 22px;
  }
`;

const AddYourPostBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 14px;
  border: 1px dashed #ffffff;
  align-items: center;
  padding: 13px;
  @media (max-width: 767px) {
    padding: 7px;
  }
`;

const AddYourPostLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin: 0 0 0 10px;
  max-width: calc(100% - 35px);
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`;

const AddImageDiv = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: #fff;
  }
`;

const ModalPostContent = () => {
  const [description, setDescription] = useState("");
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const ws = useSelector((state) => state.user.ws);
  let data = [...users, ...lists];
  const dispatch = useDispatch();
  let userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `@${myUser.name}`,
  }));
    /*
   * @desc: handle change function called on post input change
   */
    const handleChange = async (event, newValue, newPlainTextValue, mentions) => {
    /** to fetch all users and list data */
    if (users.length === 0) await dispatch(findAllUsers());
    if (lists.length === 0) await dispatch(findAllLists());

      if (mentions.length !== 0) {
        /** to find if the mention is of users or lists */
        const findUser = users.find((i) => i._id === mentions[0].id);
        const findList = lists.find((i) => i._id === mentions[0].id);
        if (findUser) {
          /** if mention is of user add it into user's mention array */
          const valueArr = mentionArrayUser;
          valueArr.push(mentions[0].id);
          setMentionArrayUser(valueArr);
        } else if (findList) {
          /** if mention is of list then add into list's mention array  */
          const valueArr = mentionArrayList;
          valueArr.push(mentions[0].id);
          setMentionArrayList(valueArr);
        }
      }
      setDescription(newPlainTextValue);
    };
  return (
    <>
      <PostContent>
        <TopBar>
          <Heading>What’s Happening?</Heading>
          <CloseModal>
            <MdClose />
          </CloseModal>
        </TopBar>
        <MentionsInput
              markup="@(__id__)[__display__]"
              value={description}
              onChange={handleChange}
              className="postInput"
              placeholder="What’s Happening ?"
              disabled={loader}
            >
              <Mention
                type="user"
                trigger="@"
                data={userMentionData}
                className="mentions__mention"
              />
            </MentionsInput>
        {/* <Textarea></Textarea> */}
        <AddYourPostBar>
          <AddYourPostLabel>Add to your Post</AddYourPostLabel>
          <AddImageDiv>
            <img src={AddImageImg} alt="" />
          </AddImageDiv>
        </AddYourPostBar>
        <PostImage />
        <SelectedListing />
        <BottomButtons />
      </PostContent>
    </>
  );
};

export default ModalPostContent;
