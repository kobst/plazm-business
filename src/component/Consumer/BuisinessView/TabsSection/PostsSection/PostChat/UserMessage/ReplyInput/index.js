import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FaRegSmile} from 'react-icons/fa';
import ProfileImg from '../../../../../../../../images/profile-img.png';
import {useDispatch, useSelector} from 'react-redux';
import {MentionsInput, Mention} from 'react-mentions';
import Picker from 'emoji-picker-react';
import {findSelectedUsers} from '../../../../../../../../reducers/consumerReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  checkMime,
  replaceBucket,
} from '../../../../../../../../utilities/checkResizedImage';

const ChatContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0 12px 12px;
  flex-direction: column;
  &.InnerReply{
    margin: 30px 0 0;
    @media (max-width: 767px) {
      padding-left: 0;
    }
  }
  /* overflow: hidden; */
  /* overflow-x: hidden; */
  @media (max-width: 767px) {
  }
  .replyInput {
    border: 0;
    outline: 0;
    padding:0;
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    background: transparent;
    height: 37px;
    max-width: calc(100% - 30px);
    width: 100%;
    :hover, :focus {
      border: 0;
      outline: 0;
  }
  @media (max-width: 767px) {
      font-size: 11px;
    }
    @media (max-width: 359px) {
      font-size: 10px;
    }
  .replyInput__suggestions {
    background-color: #FE02B9 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    padding: 15px;
    height: auto;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    ul{
      margin: 0 0 5px;
      padding: 0;
      li{
        color: #fff;
        font-size:10px;
        font-weight: 500;
        margin: 0 0 5px;
        padding: 0;
      }
    } 
  }
`;
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ProfileThumb = styled.div`
  width: 34px;
  height: 32px;
  margin: 0 10px 0 0;
  border: 1px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 30px;
    height: 30px;
  }
`;
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 25px 0px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 0px 0px 0px;
  }
  @media (max-width: 767px) {
    padding: 0 0px 0px 0px;
  }
  @media (max-width: 359px) {
    padding: 0 0px 0px 0px;
  }
`;

const InputWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 500;
  color: #9a9a9a;
  background: white;
  height: 37px;
  border-bottom: 0.5px solid #afafaf;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  textarea {
    border: 0;
    box-shadow: none;
    padding: 10px 0;
    height: auto;
    overflow: auto;
    height: 100%;
  }
  input {
    border: 0;
    background: transparent;
    outline: 0;
    width: auto;
    color: #fff;
    padding: 0;
    width: 110px;
    @media (max-width: 767px) {
      width: 60px;
      font-size: 11px;
    }
    @media (max-width: 359px) {
      width: 50px;
    }
  }
  .taggedUserInput {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 7px;
    font-size: 13px;
    width: 200px;
  }
  &.InnerReplySection {
    width: 96%;
  }
`;
const EmojiWrap = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  svg {
    color: #9a9a9a;
    font-size: 15px;
  }
`;

const MentionsImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .mentionsImageImg {
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;
  }
`;
const ReplyInput = ({
  postId,
  type,
  name,
  description,
  setDescription,
  addComment,
  replyDescription,
  setReplyDescription,
  commentId,
  addReply,
}) => {
  const user = useSelector((state) => state.user.user);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [mentionData, setMentionData] = useState([]);
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const selectedPostId = useSelector(
      (state) => state.business.selectedPostIdForComments,
  );

  useEffect(() => {
    if (user.photo) {
      const findMime = checkMime(user.photo);
      const image = replaceBucket(user.photo, findMime, 30, 30);
      setImage(image);
    } else setImage(ProfileImg);
  }, [user]);

  const checkError = () => {
    if (user.photo) setImage(user.photo);
    else setImage(ProfileImg);
  };
  /** on select of emoji */
  const onEmojiClick = (event, emojiObject) => {
    if (type === 'comment') setDescription(description + emojiObject.emoji);
    else if (type === 'reply') {
      setReplyDescription(replyDescription + emojiObject.emoji);
    }
  };

  /** handle change input for mentions input */
  const handleChange = async (event, newValue, newPlainTextValue, mentions) => {
    /** to fetch list of all users */

    if (mentions.length !== 0) {
      /** to find if the mention is of users or lists */
      const findUser = selectedUsers.find((i) => i._id === mentions[0].id);
      if (findUser) {
        /** if mention is of user add it into user's mention array */
        const valueArr = mentionArrayUser;
        const data = [];
        data.push({_id: mentions[0].id, name: mentions[0].display});
        setMentionData(data);
        valueArr.push(mentions[0].id);
        setMentionArrayUser(valueArr);
      }
    }
    if (type === 'comment') setDescription(newPlainTextValue);
    else if (type === 'reply') setReplyDescription(newPlainTextValue);
  };

  /** to add comment on post */
  const addCommentToPost = async (desc) => {
    if (type === 'comment' && desc !== '' && !desc.trim() === false) {
      const obj = {
        itemId: postId,
        userId: user._id,
        body: desc,
        created_on: new Date(),
        taggedUsers: mentionArrayUser,
        userDetails: user,
      };
      addComment(obj);
    } else if (type === 'reply' && desc !== '' && !desc.trim() === false) {
      const obj = {
        postId: postId,
        _id: commentId,
        userId: user._id,
        body: desc,
        taggedUsers: mentionArrayUser,
        sendTaggedUsers: mentionData,
      };
      addReply(obj);
    }
  };

  /** on adding comment keyPress function */
  const commentAddKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCommentToPost(type === 'reply' ? replyDescription : description);
      if (type === 'reply') setReplyDescription('');
      else setDescription('');
    }
  };
  /** custom render suggestion with images */
  const customRenderSuggestion = (entry) => {
    return (
      <MentionsImage>
        <img
          src={
            entry.image !== null ?
              entry.image !== '' && entry.image !== 'sample' ?
                entry.image :
                ProfileImg :
              ProfileImg
          }
          alt=""
          className="mentionsImageImg"
        />
        {entry.display}
      </MentionsImage>
    );
  };

  /** to search users for mentions */
  const fetchUsers = async (query, callback) => {
    if (!query) return;
    const data = await dispatch(findSelectedUsers(query));
    const res = await unwrapResult(data);
    if (res) {
      const x = res.map((myUser) => ({
        id: myUser._id,
        display: `${myUser.name}`,
        image: myUser.photo ? myUser.photo : '',
      }));
      setSelectedUsers(res);
      return callback(x);
    }
  };
  return (
    <>
      <ChatContent className={type === 'reply' ? 'InnerReply' : ''}>
        <ProfileNameHeader>
          <ProfileThumb>
            <img src={image} onError={() => checkError()} alt="" />
          </ProfileThumb>
          <ProfileNameWrap>
            <InputWrap className={type === 'reply' ? 'InnerReplySection' : ''}>
              {type === 'reply' ? (
                <div className="taggedUserInput">{'@' + name}</div>
              ) : null}
              <MentionsInput
                markup="@(__id__)[__display__]"
                value={type === 'reply' ? replyDescription : description}
                onChange={handleChange}
                placeholder={type === 'reply' ? 'Add Reply' : 'Add Comment'}
                className="replyInput"
                onKeyPress={(event) => commentAddKeyPress(event)}
                autoFocus={
                  type === 'reply' ?
                    selectedPostId === postId ?
                      true :
                      false :
                    true
                }
              >
                <Mention
                  type="user"
                  trigger="@"
                  data={fetchUsers}
                  appendSpaceOnAdd={true}
                  renderSuggestion={customRenderSuggestion}
                />
              </MentionsInput>
              <EmojiWrap>
                <FaRegSmile onClick={() => setDisplayEmoji(!displayEmoji)} />
                {displayEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
              </EmojiWrap>
            </InputWrap>
          </ProfileNameWrap>
        </ProfileNameHeader>
      </ChatContent>
    </>
  );
};

export default ReplyInput;
