import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import ProfileImg from '../../../../../../images/profile-img.png';
import ReplyInput from './ReplyInput';
import LikesBar from '../LikeBar';
import ValueLoader from '../../../../../../utils/loader';
import ScrollToBottom1 from './ScrollToBottom1';
import {
  checkMime,
  replaceBucket,
} from '../../../../../../utilities/checkResizedImage';
import ReplyImage from '../../UserMessage/replyImage';

const reactStringReplace = require('react-string-replace');

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 10px 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;

const ReplyWrap = styled.div``;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0 12px;
  margin: 15px 0;
`;

const ProfileThumb = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  border: 3px solid #ffffff;
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
  border-bottom: 0.25px solid #878787;
  padding: 0 25px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 5px 0;
  font-weight: 700;
  color: #ff2e9a;
  cursor: pointer;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
`;

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  span {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
  p {
    cursor: default;
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
`;
function Comments({ i, eventData, displayComments, setFlag, flag, business }) {
  const [displayReply, setDisplayReply] = useState(false);
  const [displayReplyInput, setDisplayReplyInput] = useState(false);
  const [replyDescription, setReplyDescription] = useState('');
  const [image, setImage] = useState(null);
  const ws = useSelector((state) => state.user.ws);
  const loadingReplies = useSelector(
    (state) => state.myFeed.loadingEventReplies
  );

  /** to check resized image */
  useEffect(() => {
    if (i.userId.photo) {
      const findMime = checkMime(i.userId.photo);
      const image = replaceBucket(i.userId.photo, findMime, 30, 30);
      setImage(image);
    } else {
      setImage(ProfileImg);
    }
  }, [i]);

  const history = useHistory();

  /** to add reply function */
  const addReply = async (obj) => {
    ws.send(
      JSON.stringify({
        action: 'message',
        commentId: obj._id, // commentId
        userId: obj.userId, // userId
        comment: `${obj.replyUser} ${obj.body}`,
        postId: obj.postId,
        businessId: business._id,
        taggedUsers: obj.taggedUsers,
        type: 'Event',
      })
    );
    setReplyDescription('');
  };

  /** to highlight the user mentions mentioned in post description */
  const findDesc = (value, mentions) => {
    if (mentions.length > 0) {
      for (let i = 0; i < mentions.length; i++) {
        if (value.search(new RegExp(mentions[i].name, 'g') !== -1)) {
          return (
            <div>
              {reactStringReplace(value, `@${mentions[i].name}`, (match, j) => (
                <span
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
                >
                  {match}
                </span>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      }
    } else {
      return value;
    }
  };

  /** to check image error */
  const checkError = () => {
    if (i.userId.photo) {
      setImage(i.userId.photo);
    } else {
      setImage(ProfileImg);
    }
  };
  return (
    <UserMessageContent className="UserReplyContent">
      <ProfileNameHeader>
        <ProfileThumb>
          <img src={image} onError={() => checkError()} alt="" />
        </ProfileThumb>
        <ProfileNameWrap>
          <ProfileName onClick={() => history.push(`/u/${i.userId._id}`)}>
            {i.userId.name}{' '}
          </ProfileName>
          <ChatInput>
            {' '}
            <p style={{ cursor: 'default' }}>
              {findDesc(i.body, i.taggedUsers)}
            </p>
          </ChatInput>
          <LikesBar
            type="reply"
            business={business}
            commentId={i._id}
            date={new Date(i.createdAt)}
            totalLikes={i.likes.length}
            totalComments={i.totalReplies}
            setDisplayReply={setDisplayReply}
            displayReply={displayReply}
            commentLikes={i.likes}
            setDisplayReplyInput={setDisplayReplyInput}
            displayReplyInput={displayReplyInput}
            eventId={eventData._id}
            flag={flag}
            setFlag={setFlag}
          />
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={300}
            thumbMinSize={30}
            className="InnerScroll"
          >
            <ReplyWrap>
              {(displayReply || displayReplyInput) &&
              i.replies.length > 0 &&
              !loadingReplies ? (
                <div>
                  {i.replies.map((j, key) => (
                    <div key={key}>
                      <UserMessageContent className="UserReplyContent">
                        <ProfileNameHeader>
                          <ProfileThumb>
                            <ReplyImage j={j} />
                          </ProfileThumb>
                          <ProfileNameWrap>
                            <ProfileName>
                              <span style={{ cursor: 'default' }}>by</span>
                              <span
                                onClick={() =>
                                  window.open(`/u/${j.userId._id}`, '_self')
                                }
                                style={{ color: '#ff2e9a' }}
                              >
                                {j.userId.name}
                              </span>{' '}
                            </ProfileName>
                            <ChatInput>
                              {' '}
                              {findDesc(j.body, j.taggedUsers)}
                            </ChatInput>
                            <LikesBar
                              date={new Date(j.created_on)}
                              type="commentReply"
                            />
                          </ProfileNameWrap>
                        </ProfileNameHeader>
                      </UserMessageContent>
                    </div>
                  ))}
                  <ScrollToBottom1 />
                </div>
              ) : (displayReply || displayReplyInput) && loadingReplies ? (
                <LoaderWrap>
                  <ValueLoader />
                </LoaderWrap>
              ) : null}
            </ReplyWrap>
          </Scrollbars>
          {displayReply || displayReplyInput ? (
            <ReplyInput
              type="reply"
              eventId={eventData._id}
              displayComments={displayComments}
              replyDescription={replyDescription}
              setReplyDescription={setReplyDescription}
              commentId={i._id}
              addReply={addReply}
              name={i.userId.name}
            />
          ) : null}
        </ProfileNameWrap>
      </ProfileNameHeader>
    </UserMessageContent>
  );
}

export default Comments;
