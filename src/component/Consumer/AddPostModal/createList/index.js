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
import ImageHandler from "./ImageHandler";
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
import ButtonGrey from "../../UI/ButtonGrey";
const bucket = process.env.REACT_APP_BUCKET;

const CreateListModel = ({
  setDisplayList,
  setSelectedListForPost,
  setDisplayCreateList,
}) => {
  const [loader, setLoader] = useState(false);
  const [profileBaseImage, setBaseProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverBaseImage, setBaseCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [previewCreated, setPreviewCreated] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({});
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
  };

  const addList = async (values) => {
    /* to upload file to s3 bucket on save of profile button */

    if (profileImage !== null && coverImage !== null) {
      /*set loader value */
      setLoader(true);
      const coverImageUrl = await imageUpload(coverImage);
      const imageUrl = await imageUpload(profileImage);
      const media = [];
      if (imageUrl) {
        media.push({
          image: imageUrl,
          thumbnail: "",
          image_type: PROFILE_IMAGE,
        });
      }
      if (coverImageUrl) {
        media.push({
          image: coverImageUrl,
          thumbnail: "",
          image_type: COVER_IMAGE,
        });
      }
      const obj = {
        ownerId: user._id,
        title: values.title,
        description: values.description,
        media: media.length ? media : "",
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

  const createPreview = (values) => {
    if (profileImage !== null && coverImage !== null) {
      setPreviewCreated(true);
      setFormData(values);
    }
  };

  return (
    <PostContent>
      {!previewCreated ? (
        <>
          <TopBar>
            <Heading>Create List</Heading>
          </TopBar>
          <Formik
            enableReinitialize={true}
            initialValues={{
              title: formData.title ?? "",
              description: formData.description ?? "",
            }}
            /*validation schema */
            validationSchema={Yup.object(validate)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              /*update profile function call*/
              createPreview(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} method="POST">
                <FormBody loader={loader} setResponse={setResponse} />
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
                      <Tab>
                        Cover Photo{" "}
                        {coverImage && (
                          <>
                            {" "}
                            &nbsp;
                            <FcCheckmark size={20} />
                          </>
                        )}
                      </Tab>
                      <Tab>
                        Profile Photo{" "}
                        {profileImage && (
                          <>
                            {" "}
                            &nbsp;
                            <FcCheckmark size={20} />
                          </>
                        )}
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <ImageHandler
                        croppedImage={coverImage}
                        setCroppedImage={setCoverImage}
                        imagePreview={coverImagePreview}
                        setImagePreview={setCoverImagePreview}
                        type="Cover"
                        aspect={16 / 9}
                        cropHeight={140}
                        cropWidth={620}
                        imgSrc={profileBaseImage}
                        setImgSrc={setBaseProfileImage}
                      />
                    </TabPanel>
                    <TabPanel>
                      <ImageHandler
                        croppedImage={profileImage}
                        setCroppedImage={setProfileImage}
                        imagePreview={profileImagePreview}
                        setImagePreview={setProfileImagePreview}
                        type="Profile"
                        aspect={1}
                        cropHeight={140}
                        cropWidth={140}
                        imgSrc={coverBaseImage}
                        setImgSrc={setBaseCoverImage}
                      />
                    </TabPanel>
                  </Tabs>
                </TabsSectionContent>
                <BottomButtonsBar>
                  <ButtonGrey
                    onClick={(e) => cancelButton(e)}
                    disabled={loader}
                  >
                    Cancel
                  </ButtonGrey>
                  {loader && (
                    <div style={{ marginTop: "3px" }}>
                      <ValueLoader />
                    </div>
                  )}
                  {!loader && (
                    <SaveButton
                      className={
                        profileImage == null ||
                        coverImage == null ||
                        !formik.values.title ||
                        !formik.values.description
                          ? "disabled"
                          : null
                      }
                      type="submit"
                      disabled={loader}
                    >
                      Create Preview
                    </SaveButton>
                  )}
                </BottomButtonsBar>
              </form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <CroppedFinalSection>
            <BlackBG></BlackBG>
            <CroppedFinalImgSec>
              <img src={coverImagePreview} alt="" />
            </CroppedFinalImgSec>
            <FinalImgdesp>
              <FinalImgdespThumb>
                <img src={profileImagePreview} alt="" />
              </FinalImgdespThumb>
              <ListNameWrap>
                <ListName>{formData.title}</ListName>
                <ListInfo>{formData.description}</ListInfo>
              </ListNameWrap>
            </FinalImgdesp>
          </CroppedFinalSection>
          <BottomButtonsBar>
            <BackButton
              onClick={() => setPreviewCreated(false)}
              disabled={loader}
              className="BackButtonCreateList"
            >
              Back
            </BackButton>
            <ButtonGrey onClick={(e) => cancelButton(e)} disabled={loader}>
              Cancel
            </ButtonGrey>
            {loader && (
              <div style={{ marginTop: "3px" }}>
                <ValueLoader />
              </div>
            )}
            {!loader && (
              <SaveButton
                type="button"
                onClick={() => addList(formData)}
                disabled={loader}
              >
                Create List
              </SaveButton>
            )}
          </BottomButtonsBar>
        </>
      )}
    </PostContent>
  );
};

export default CreateListModel;
