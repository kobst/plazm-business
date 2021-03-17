import React, { useState } from "react";
import styled from "styled-components";
import CrossIcon from "../../../../../../images/cross-icon.svg";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { addPostToBusiness } from "../../../../../../reducers/businessReducer";
import ValueLoader from "../../../../../../utils/loader";
import "./style.css";
import { unwrapResult } from "@reduxjs/toolkit";
import defaultMentionStyle from "./style";
import ModalComponent from '../../../../UI/Modal'
import AddPostModal from '../../../../AddPostModal'
import { findAllUsers } from "../../../../../../reducers/consumerReducer";
import { findAllLists } from "../../../../../../reducers/listReducer";

const bucket = process.env.REACT_APP_BUCKET;

const UploadOuter = styled.div`
  display: flex;
  margin: 0;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UploadImage = styled.div`
  width: 31px;
  height: 33px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  position: relative;
  cursor: pointer;
  img {
    max-width: 100%;
  }
  :hover {
    :after {
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.7) url(${CrossIcon});
      width: 31px;
      height: 33px;
      left: 0;
      top: 0;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

const AddPostSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px;
  background: #292454;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  textarea {
    box-shadow: none;
    border: 0;
    padding: 10px;
    color: #000;
    font-weight: 600;
  }
  .postInput__suggestions {
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
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 10px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 10px;
`;

const TextAreaWrap = styled.div`
  width: 100%;
  max-width: calc(100% - 147px);
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 5px;
  }
`;
const RightWrap = styled.div`
  width: 142px;
  display: flex;
  flex-direction: column;
  select {
    margin-bottom: 5px;
    padding: 0 24px 0 10px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const RightBottomWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
  button {
    font-weight: 600;
    min-width: 107px;
    height: 30px;
    @media (max-width: 767px) {
      margin-left: 5px;
    }
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
const AddPostSection = ({ profile, businessId }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState([]);
  const [imageCopy, setImageCopy] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUploadCopy, setImageUploadCopy] = useState([]);
  const [description, setDescription] = useState("");
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imageError, setImageError] = useState("");
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const ws = useSelector((state) => state.user.ws);
  let data = [...users, ...lists];

  let userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `@${myUser.name}`,
  }));

  /*
   * @desc: to get folder_name in which image needs to be stored in s3 bucket
   */
  const folderName = () => {
    /* to remove all special characters except space */
    const removeSpecialCharacter = profile.name.replace(/[^a-zA-Z ]/g, "");
    /* to replace all spaces to underscore */
    const replacedName = removeSpecialCharacter.split(" ").join("_");
    /* return folder name */
    return replacedName + "_" + profile._id;
  };

  /*
   * @desc: to change file_name
   */
  const fileName = (name, date) => {
    return `${date}_${name}`;
  };

  /*
   * @desc: post images upload function
   */
  const upload = async (e) => {
    if (imageUrl.length < 5) {
      const selectedFile = e.target.files[0];
      const currentDate = Date.now();
      const folder_name = folderName();
      const file_name = fileName(selectedFile.name, currentDate);
      const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
      const idxDot = selectedFile.name.lastIndexOf(".") + 1;
      const extFile = selectedFile.name
        .substr(idxDot, selectedFile.name.length)
        .toLowerCase();
      if (extFile === "jpeg" || extFile === "png" || extFile === "jpg") {
        setImageError("");
        setImageUrl([
          ...imageUrl,
          {
            id: imageUrl.length + 1,
            value: URL.createObjectURL(e.target.files[0]),
            image: baseUrl,
          },
        ]);
        setImageUpload([
          ...imageUpload,
          {
            id: imageUrl.length + 1,
            value: e.target.files[0],
            image: baseUrl,
            date: currentDate,
          },
        ]);
        setImageCopy([...imageCopy, { image: baseUrl }]);
        setImageUploadCopy([...imageUploadCopy, { image: baseUrl }]);
      } else {
        setImageError("Only jpg/jpeg and png,files are allowed!");
      }
    }
  };

  /*
   * @desc: to delete an image
   * @params: image id
   */
  const deleteImage = (v) => {
    const deleteImage = imageUrl.filter((item) => item.id !== v.id);
    const deleteImageUpload = imageUploadCopy.filter(
      (item) => item.image !== v.image
    );
    setImageUploadCopy([...deleteImageUpload]);
    setImageUpload([...deleteImage]);
    setImageCopy([...deleteImageUpload]);
    setImageUrl([...deleteImage]);
  };

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
   * @desc: add post to specific business
   */
  const savePost = async () => {
    if (imageError === "") {
      setLoader(true);
      const obj = {
        business: businessId,
        data: description,
        media: imageCopy,
        taggedUsers: mentionArrayUser,
        taggedLists: mentionArrayList,
        ownerId: profile._id,
      };
      const addPost = await dispatch(addPostToBusiness(obj));
      const response = await unwrapResult(addPost);
      if (response.success === true) {
        ws.send(
          JSON.stringify({
            action: "post",
            businessId: businessId,
            post: {
              postId: response.post._id,
              postDetails: response.post,
              totalComments: 0,
              totalLikes: 0,
              comments: [],
            },
          })
        );

        /**if there are no images added */
        if (imageUpload.length === 0) {
          setLoader(false);
          setDescription("");
        } else {
          imageUpload.map(async (i) => {
            const file = i.value;
            const folder_name = folderName();
            const file_name = fileName(file.name, i.date);
            const value = await fetch(
              `${process.env.REACT_APP_API_URL}/api/upload_photo`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  Key: file_name,
                  ContentType: file.type,
                  folder_name: folder_name,
                }),
              }
            );
            const body = await value.text();
            const Val = JSON.parse(body);

            await fetch(Val, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            })
              .then((response) => {})
              .catch(
                (error) => console.log(error) // Handle the error response object
              );
          });
          setLoader(false);
          setDescription("");
          setImageUrl([]);
          setImageCopy([]);
          setImageUpload([]);
        }
      }
    }
  };
  return (
    <>
<<<<<<< HEAD
      {addPostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addPostModal}
          closeModal={() => setAddPostModal(false)}
        >
          <AddPostModal />
        </ModalComponent>
      )}
=======
>>>>>>> c74cf87786b5fb8378ff23fd8323ccfe4575f8c0
      <AddPostSectionContent>
        <TopSection>
          <TextAreaWrap>
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
                appendSpaceOnAdd={true}
              />
            </MentionsInput>
          </TextAreaWrap>
          <RightWrap>
            <Select disabled={loader}>
              <option>Posting Options</option>
              <option>Posting Options Options</option>
            </Select>
            <RightBottomWrap>
              <AddImageDiv>
                <input
                  id="myInput"
                  onChange={(e) => upload(e)}
                  type="file"
                  ref={(ref) => (myInput = ref)}
                  style={{ display: "none" }}
                  disabled={loader}
                />
                <img
                  src={AddImageImg}
                  alt=""
                  onClick={(e) => myInput.click()}
                />
              </AddImageDiv>
              <SaveButton
                onClick={() => savePost()}
                disabled={
                  loader || description === "" || !description.trim() === true
                }
              >
                {" "}
                {loader ? <ValueLoader /> : "Post"}
              </SaveButton>
            </RightBottomWrap>
          </RightWrap>
        </TopSection>
        <BottomBar>
          {imageUrl ? (
            <UploadOuter>
              {imageError !== "" ? (
                <p>{imageError}</p>
              ) : (
                imageUrl.map((v,key) => (
                  <UploadImage
                    disabled={loader}
                    id={v.id}
                    onClick={() => deleteImage(v)}
                    key={v.id}
                  >
                    <img src={v.value} alt="Upload" />
                  </UploadImage>
                ))
              )}
            </UploadOuter>
          ) : null}
        </BottomBar>
      </AddPostSectionContent>
    </>
  );
};

export default AddPostSection;
