import React, { useState } from "react";
import styled from "styled-components";
import CreateListModel from "../../CreateListModel";
import BackButton from "../../UI/BackButton";
import ModalComponent from "../../UI/Modal";
import SaveButton from "../../UI/SaveButton";

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

const BottomButtons = ({
  setDisplayList,
  type,
  setSelectedListForPost,
  selectedList,
  closeModal,
}) => {
  const [listModel, setListModel] = useState(false);
  /** left button functionality */
  const leftBtn = () => {
    if (type === "post") setDisplayList(true);
    else if (type === "list") {
      setListModel(true);
    } else {
      closeModal();
    }
  };

  /** right button functionality */
  const rightBtn = () => {
    if (type === "list") {
      setDisplayList(false);
      setSelectedListForPost(selectedList);
    } else if (type === "post") {
    } else {
      closeModal();
    }
  };
  return (
    <>
      {listModel && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={listModel}
          closeModal={() => setListModel(false)}
        >
          <CreateListModel closeModal={() => setListModel(false)} />
        </ModalComponent>
      )}
      <BottomButtonsBar>
        <BackButton onClick={() => leftBtn()}>
          {type === "post"
            ? "Add to List"
            : type === "list"
            ? "Create New List"
            : "Cancel"}
        </BackButton>
        <SaveButton onClick={() => rightBtn()}>
          {type === "post" ? "Post" : type === "list" ? "Select" : "Create"}
        </SaveButton>
      </BottomButtonsBar>
    </>
  );
};

export default BottomButtons;
