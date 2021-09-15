import React, { useState } from "react";
import styled from "styled-components";
import AddImageImg from "../../../../images/addImage.svg";
import CalenderImg from "../../../../images/calender_img.png";
import { Formik } from "formik";
import * as Yup from "yup";
import FormBody from "./formBody";
import { validate } from "./validate";
import ValueLoader from "../../../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../UI/BackButton";
import SaveButton from "../../UI/SaveButton";
import { AddEventToList } from "../../../../reducers/listReducer";
import PostImage from "../PostImage";
import { unwrapResult } from "@reduxjs/toolkit";
import ButtonGrey from "../../UI/ButtonGrey";
import SelectedListing from "../SelectedListing";
import PostEvent from "../PostEvent";
import { addEvent } from "../../../../reducers/eventReducer";
import error from "../../../../constants";

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
  button {
    @media (max-width: 767px) {
      width: 100%;
      margin: 5px 0;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
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
  button {
    outline: 0;
    border: none;
    background: transparent;
  }
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

const AddYourTimeLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin: 0 0 0 10px;
  max-width: calc(100% - 35px);
  &::after {
    content: "*";
  }
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
  font-size: 11px;
  margin: 0;
  margin-bottom: 10px;
`;

const BottomBtnWrap = styled.div`
  display: flex;
  .MR-15 {
    margin-right: 10px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

let myInput;
const CreateEventModal = ({
  setDisplayList,
  selectedListForPost,
  setSelectedListForPost,
  closeModal,
  setDisplayCalendar,
  eventDetails,
  setEventDetails,
  eventTitle,
  setEventTitle,
  eventDescription,
  setEventDescription,
  imageUrl,
  setImageUrl,
  setImageCopy,
  setImageUpload,
  imageUpload,
}) => {
  const [loader, setLoader] = useState(false);
  const [imageError, setImageError] = useState("");
  const [formError, setError] = useState("");
  const [listError, setListError] = useState("");
  const [response, setResponse] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const user = useSelector((state) => state.user.user);
  const business = useSelector((state) => state.business.business);
  const dispatch = useDispatch();
  const ws = useSelector((state) => state.user.ws);

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
   * @desc: to delete an image
   * @params: image id
   */
  const deleteImage = (v) => {
    setImageUpload(null);
  };

  const clearImages = () => {
    setImageUpload(null);
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
  const fileName = (name, date) => {
    return `${date}-${name}`;
  };

  /*
  @desc: add a event
  @params: form values
  */
  const saveEvent = async (values) => {
    /** if event details are not added */
    if (eventDetails !== null) {
      if (!selectedListForPost) {
        setListError(error.EVENT_LIST_ERROR);
      } else {
        setListError("");
        /*set loader value */
        setLoader(true);
        /* to upload file to s3 bucket */
        let imageUrl = null;
        if (imageFile !== null) {
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

        const obj = {
          user: user._id,
          business: business[0]._id,
          title: values.title,
          description: values.description,
          eventSchedule: {
            start_time: eventDetails.start_time,
            end_time: eventDetails.end_time,
          },
          recurring: eventDetails.eventRepeat,
          listId: selectedListForPost ? selectedListForPost : null,
          media:
            imageFile !== null ? (imageUrl !== null ? imageUrl : null) : null,
        };

        /** add event */
        const resultAction = await dispatch(addEvent({ obj: obj, user: user }));
        const response = await unwrapResult(resultAction);
        if (response.data.success === true) {
          /** if any list is selected than add event to list */
          if (selectedListForPost) {
            const addToList = await dispatch(
              AddEventToList({
                eventId: response.data.event._id,
                listId: selectedListForPost,
              })
            );
            const res = await unwrapResult(addToList);
            if (res.data.addEventToList.success === true) {
              closeModal();
              setLoader(false);
              setEventDescription("");
              setEventTitle("");
              setImageUrl(null);
              setImageCopy([]);
              setImageUpload(null);
            }
          } else {
            closeModal();
            setLoader(false);
            setEventDescription("");
            setEventTitle("");
            setImageUrl(null);
            setImageCopy([]);
            setImageUpload(null);
          }
          ws.send(
            JSON.stringify({
              action: "event",
              event: {
                ...response.event,
                type: "addEvent",
                user: user,
                totalComments: 0,
                likes: [],
                createdAt: new Date(Date.now()),
              },
            })
          );
        }
      }
    } else {
      if (!selectedListForPost) {
        setListError(error.EVENT_LIST_ERROR);
      } else {
        setListError("");
      }
      setError(error.EVENT_DETAILS_REQUIRED);
    }
  };

  /**cancel button functionality */
  const cancelButton = (e) => {
    e.preventDefault();
    closeModal();
  };

  /**add to a list button functionality */
  const listDisplay = (e) => {
    e.preventDefault();
    setDisplayList(true);
  };

  /**to display calendar component */
  const displayCalendar = (e) => {
    e.preventDefault();
    setDisplayCalendar(true);
  };
  return (
    <PostContent>
      <TopBar>
        <Heading>Create Event</Heading>
      </TopBar>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: eventTitle,
          description: eventDescription,
        }}
        /*validation schema */
        validationSchema={Yup.object(validate)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          /*update profile function call*/
          saveEvent(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} method="POST">
            <FormBody
              loader={loader}
              formik={formik}
              setResponse={setResponse}
              setEventTitle={setEventTitle}
              setEventDescription={setEventDescription}
            />
            {eventDetails !== null ? (
              <AddYourPostBar>
                <PostEvent
                  eventDetails={eventDetails}
                  setEventDetails={setEventDetails}
                  loader={loader}
                />
              </AddYourPostBar>
            ) : (
              <AddYourPostBar>
                <AddYourTimeLabel>Add Time</AddYourTimeLabel>
                <button onClick={(e) => displayCalendar(e)} disabled={loader}>
                  <AddImageDiv>
                    <img src={CalenderImg} alt="" />
                  </AddImageDiv>
                </button>
              </AddYourPostBar>
            )}
            {formError !== "" ? <ErrorDiv>{formError}</ErrorDiv> : null}
            {!imageUpload && (
              <AddYourPostBar>
                <AddYourPostLabel>Add a Picture</AddYourPostLabel>
                <AddImageDiv>
                  <input
                    id="myInput"
                    onChange={(e) => uploadImage(e)}
                    multiple
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={(ref) => (myInput = ref)}
                    style={{ display: "none" }}
                    disabled={loader}
                  />
                  <img
                    src={AddImageImg}
                    alt=""
                    onClick={() => myInput.click()}
                  />
                </AddImageDiv>
              </AddYourPostBar>
            )}
            {imageUpload ? (
              <AddYourPostBar>
                <PostImage
                  loader={loader}
                  type="eventImages"
                  imageUrl={imageUpload}
                  deleteImage={deleteImage}
                  clearImages={clearImages}
                />
              </AddYourPostBar>
            ) : null}
            <SelectedListing
              type="event"
              selectedListForPost={selectedListForPost}
              setSelectedListForPost={setSelectedListForPost}
            />
            {/* to display list error */}
            {listError !== "" ? <ErrorDiv>{listError}</ErrorDiv> : null}
            {/* for displaying image error if any */}
            {imageError !== "" ? <ErrorDiv>{imageError}</ErrorDiv> : null}

            {/* for displaying the response of add list */}
            {response !== "" ? <ErrorDiv>{response}</ErrorDiv> : <></>}
            {/* bottom buttons bar */}
            <BottomButtonsBar>
              <BackButton disabled={loader} onClick={(e) => listDisplay(e)}>
                Add to List
              </BackButton>
              <BottomBtnWrap>
                <ButtonGrey
                  className="MR-15"
                  onClick={(e) => cancelButton(e)}
                  disabled={loader}
                >
                  Cancel
                </ButtonGrey>
                <SaveButton type="submit" disabled={loader}>
                  {loader ? <ValueLoader /> : "Create"}
                </SaveButton>
              </BottomBtnWrap>
            </BottomButtonsBar>
          </form>
        )}
      </Formik>
    </PostContent>
  );
};

export default CreateEventModal;
