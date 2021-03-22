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

const bucket = process.env.REACT_APP_BUCKET;

const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 0 0 15px;
  }
`;

const PostContent = styled.div`
  width: 100%;
  color: #fff;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
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

let myInput;
const CreateListModel = ({
  setDisplayList,
  setSelectedListForPost,
  setDisplayCreateList
}) => {
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  /*
  @desc: to check input file format and throw error if invalid image is input
  @params: input file
  */
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const idxDot = selectedFile.name.lastIndexOf(".") + 1;
    const extFile = selectedFile.name
      .substr(idxDot, selectedFile.name.length)
      .toLowerCase();
    if (extFile === "jpeg" || extFile === "png" || extFile === "jpg") {
      setImageError("");
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(selectedFile);
    } else {
      setImageError("Only jpg/jpeg and png,files are allowed!");
    }
  };

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
  const addList = async (values) => {
    /* to upload file to s3 bucket on save of profile button */
    let imageUrl = null;
    if (imageFile !== null && profileImage!==null) {
      /*set loader value */
      setLoader(true);
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
            Key: imageFile.name,
            ContentType: imageFile.type,
            folder_name: folder_name,
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
        .then((response) => {
          imageUrl = baseUrl;
        })
        .catch(
          (error) => console.log(error) // Handle the error response object
        );
      const obj = {
        ownerId: user._id,
        title: values.title,
        description: values.description,
        media:
          imageFile !== null
            ? imageUrl !== null
              ? [{ image: imageUrl, thumbnail: "" }]
              : ""
            : "",
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
  const cancelButton = () => {
    setDisplayCreateList(false);
    setDisplayList(true)
  }
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
              {profileImage !== null ? (
                <PostImage
                  loader={loader}
                  image={profileImage}
                  setImageUpload={setProfileImage}
                />
              ) : null}
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
              <BottomButtonsBar>
                <BackButton onClick={() => cancelButton()} disabled={loader}>
                  Cancel
                </BackButton>
                <SaveButton type="submit" disabled={loader}>
                  {loader ? <ValueLoader /> : "Create"}
                </SaveButton>
              </BottomButtonsBar>
            </form>
          )}
        </Formik>
      </PostContent>
  );
};

export default CreateListModel;
