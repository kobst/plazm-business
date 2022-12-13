import React from 'react';
import styled from 'styled-components';
import ValueLoader from '../../../../utils/loader';
import BackButton from '../../UI/BackButton';
import SaveButton from '../../UI/SaveButton';

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
  loader,
  description,
  savePost,
  setDescription,
  mentionArrayList,
  setMentionArrayList,
  mentionArrayUser,
  setMentionArrayUser,
  setDisplayCreateList,
  setDisplayCalendar,
}) => {
  /** left button functionality */
  const leftBtn = () => {
    if (type === 'post' || type === 'editPost') setDisplayList(true);
    else if (type === 'list') {
      setDisplayList(false);
      setDisplayCreateList(true);
    } else if (type === 'schedule') {
      setDisplayCalendar(false);
    } else {
      closeModal();
    }
  };

  /** right button functionality */
  const rightBtn = () => {
    if (type === 'list') {
      setDisplayList(false);
      setSelectedListForPost(selectedList);
      setMentionArrayList(mentionArrayList);
      setMentionArrayUser(mentionArrayUser);
      setDescription(description);
    } else if (type === 'post') {
      savePost();
    } else if (type === 'editPost') {
      savePost();
    } else {
      closeModal();
    }
  };

  return (
    <>
      <BottomButtonsBar>
        <BackButton onClick={() => leftBtn()} disabled={loader}>
          {type === 'post' || type === 'editPost' ?
            'Add to List' :
            type === 'list' ?
            'Create New List' :
            type === 'schedule' ?
            'Back' :
            'Cancel'}
        </BackButton>
        <SaveButton
          onClick={() => rightBtn()}
          disabled={type === 'post' && loader}
        >
          {type === 'post' ? (
            loader ? (
              <ValueLoader />
            ) : (
              'Post'
            )
          ) : type === 'list' ? (
            'Select'
          ) : type === 'schedule' ? (
            'Confirm'
          ) : type === 'editPost' ? (
            loader ? (
              <ValueLoader />
            ) : (
              'Edit'
            )
          ) : (
            'Create'
          )}
        </SaveButton>
      </BottomButtonsBar>
    </>
  );
};

export default BottomButtons;
