import React, { useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import BottomButtons from "../BottomButtons";
import AddImageImg from "../../../../images/addImage.svg";
import SelectedListing from "../SelectedListing";
import PostImage from "../PostImage";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers } from "../../../../reducers/consumerReducer";
import { findAllLists } from "../../../../reducers/listReducer";

const PostContent = styled.div`
  width: 100%;
  color: #fff;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  .postInput_model__suggestions {
    background-color: #fe02b9 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    padding: 15px;
    height: auto;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    ul {
      margin: 0 0 5px;
      padding: 0;
      li {
        color: #fff;
        font-size: 10px;
        font-weight: 500;
        margin: 0 0 5px;
        padding: 0;
      }
    }
  }
  .postInput_model {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
    border: 0;
    height: 60px;
    font-size: 16px;
    line-height: normal;
    width: 100%;
    padding: 10px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 2px;
    resize: none;
    font-size: 12px;
    font-family: Montserrat;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #c6c6c6;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
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
let myInput;
const ModalPostContent = ({setDisplayList, selectedListForPost, setSelectedListForPost}) => {
  const [description, setDescription] = useState("");
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const [imageFile, setImageFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageError, setImageError] = useState("");
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

  /*
  @desc: to check input file format and throw error if invalid image is input
  @params: input file
  */
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const idxDot = selectedFile.name.lastIndexOf(".") + 1;
      const extFile = selectedFile.name
        .substr(idxDot, selectedFile.name.length)
        .toLowerCase();
      if (extFile === "jpeg" || extFile === "png" || extFile === "jpg") {
        setImageError("");
        setImageUpload(URL.createObjectURL(e.target.files[0]));
        setImageFile(selectedFile);
      } else {
        setImageError("Only jpg/jpeg and png,files are allowed!");
      }
    }
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
          className="postInput_model"
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
        <AddYourPostBar>
          <AddYourPostLabel>Add to your Post</AddYourPostLabel>
          <AddImageDiv>
            <input
              id="myInput"
              onChange={(e) => uploadImage(e)}
              type="file"
              ref={(ref) => (myInput = ref)}
              style={{ display: "none" }}
              disabled={loader}
            />
            <img src={AddImageImg} alt="" onClick={(e) => myInput.click()} />
          </AddImageDiv>
        </AddYourPostBar>
        {imageUpload !== null ? (
          <PostImage image={imageUpload} setImageUpload={setImageUpload} />
        ) : null}
        <SelectedListing selectedListForPost={selectedListForPost} setSelectedListForPost={setSelectedListForPost}/>
        <BottomButtons type="post" setDisplayList={setDisplayList}/>
      </PostContent>
    </>
  );
};

export default ModalPostContent;
