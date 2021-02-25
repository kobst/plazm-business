import React, { useState } from "react";
import styled from "styled-components";
import Textarea from "../../../../UI/Textarea";
import Select from "../../../../UI/Select";
import SaveButton from "../../../../UI/SaveButton";
import AddImageImg from "../../../../../../images/addImage.svg";
import CrossIcon from "../../../../../../images/cross-icon.svg";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { addPostToBusiness } from '../../../../../../reducers/businessReducer';
import ValueLoader from '../../../../../../utils/loader';
import './style.css'
import { unwrapResult } from "@reduxjs/toolkit";

const bucket = process.env.REACT_APP_BUCKET;

const UploadOuter = styled.div`
  display: flex;
  margin: 0 10px;
`;

const UploadImage = styled.div`
  width: 31px;
  height: 33px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 3px;
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
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const TextAreaWrap = styled.div`
  width: 100%;
  max-width: calc(100% - 147px);
  @media (max-width: 767px) {
    max-width: 100%;
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
  svg {
    font-size: 34px;
    color: #fff;
  }
`;
let myInput;
const AddPostSection = ({profile, businessId}) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState([]);
  const [imageCopy, setImageCopy] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUploadCopy, setImageUploadCopy] = useState([]);
  const [description, setDescription] = useState("");
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  let data = [...users, ...lists];
  let userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `${myUser.name}`,
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
  const fileName = (name) => {
    return `${Date.now()}-${name}`;
  };

  /*
   * @desc: post images upload function
   */
  const upload = async (e) => {
    const imageArr = imageCopy;
    const imgUpload = imageUploadCopy;
    const file = e.target.files[0];
    const folder_name = folderName();
    const file_name = fileName(file.name);
    const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
    if (imageCopy.length < 5) {
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
        .then((response) => {
          imageArr.push({ id: imageCopy.length + 1, value: baseUrl });
          imgUpload.push({ image: baseUrl });
          setImageUpload([...imgUpload]);
          setImageUploadCopy([...imgUpload]);
          setImageCopy([...imageArr]);
          setImageUrl([...imageArr]);
        })
        .catch(
          (error) => console.log(error) // Handle the error response object
        );
    }
  };

  /*
   * @desc: to delete an image
   * @params: image id
   */
  const deleteImage = (v) => {
    const deleteImage = imageUrl.filter((item) => item.id !== v.id);
    const deleteImageUpload = imageUploadCopy.filter(
      (item) => item !== v.value
    );
    setImageUpload([...deleteImageUpload]);
    setImageUploadCopy([...deleteImageUpload]);
    setImageCopy([...deleteImage]);
    setImageUrl([...deleteImage]);
  };

  /*
  * @desc: handle change function called on post input change
  */
  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    if(mentions.length !== 0) {
      /** to find if the mention is of users or lists */
      const findUser = users.find(i=>i._id === mentions[0].id);
      const findList = lists.find(i=>i._id === mentions[0].id);
      if(findUser){
        /** if mention is of user add it into user's mention array */
        const valueArr = mentionArrayUser;
        valueArr.push(mentions[0].id)
        setMentionArrayUser(valueArr)
      }else if(findList) {
        /** if mention is of list then add into list's mention array  */
        const valueArr = mentionArrayList;
        valueArr.push(mentions[0].id)
        setMentionArrayList(valueArr)
      }
    }
    setDescription(newPlainTextValue);
  };

  /*
   * @desc: add post to specific business  
   */
  const savePost = async () => {
    setLoader(true);
    const obj = {
      business: businessId,
      data: description,
      media: imageUpload,
      taggedUsers: mentionArrayUser,
      taggedLists: mentionArrayList,
      ownerId: profile._id
    }
    const addPost =  await dispatch(addPostToBusiness(obj))
    const response = await unwrapResult(addPost);
    if(response.success === true)
    {
      setLoader(false);
      setDescription("");
    }
  }
  return (
    <>
      <AddPostSectionContent>
        <TextAreaWrap>
          <MentionsInput
            markup="@(__id__)[__display__]"
            value={description}
            onChange={handleChange}
            className="postInput"
            placeholder="What’s Happening ?" 
          >
            <Mention
              type="user"
              trigger="@"
              data={userMentionData}
              className="mentions__mention"
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
              <img src={AddImageImg} alt="" onClick={(e) => myInput.click()} />
            </AddImageDiv>
            <SaveButton onClick={() => savePost()} disabled={loader}> {loader ? <ValueLoader /> : "Post"}</SaveButton>
          </RightBottomWrap>
        </RightWrap>
        {imageUrl ? (
          <UploadOuter>
            {imageUrl.map((v) => (
              <UploadImage id={v.id} onClick={() => deleteImage(v)}>
                <img src={v.value} alt="Upload" />
              </UploadImage>
            ))}
          </UploadOuter>
        ) : null}
      </AddPostSectionContent>
    </>
  );
};

export default AddPostSection;
