import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteUserPost,
  deletePostInMyFeed,
} from "../../../../reducers/myFeedReducer";
import ValueLoader from "../../../../utils/loader";
import ButtonDelete from "../../UI/ButtonDelete";
import ButtonGrey from "../../UI/ButtonGrey";
import { FiAlertTriangle } from "react-icons/fi";

const ModalContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 20px;
  max-width: 536px;
  min-width: 536px;
  background: #282352;
  box-shadow: 0px 32px 70px rgba(0, 0, 0, 0.25);
  color: #fff;
  @media (max-width: 767px) {
    padding: 15px;
    min-width: 300px;
    max-width: 300px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &.DeleteModal {
    flex-direction: column;
    max-width: 282px;
    min-width: 282px;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 30px;
    border-radius: 8px;
    p {
      margin: 0 0 30px 0;
      padding: 0;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 0 0 15px;
  }
  .MR-10 {
    margin-right: 10px;
  }
`;

const AlertIcon = styled.div`
  width: 100%;
  color: #ff4848;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 25px;
  svg {
    font-size: 54px;
    color: #ff4848;
  }
`;

const DeletePostModal = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  const loadingDeletePost = useSelector(
    (state) => state.myFeed.loadingDeletePost
  );

  /** to delete the post created by user */
  const deletePost = async () => {
    const response = await dispatch(deleteUserPost(id));
    const data = await unwrapResult(response);
    if (data.res && data.res.success) {
      dispatch(deletePostInMyFeed(id));
      closeModal();
    }
  };
  return (
    <>
      <ModalContent className="DeleteModal">
        <AlertIcon>
          <FiAlertTriangle />
        </AlertIcon>
        <p>Are You Sure You Want To Delete The Post?</p>
        <BottomButtonsBar>
          <ButtonGrey
            className="MR-10"
            onClick={() => closeModal()}
            disabled={loadingDeletePost}
          >
            Cancel
          </ButtonGrey>
          <ButtonDelete
            onClick={() => deletePost()}
            disabled={loadingDeletePost}
          >
            {loadingDeletePost ? <ValueLoader /> : "Delete"}
          </ButtonDelete>
        </BottomButtonsBar>
      </ModalContent>
    </>
  );
};

export default DeletePostModal;
