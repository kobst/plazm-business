import React, {useState} from 'react';
import styled from 'styled-components';
import {MentionsInput, Mention} from 'react-mentions';
import {useSelector} from 'react-redux';
import './style.css';
import defaultMentionStyle from './style';
import ModalComponent from '../../../../UI/Modal';
import AddPostModal from '../../../../AddPostModal';

const AddPostSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px;
  background: #292454;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  textarea {
    box-shadow: none;
    border: 0;
    padding: 10px;
    color: #000;
    font-weight: 600;
  }
  .postInput__suggestions {
    background-color: #fe02b9 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    padding: 15px;
    height: auto;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    ul {
      margin: 0 0 5px;
      padding: 0;
      li {
        color: #fff;
        font-size: 10px;
        font-weight: 500;
        margin: 0 0 5px;
        padding: 0;
      }
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 10px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const TextAreaWrap = styled.div`
  width: 100%;
  /* max-width: calc(100% - 147px); */
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 5px;
  }
`;


const AddPostSection = ({businessId}) => {
  const [addPostModal, setAddPostModal] = useState(false);
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const allData = [...users, ...lists];
  const data = allData.sort(function(a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `@${myUser.name}`,
  }));
  return (
    <>
      {addPostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addPostModal}
          closeModal={() => setAddPostModal(false)}
        >
          <AddPostModal businessId={businessId} closeModal={() => setAddPostModal(false)}/>
        </ModalComponent>
      )}
      <AddPostSectionContent>
        <TopSection>
          <TextAreaWrap onClick={() => setAddPostModal(true)}>
            <MentionsInput
              markup="@(__id__)[__display__]"
              className="postInput"
              placeholder="What’s Happening ?"
            >
              <Mention
                type="user"
                trigger="@"
                data={userMentionData}
                className="mentions__mention"
                style={defaultMentionStyle}
              />
            </MentionsInput>
          </TextAreaWrap>
        </TopSection>
      </AddPostSectionContent>
    </>
  );
};

export default AddPostSection;
