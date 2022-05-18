import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUserPost, deletePostInMyFeed } from "../../../../reducers/myFeedReducer";
import ValueLoader from "../../../../utils/loader";
import DeleteButton from "../../UI/DeleteButton";
import { FiAlertTriangle } from "react-icons/fi";
import ButtonGrey from "../../UI/ButtonGrey";

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
    padding: 30px;
    text-align: center;
    border-radius: 5px;
    @media (max-width: 767px) {
      padding: 15px;
    }
    p {
      margin: 0 0 24px 0;
      padding: 0;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
    }
  }
`;

const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
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
    :first-child {
      margin-right: 10px;
    }
  }
`;

export const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 54px;
  color: #ff4848;
  margin: 0 0 20px;
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
          <ButtonGrey onClick={() => closeModal()} disabled={loadingDeletePost}>
            Cancel
          </ButtonGrey>
          <DeleteButton
            onClick={() => deletePost()}
            disabled={loadingDeletePost}
          >
            {loadingDeletePost ? <ValueLoader /> : "Delete"}
          </DeleteButton>
        </BottomButtonsBar>
      </ModalContent>
    </>
  );
};

export default DeletePostModal;
