import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUserPost, deletePostInMyFeed } from "../../../../reducers/myFeedReducer";
import ValueLoader from "../../../../utils/loader";
import BackButton from "../../UI/BackButton";
import SaveButton from "../../UI/SaveButton";

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
    max-width: 400px;
    min-width: 376px;
    text-align: center;
     p{
      margin: 0 0 15px 0;
     }
  }
`;

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
        <p>Are You Sure You Want To Delete The Post?</p>
        <BottomButtonsBar>
          <BackButton onClick={() => closeModal()} disabled={loadingDeletePost}>
            Cancel
          </BackButton>
          <SaveButton onClick={() => deletePost()} disabled={loadingDeletePost}>
            {loadingDeletePost ? <ValueLoader /> : "Delete"}
          </SaveButton>
        </BottomButtonsBar>
      </ModalContent>
    </>
  );
};

export default DeletePostModal;
