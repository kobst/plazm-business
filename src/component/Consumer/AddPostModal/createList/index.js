import React, { useState } from "react";
import styled from "styled-components";
import AddImageImg from "../../../../images/addImage.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import FormBody from "./formBody";
import { validate } from "./validate";
import ValueLoader from "../../../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../UI/BackButton";
import SaveButton from "../../UI/SaveButton";
import { createList } from "../../../../reducers/listReducer";
import PostImage from "../PostImage";
import { unwrapResult } from "@reduxjs/toolkit";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ImageHandler from "./image-handler";
import { FcCheckmark } from "react-icons/fc";

import {
  TabsSectionContent,
  LeftButtons,
  RightButtons,
  ErrorDiv,
  AddImageDiv,
  AddYourPostLabel,
  AddYourPostBar,
  Heading,
  TopBar,
  PostContent,
  BottomButtonsBar,
  FinalImgdesp,
  FinalImgdespThumb,
  ListNameWrap,
  ListName,
  ListInfo,
  CroppedFinalSection,
  BlackBG,
  CroppedFinalImgSec,
} from "./styles";
import { COVER_IMAGE, PROFILE_IMAGE } from "../../../../constants";
const bucket = process.env.REACT_APP_BUCKET;

const CreateListModel = ({
  setDisplayList,
  setSelectedListForPost,
  setDisplayCreateList,
}) => {
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  /*
  @desc: to check input file format and throw error if invalid image is input
  @params: input file
  */

  // const uploadImage = (e) => {
  //   const selectedFile = e.target.files[0];
  //   const idxDot = selectedFile.name.lastIndexOf(".") + 1;
  //   const extFile = selectedFile.name
  //     .substr(idxDot, selectedFile.name.length)
  //     .toLowerCase();
  //   if (extFile === "jpeg" || extFile === "png" || extFile === "jpg") {
  //     setImageError("");
  //     setProfileImage(URL.createObjectURL(e.target.files[0]));
  //     setImageFile(selectedFile);
  //   } else {
  //     setImageError("Only jpg/jpeg and png,files are allowed!");
  //   }
  // };

  /*
  @desc: to get specific folder name to be created in aws
  @params: consumer name, consumer _id
  */
  const folderName = (name, id) => {
    /* to remove all special characters except space */
    const removeSpecialCharacter = name.replace(/[^a-zA-Z ]/g, "");
    /* to replace all spaces to underscore */
    const replacedName = removeSpecialCharacter.split(" ").join("_");
    /* return folder name */
    return replacedName + "_" + id;
  };
  /*
   * @desc: to change file_name
   */
  const fileName = (name) => {
    return `${Date.now()}-${name}`;
  };
  /*
  @desc: add list
  @params: form values
  */

  const imageUpload = async (imageFile) => {
    const folder_name = folderName(user.name, user._id);
      const file_name = fileName(imageFile.name);
      const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
      const value = await fetch(
        `${process.env.REACT_APP_API_URL}/api/upload_photo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Key: file_name,
            ContentType: imageFile.type,
            folder_name: folder_name,
          }),
        }
      );
      const body = await value.text();
      const Val = JSON.parse(body);

      return fetch(Val, {
        method: "PUT",
        headers: {
          "Content-Type": imageFile.type,
        },
        body: imageFile,
      })
        .then((response) => {
           return baseUrl;
        })
        .catch(
          (error) => console.log(error) // Handle the error response object
        );
  }

  const addList = async (values) => {
    /* to upload file to s3 bucket on save of profile button */
    // let imageUrl = null;
    // const imageFile = null;
    // let coverImageUrl = null;
    
    if (profileImage !== null && coverImage !== null) {
      /*set loader value */
      setLoader(true);
      const coverImageUrl = await imageUpload(coverImage)
      const imageUrl = await imageUpload(profileImage)
      // const folder_name = folderName(user.name, user._id);
      // const file_name = fileName(imageFile.name);
      // const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
      // const value = await fetch(
      //   `${process.env.REACT_APP_API_URL}/api/upload_photo`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       Key: file_name,
      //       ContentType: imageFile.type,
      //       folder_name: folder_name,
      //     }),
      //   }
      // );
      // const body = await value.text();
      // const Val = JSON.parse(body);

      // await fetch(Val, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": imageFile.type,
      //   },
      //   body: imageFile,
      // })
      //   .then((response) => {
      //     imageUrl = baseUrl;
      //   })
      //   .catch(
      //     (error) => console.log(error) // Handle the error response object
      //   );
      const media = []
      if(imageUrl) {
        media.push({ image: imageUrl, thumbnail: "", type: PROFILE_IMAGE })
      }
      if(coverImageUrl) {
        media.push({ image: coverImageUrl, thumbnail: "", type: COVER_IMAGE  })
      }
      const obj = {
        ownerId: user._id,
        title: values.title,
        description: values.description,
        media: media.length ? media : ''
      };
      /* create a list api */
      const res = await dispatch(createList(obj));
      const data = await unwrapResult(res);
      if (data && data.data.createList.success === true) {
        setResponse("List added successfully.");
        setError("");
        setLoader(false);
        setDisplayCreateList(false);
        setDisplayList(false);
        setSelectedListForPost(data.data.createList.list._id);
      } else if (data && data.data.createList.success === false) {
        setLoader(false);
        setResponse("");
        setError("Could not create list");
      }
    } else {
      setImageError("Image Is required");
    }
  };

  /**cancel button functionality */
  const cancelButton = (e) => {
    e.preventDefault();
    setDisplayCreateList(false);
    setDisplayList(true);
  };
  return (
    <PostContent>
      <TopBar>
        <Heading>Create List</Heading>
      </TopBar>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          description: "",
        }}
        /*validation schema */
        validationSchema={Yup.object(validate)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          /*update profile function call*/
          addList(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} method="POST">
            <FormBody loader={loader} setResponse={setResponse} />
            {/* {profileImage !== null ? (
              <PostImage
                loader={loader}
                image={profileImage}
                setImageUpload={setProfileImage}
              />
            ) : (
              <AddYourPostBar>
                <AddYourPostLabel>
                  Add to Photo to your List (required)
                </AddYourPostLabel>
                <AddImageDiv>
                  <input
                    id="myInput"
                    onChange={(e) => uploadImage(e)}
                    type="file"
                    accept=".png, .jpg, .jpeg"
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
              </AddYourPostBar>
            )} */}
            {/* for displaying image error if any */}
            {imageError !== "" ? <ErrorDiv>{imageError}</ErrorDiv> : null}

            {/* for displaying the response of add list */}
            {error !== "" ? (
              <ErrorDiv>{error}</ErrorDiv>
            ) : response !== "" ? (
              <ErrorDiv>{response}</ErrorDiv>
            ) : (
              <></>
            )}
            {/* bottom buttons bar */}

            <TabsSectionContent className="CreateListTabs">
              <Tabs>
                <TabList>
                  <Tab>Cover Photo {coverImage && <> &nbsp;<FcCheckmark size={20} /></>}</Tab>
                  <Tab>Profile Photo {profileImage && <> &nbsp;<FcCheckmark size={20} /></>}</Tab>
                </TabList>
                <TabPanel>
                  <ImageHandler
                    croppedImage={coverImage}
                    setCroppedImage={setCoverImage}
                    imagePreview={coverImagePreview}
                    setImagePreview={setCoverImagePreview}
                  />
                  {/* <ContentTabPanel>
                    <PlusIcon>
                      <FiPlus />
                    </PlusIcon>
                    <ClickText>
                      Click the ‘+’ icon or drag and drop the image.
                    </ClickText>
                    <ClickTextBottom>
                      You may upload Cover image under the size of 2 MB each.
                      Any dimension related message goes here*
                    </ClickTextBottom>
                  </ContentTabPanel> */}
                </TabPanel>
                <TabPanel>
                  <ImageHandler 
                    croppedImage={profileImage}
                    setCroppedImage={setProfileImage}
                    imagePreview={profileImagePreview}
                    setImagePreview={setProfileImagePreview}
                  />
                  {/* <ContentTabPanel>
                    <PlusIcon>
                      <FiPlus />
                    </PlusIcon>
                    <ClickText>
                      Click the ‘+’ icon or drag and drop the image.
                    </ClickText>
                    <ClickTextBottom>
                      You may upload Cover image under the size of 2 MB each.
                      Any dimension related message goes here*
                    </ClickTextBottom>
                  </ContentTabPanel> */}
                </TabPanel>
              </Tabs>
            </TabsSectionContent>

            <CroppedFinalSection>
              <BlackBG></BlackBG>
              <CroppedFinalImgSec>
                <img src={coverImagePreview} />
              </CroppedFinalImgSec>
              <FinalImgdesp>
                <FinalImgdespThumb>
                  <img src={profileImagePreview} alt="" />
                </FinalImgdespThumb>
                <ListNameWrap>
                  <ListName>
                    The 38 Essential Restaurants in New York City
                  </ListName>
                  <ListInfo>
                    From quirky Chinese hot pot in Flushing to splurge-worthy
                    From quirky Chinese hot pot in Flushing to splurge-worthy
                    From quirky Chinese hot pot in Flushing to splurge-worthy
                    From quirky Chinese hot pot in Flushing to splurge-worthy
                    sushi...
                  </ListInfo>
                </ListNameWrap>
              </FinalImgdesp>
            </CroppedFinalSection>

            <BottomButtonsBar>
              <BackButton onClick={(e) => cancelButton(e)} disabled={loader}>
                Cancel
              </BackButton>
              {loader && (
                <div style={{ marginTop: "3px" }}>
                  <ValueLoader />
                </div>
              )}
              {!loader && (
                <SaveButton type="submit" disabled={loader}>
                  Create
                </SaveButton>
              )}
            </BottomButtonsBar>
          </form>
        )}
      </Formik>
    </PostContent>
  );
};

export default CreateListModel;
