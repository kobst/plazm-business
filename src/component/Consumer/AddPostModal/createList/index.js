import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiPlus } from 'react-icons/fi';
import AddImageImg from '../../../../images/addImage.svg';
import FormBody from './formBody';
import { validate } from './validate';
import ValueLoader from '../../../../utils/loader';
import ButtonGrey from '../../UI/ButtonGrey';
import SaveButton from '../../UI/SaveButton';
import { createList } from '../../../../reducers/listReducer';
import PostImage from '../PostImage';
import BackButton from '../../UI/BackButton';

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
  @media (max-width: 767px) {
    padding-bottom: 15px;
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
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

const RightButtons = styled.div`
  color: #fff;
  display: flex;
  margin-left: auto;
  button {
    :first-child {
      margin-right: 10px;
    }
  }
`;

const LeftButtons = styled.div`
  color: #fff;
  display: flex;
`;

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  margin: 15px 0 22px;
  ul {
    background-color: #2b2652 !important;
  }
  &.CreateListTabs {
    .react-tabs {
      display: flex;
      width: 100%;
      border: 0;
      color: #fff;
      position: relative;
      flex-direction: column;
      background: transparent;
    }
    .react-tabs__tab {
      height: auto;
      width: 50%;
      list-style: none;
      padding: 18px 0;
      cursor: pointer;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      text-transform: capitalize;
      color: #746f9f;
      background-color: inherit;
      background: #282352;
    }
    .react-tabs__tab-list {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 0 !important;
      padding: 0;
      justify-content: space-between;
    }
    .react-tabs__tab.react-tabs__tab--selected {
      background: #332e5a;
      border: 1px dashed #b1abea;
      color: #fff;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 0;
      margin-bottom: -2px;
    }
    .react-tabs__tab-panel {
      background: #332e5a;
      border: 1px dashed #b1abea;
      border-radius: 5px;
      height: 210px;
    }
    .react-tabs__tab:focus {
      box-shadow: none;
    }
    .react-tabs__tab:focus:after {
      display: none;
    }
  }
`;

const ContentTabPanel = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const PlusIcon = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #b1abea;
  font-size: 48px;
  margin: 0 0 20px;
`;

const ClickText = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #c1c1c1;
  margin: 0;
  padding: 0;
`;

const ClickTextBottom = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #c1c1c1;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 12px;
`;

const CroppedFinalSection = styled.div`
  display: flex;
  width: 100%;
  height: 166px;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 0 40px;
  @media (max-width: 767px) {
    margin: 0 0 20px;
  }
`;

const BlackBG = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 27.08%, #000000 100%);
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 1;
`;

const CroppedFinalImgSec = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 166px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 100%;
    height: 100%;
    max-height: 166px;
  }
`;

const FinalImgdesp = styled.div`
  width: 100%;
  margin: 0 8px 0 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  display: flex;
  padding: 0 16px;
  bottom: 15px;
`;

const FinalImgdespThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 8px 0 0;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #ffffff;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ListNameWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 4px 0 0 0;
  font-weight: 700;
  color: #fff;
  position: relative;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 50px);
  font-family: 'Roboto', sans-serif;
`;

const ListName = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const ListInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 11px;
  }
`;

let myInput;
function CreateListModel({
  setDisplayList,
  setSelectedListForPost,
  setDisplayCreateList,
}) {
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  /*
  @desc: to check input file format and throw error if invalid image is input
  @params: input file
  */
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const idxDot = selectedFile.name.lastIndexOf('.') + 1;
    const extFile = selectedFile.name
      .substr(idxDot, selectedFile.name.length)
      .toLowerCase();
    if (extFile === 'jpeg' || extFile === 'png' || extFile === 'jpg') {
      setImageError('');
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(selectedFile);
    } else {
      setImageError('Only jpg/jpeg and png,files are allowed!');
    }
  };

  /*
  @desc: to get specific folder name to be created in aws
  @params: consumer name, consumer _id
  */
  const folderName = (name, id) => {
    /* to remove all special characters except space */
    const removeSpecialCharacter = name.replace(/[^a-zA-Z ]/g, '');
    /* to replace all spaces to underscore */
    const replacedName = removeSpecialCharacter.split(' ').join('_');
    /* return folder name */
    return `${replacedName}_${id}`;
  };
  /*
   * @desc: to change file_name
   */
  const fileName = (name) => `${Date.now()}-${name}`;
  /*
  @desc: add list
  @params: form values
  */
  const addList = async (values) => {
    /* to upload file to s3 bucket on save of profile button */
    let imageUrl = null;
    if (imageFile !== null && profileImage !== null) {
      /* set loader value */
      setLoader(true);
      const folder_name = folderName(user.name, user._id);
      const file_name = fileName(imageFile.name);
      const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
      const value = await fetch(
        `${process.env.REACT_APP_API_URL}/api/upload_photo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Key: file_name,
            ContentType: imageFile.type,
            folder_name,
          }),
        }
      );
      const body = await value.text();
      const Val = JSON.parse(body);

      await fetch(Val, {
        method: 'PUT',
        headers: {
          'Content-Type': imageFile.type,
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
              ? [{ image: imageUrl, thumbnail: '' }]
              : ''
            : '',
      };
      /* create a list api */
      const res = await dispatch(createList(obj));
      const data = await unwrapResult(res);
      if (data && data.data.createList.success === true) {
        setResponse('List added successfully.');
        setError('');
        setLoader(false);
        setDisplayCreateList(false);
        setDisplayList(false);
        setSelectedListForPost(data.data.createList.list._id);
      } else if (data && data.data.createList.success === false) {
        setLoader(false);
        setResponse('');
        setError('Could not create list');
      }
    } else {
      setImageError('Image Is required');
    }
  };

  /** cancel button functionality */
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
        enableReinitialize
        initialValues={{
          title: '',
          description: '',
        }}
        /* validation schema */
        validationSchema={Yup.object(validate)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          /* update profile function call */
          addList(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} method="POST">
            <FormBody loader={loader} setResponse={setResponse} />
            {profileImage !== null ? (
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
                    style={{ display: 'none' }}
                    disabled={loader}
                  />
                  <img
                    src={AddImageImg}
                    alt=""
                    onClick={(e) => myInput.click()}
                  />
                </AddImageDiv>
              </AddYourPostBar>
            )}
            {/* for displaying image error if any */}
            {imageError !== '' ? <ErrorDiv>{imageError}</ErrorDiv> : null}

            {/* for displaying the response of add list */}
            {error !== '' ? (
              <ErrorDiv>{error}</ErrorDiv>
            ) : response !== '' ? (
              <ErrorDiv>{response}</ErrorDiv>
            ) : (
              <></>
            )}
            {/* bottom buttons bar */}

            <TabsSectionContent className="CreateListTabs">
              <Tabs>
                <TabList>
                  <Tab>Cover Photo</Tab>
                  <Tab>Profile Photo</Tab>
                </TabList>
                <TabPanel>
                  <ContentTabPanel>
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
                  </ContentTabPanel>
                </TabPanel>
                <TabPanel>
                  <ContentTabPanel>
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
                  </ContentTabPanel>
                </TabPanel>
              </Tabs>
            </TabsSectionContent>

            <CroppedFinalSection>
              <BlackBG />
              <CroppedFinalImgSec>
                <img src="https://picsum.photos/seed/picsum/200/300" />
              </CroppedFinalImgSec>
              <FinalImgdesp>
                <FinalImgdespThumb>
                  <img src="https://picsum.photos/200/300" alt="" />
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
              <LeftButtons>
                <BackButton>Back</BackButton>
              </LeftButtons>
              <RightButtons>
                <ButtonGrey onClick={(e) => cancelButton(e)} disabled={loader}>
                  Cancel
                </ButtonGrey>
                {loader && (
                  <div style={{ marginTop: '3px' }}>
                    <ValueLoader />
                  </div>
                )}
                {!loader && (
                  <SaveButton type="submit" disabled={loader}>
                    Create Preview
                  </SaveButton>
                )}
              </RightButtons>
            </BottomButtonsBar>
          </form>
        )}
      </Formik>
    </PostContent>
  );
}

export default CreateListModel;
