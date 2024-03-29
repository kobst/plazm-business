import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { findAllUsers } from "../../../../reducers/consumerReducer";
import {
  addPostToList,
  findAllLists,
  removePostFromAList,
} from "../../../../reducers/listReducer";
import {
  addPostToBusiness,
  filterData,
} from "../../../../reducers/businessReducer";
import {
  updatePostInMyFeed,
  updatePostToBusiness,
  deletePostInMyFeed,
} from "../../../../reducers/myFeedReducer";
import BottomButtons from "../BottomButtons";
import AddImageImg from "../../../../images/addImage.svg";
import SelectedListing from "../SelectedListing";
import PostImage from "../PostImage";
import error from "../../../../constants";

const bucket = process.env.REACT_APP_BUCKET;

const PostContent = styled.div`
  width: 100%;
  color: #fff;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
    border: 0;
    overflow-y: auto !important;
    padding: 0;
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

const CloseModal = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  svg {
    color: #fff;
    font-size: 22px;
  }
  :hover,
  :focus {
    outline: 0;
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

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  border: 1px solid ${(props) => (props.usererror ? "#FF7171" : "#ffffff")};
  min-height: 60px;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
  padding: 6px 8px;
  margin: 0 0 20px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 0px;
  display: flex;
  flex-direction: column;
`;
let myInput;
const ModalPostContent = ({
  setDisplayList,
  selectedListForPost,
  setSelectedListForPost,
  businessId,
  closeModal,
  description,
  setDescription,
  mentionArrayList,
  setMentionArrayList,
  mentionArrayUser,
  setMentionArrayUser,
  imageUpload,
  setImageUpload,
  businessData,
  imageFile,
  setImageFile,
}) => {
  const [loader, setLoader] = useState(false);
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const [imageError, setImageError] = useState("");
  const ws = useSelector((state) => state.user.ws);
  const user = useSelector((state) => state.user.user);
  const business = useSelector((state) => state.business.business);
  const [descriptionError, setDescriptionError] = useState("");
  const [listError, setListError] = useState("");
  const allData = [...users, ...lists];
  const data = allData.sort(function (a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
  const dispatch = useDispatch();
  const userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `@${myUser.name}`,
  }));
  const filters = useSelector((state) => state.business.filters);

  /** to fetch tagging data */
  useEffect(() => {
    const fetchTaggingData = async () => {
      if (users.length === 0) await dispatch(findAllUsers());
      if (lists.length === 0) await dispatch(findAllLists());
    };
    fetchTaggingData();
  }, [dispatch, lists.length, users.length]);
  /*
   * @desc: handle change function called on post input change
   */
  const handleChange = async (event, newValue, newPlainTextValue, mentions) => {
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
  /*
   * @desc: to get folder_name in which image needs to be stored in s3 bucket
   */
  const getFolderName = () => {
    /* to remove all special characters except space */
    const removeSpecialCharacter = user.name.replace(/[^a-zA-Z ]/g, "");
    /* to replace all spaces to underscore */
    const replacedName = removeSpecialCharacter.split(" ").join("_");
    /* return folder name */
    return replacedName + "_" + user._id;
  };

  /*
   * @desc: to change getFileName
   */
  const getFileName = (name) => {
    return `${Date.now()}-${name}`;
  };

  /*
   * @desc: add a post
   */
  const savePost = async () => {
    if (description === "" || !description.trim() === true) {
      setDescriptionError(error.REQUIRED);
      if (!selectedListForPost) {
        setListError(error.POST_LIST_ERROR);
      } else {
        setListError("");
      }
    } else if (!selectedListForPost) {
      setListError(error.POST_LIST_ERROR);
      if (description === "" || !description.trim() === true) {
        setDescriptionError(error.REQUIRED);
      } else {
        setDescriptionError("");
      }
    } else {
      /* set loader value */
      setLoader(true);
      setListError("");
      setDescriptionError("");
      /* to upload file to s3 bucket on save of profile button */
      let imageUrl = null;
      if (imageFile !== null) {
        const folderName = getFolderName(user.name, user._id);
        const fileName = getFileName(imageFile.name);
        const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folderName}/profiles/${fileName}`;
        const value = await fetch(
          `${process.env.REACT_APP_API_URL}/api/upload_photo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Key: fileName,
              ContentType: imageFile.type,
              folder_name: folderName,
            }),
          }
        );

        const body = await value.text();
        const Val = JSON.parse(body);

        await fetch(Val, {
          method: "PUT",
          headers: {
            "Content-Type": imageFile.type,
          },
          body: imageFile,
        })
          .then(() => {
            imageUrl = baseUrl;
          })
          .catch(
            (error) => console.log(error) // Handle the error response object
          );
      }

      let obj = {
        business: businessId,
        data: description,
        taggedUsers: mentionArrayUser,
        taggedLists: mentionArrayList,
        ownerId: user._id,
        listId: selectedListForPost ? selectedListForPost : null,
        media: imageFile !== null ? (imageUrl !== null ? imageUrl : []) : [],
      };

      if (businessData) {
        /** to update an existing post */
        obj = {
          ...obj,
          _id: businessData._id,
          media:
            imageFile !== null
              ? imageUrl !== null
                ? imageUrl
                : []
              : imageUpload
              ? imageUpload
              : [],
        };
        const updatePost = await dispatch(updatePostToBusiness(obj));
        const response = await unwrapResult(updatePost);
        if (response.success) {
          if (
            businessData.listId.length > 0 &&
            businessData.listId[0]._id === selectedListForPost
          ) {
            // edit post in redux for the same list
            const updatedPost = {
              ...response.post,
              business: businessData.business,
              likes: businessData.likes,
              ownerId: businessData.ownerId,
              listId: businessData.listId,
              totalPosts: businessData.totalPosts,
              totalComments: businessData.totalComments,
              comments: businessData.comments,
            };
            dispatch(updatePostInMyFeed(updatedPost));
          } else {
            // if list is changed then need to remove from redux
            const removeFromList = await dispatch(
              removePostFromAList({
                postId: response.post._id,
                listId: selectedListForPost,
              })
            );
            if (removeFromList) {
              const addToList = await dispatch(
                addPostToList({
                  postId: response.post._id,
                  listId: selectedListForPost,
                })
              );
              if (addToList) {
                dispatch(deletePostInMyFeed(response.post._id));
                closeModal();
                setLoader(false);
                setDescription("");
              }
            }
          }
          closeModal();
          setLoader(false);
          setDescription("");
        }
      } else {
        /* create a post api */
        const addPost = await dispatch(addPostToBusiness(obj));
        const response = await unwrapResult(addPost);
        if (response.success === true) {
          if (selectedListForPost) {
            const addToList = await dispatch(
              addPostToList({
                postId: response.post._id,
                listId: selectedListForPost,
              })
            );
            const res = await unwrapResult(addToList);
            dispatch(
              filterData({
                businessId: businessId,
                filters: filters,
                value: 0,
                ownerId: user._id,
              })
            );
            if (res.data.addPostToList.success === true) {
              closeModal();
              setLoader(false);
              setDescription("");
            }
          } else {
            closeModal();
            setLoader(false);
            setDescription("");
          }
          ws.send(
            JSON.stringify({
              action: "post",
              businessId: businessId,
              post: {
                postId: response.post._id,
                postDetails: {
                  ...response.post,
                  listId: {
                    ...response.post.list,
                    media: response.post.list.image
                      ? [].concat({
                          image: response.post.list.image,
                        })
                      : [],
                  },

                  businessDetails: business[0],
                  totalPosts: [
                    {
                      totalPosts: response.totalPosts,
                    },
                  ],
                },
                totalComments: 0,
                totalLikes: 0,
                comments: [],
              },
            })
          );
        }
      }
    }
  };
  return (
    <>
      <PostContent>
        <TopBar>
          <Heading>What’s Happening?</Heading>
          <CloseModal onClick={() => closeModal()} disabled={loader}>
            <MdClose />
          </CloseModal>
        </TopBar>
        <InputContainer>
          <MentionsInput
            markup="@(__id__)[__display__]"
            value={description}
            onChange={handleChange}
            className="postInput_model"
            placeholder=""
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
          {descriptionError !== "" ? (
            <ErrorDiv>{descriptionError}</ErrorDiv>
          ) : null}
        </InputContainer>
        {imageUpload !== null ? (
          <PostImage
            image={imageUpload}
            setImageUpload={setImageUpload}
            setImageFile={setImageFile}
          />
        ) : (
          <AddYourPostBar>
            <AddYourPostLabel>Add to your Post</AddYourPostLabel>
            <AddImageDiv>
              <input
                id="myInput"
                onChange={(e) => uploadImage(e)}
                type="file"
                accept=".png, .jpg, .jpeg"
                ref={(ref) => (myInput = ref)}
                style={{
                  display: "none",
                }}
                disabled={loader}
              />
              <img src={AddImageImg} alt="" onClick={(e) => myInput.click()} />
            </AddImageDiv>
          </AddYourPostBar>
        )}
        {imageError !== "" ? <ErrorDiv>{imageError}</ErrorDiv> : null}
        <SelectedListing
          selectedListForPost={selectedListForPost}
          setSelectedListForPost={setSelectedListForPost}
        />
        {listError !== "" ? <ErrorDiv>{listError}</ErrorDiv> : null}
        <BottomButtons
          type={businessData ? "editPost" : "post"}
          setDisplayList={setDisplayList}
          loader={loader}
          description={description}
          setDescription={setDescription}
          savePost={savePost}
        />
      </PostContent>
    </>
  );
};

export default ModalPostContent;
