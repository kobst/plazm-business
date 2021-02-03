import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import SaveButton from "../UI/SaveButton";
import BackButton from "../UI/BackButton";
import { FaSort } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Formik } from "formik";
import * as Yup from "yup";
import FormBody from "./formBody";
import { validate } from "./validate";
import ValueLoader from "../../../utils/loader";
import { updateProfileApi } from "../../../Api";

const bucket = process.env.REACT_APP_BUCKET;

const ChangePasswordContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const MainHeading = styled.h1`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  margin: 48px 0 0;
  padding: 0 0 13px 23px;
  border-bottom: 0.5px dashed #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    font-size: 16px;
    padding: 0 0 13px 20px;
  }
  svg {
    font-size: 12px;
    margin: 0 23px 0 0;
  }
`;
const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const FormContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const BottomBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
`;

const UploadImageContainer = styled.div`
  width: 100%;
  padding: 0 40px;
  margin: 40px 0 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  color: #fff;
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 20px;
    margin: 20px 0 0px;
  }
`;

const UploadImage = styled.div`
  width: 125px;
  height: 125px;
  padding: 0;
  margin: 0 15px 0 0;
  display: flex;
  align-items: center;
  background: #fafafa;
  border: 2px solid #f5f5f5;
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: #c5c5c5;
    font-size: 32px;
  }
  img {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
    margin: 0 0 15px 0;
  }
`;
const UploadImageText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  max-width: calc(100% - 145px);
  width: 100%;
  @media (max-width: 767px) {
    max-width: 100%;
    line-height: normal;
  }
`;
const ErrorDiv = styled.div`
  color: #ff0000;
`;
const ProfileImage = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;
/*
@desc: profile settings
@params: setDisplayChangePassword (to display change password or profile settings)
*/
let myInput;
const ProfileSettings = ({
  setDisplayChangePassword,
  setDisplayTab,
  profile,
  setFlag,
}) => {
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState(null);

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
  @params: curator name, curator _id
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
  @desc: update profile
  @params: form values
  */
  const updateProfile = async (values) => {
    /*set loader value */
    setLoader(true);
    const folder_name = folderName(values.name, profile._id);
    /* to upload file to s3 bucket on save of profile button */
    let imageUrl = null;
    if(imageFile!==null){
    const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${imageFile.name}`;
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
    }
    const obj = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      userSub: profile.userSub,
      lockProfile: values.lockMyProfile === true ? 1 : 0,
      photo: imageFile!==null?imageUrl!==null?imageUrl:profile.photo:profile.photo,
    };
    /* update profile api */
    const res = await updateProfileApi(obj);
    if (res.data.updateProfile.success === true) {
      setFlag(true);
      setLoader(false);
    }

  };
  return (
    <>
      <ChangePasswordContent>
        <CloseDiv>
          <IoMdClose onClick={() => setDisplayTab(false)} />
        </CloseDiv>
        <MainHeading>
          Profile Settings <FaSort />
        </MainHeading>
        <UploadImageContainer>
          <UploadImage>
            {profile.photo!=="" || profileImage !== null ? (
              <ProfileImage src={profile.photo||profileImage} />
            ) : (
              <>
                <input
                  id="myInput"
                  onChange={(e) => uploadImage(e)}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={(ref) => (myInput = ref)}
                  style={{ display: "none" }}
                />
                <p onClick={(e) => myInput.click()}>
                  <HiPlus />
                </p>
              </>
            )}
          </UploadImage>
          <UploadImageText>
            Any message regarding profile picture uploading dimensions and file
            sizes goes here
            <ErrorDiv>{imageError}</ErrorDiv>
          </UploadImageText>
        </UploadImageContainer>

        <FormContainer>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: profile.name ? profile.name : "",
              email: profile.email ? profile.email : "",
              phoneNumber: profile.phoneNumber ? profile.phoneNumber : "",
              lockMyProfile: profile.lockProfile
                ? profile.lockProfile === 1
                  ? true
                  : false
                : false,
            }}
            /*validation schema */
            validationSchema={Yup.object(validate)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              /*update profile function call*/
              updateProfile(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} method="POST">
                <FormBody loader={loader} />
                <BottomBtns>
                  <BackButton onClick={() => setDisplayChangePassword(true)}>
                    Change Password
                  </BackButton>
                  <SaveButton type="submit" disabled={loader}>
                    {loader ? <ValueLoader /> : "Save"}
                  </SaveButton>
                </BottomBtns>
              </form>
            )}
          </Formik>
        </FormContainer>
      </ChangePasswordContent>
    </>
  );
};

export default ProfileSettings;
