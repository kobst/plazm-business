import React, {useState} from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import {RiArrowDropRightFill} from 'react-icons/ri';
import Comments from '../UserMessage/Comments';
import ProfileImg from '../../../../../images/profile-img.png';
import LikesBar from '../LikesBar';
import {useHistory} from 'react-router-dom';

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
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
  padding-left: 40px;
  &:before {
    content: "";
    position: absolute;
    left: 26px;
    background: #878787;
    width: 10px;
    height: 1px;
    top: 30px;
  }
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
  margin: 7px 0 0px 0;
  font-weight: 700;
  color: #ff2e9a;
  display: flex;
  flex-direction: row;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
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
`;

const ReplyWrap = styled.div``;

const RightArrowSec = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 767px) {
    margin: 5px 0 0 0;
  }
`;

const ArrowRight = styled.div`
  margin: -3px 10px 0;
  @media (max-width: 1024px) {
    margin: -3px 0 0 -7px;
  }
  svg {
    color: #fff;
    font-size: 24px;
  }
`;

const DescriptionBox = styled.div`
  font-weight: bold;
  font-size: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #ff2e9a;
  border-radius: 12px;
  padding: 2px 10px;
  max-width: 190px;
  cursor: pointer;
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    font-weight: bold;
    font-size: 10px;
  }
`;

const DisplayComment = ({postData, businessData, setSelectedListId}) => {
  const [displayComments, setDisplayComments] = useState(false);
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  /** to highlight the user mentions mentioned in post description */
  const findDesc = (value, mentions, mentionsList) => {
    let divContent = value;
    if (mentions.length > 0 && mentionsList.length > 0) {
      const arr = [];
      let data;
      for (let i = 0; i < mentions.length; i++) {
        if (value.includes('@' + mentions[i].name)) {
          arr.push({
            name: '@' + mentions[i].name,
            id: mentions[i]._id,
            type: 'name',
          });
        }
      }
      for (let i = 0; i < mentionsList.length; i++) {
        if (value.includes('@' + mentionsList[i].name)) {
          arr.push({
            name: '@' + mentionsList[i].name,
            id: mentionsList[i]._id,
            type: 'list',
          });
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          if (arr[i].type === 'list') {
            data = reactStringReplace(value, arr[i].name, (match, j) => (
              <span
                key={j}
                className="mentionData"
                onClick={() => setSelectedListId(arr[i].id)}
              >
                {match}
              </span>
            ));
          } else {
            data = reactStringReplace(value, arr[i].name, (match, j) => (
              <span
                key={j}
                className="mentionData"
                onClick={() => history.push(`/u/${arr[i].id}`)}
              >
                {match}
              </span>
            ));
          }
        } else {
          if (arr[i].type === 'list') {
            data = reactStringReplace(data, arr[i].name, (match, j) => (
              <span
                key={j}
                className="mentionData"
                onClick={() => setSelectedListId(arr[i].id)}
              >
                {match}
              </span>
            ));
          } else {
            data = reactStringReplace(data, arr[i].name, (match, j) => (
              <span
                key={j}
                className="mentionData"
                onClick={() => history.push(`/u/${arr[i].id}`)}
              >
                {match}
              </span>
            ));
          }
        }
      }
      return data;
    } else if (mentions.length > 0) {
      for (let i = 0; i < mentions.length; i++) {
        if (value.search(new RegExp('@' + mentions[i].name, 'g') !== -1)) {
          return (
            <div>
              {reactStringReplace(value, '@' + mentions[i].name, (match, j) => (
                <span
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
                >
                  {match}
                </span>
              ))}
            </div>
          );
        } else {
          return <div>{value}</div>;
        }
      }
    } else if (mentionsList.length > 0) {
      mentionsList.map((v) => {
        const re = new RegExp('@' + v.name, 'g');
        divContent = divContent.replace(
            re,
            `<span className='mentionData'> ${'@' + v.name}  </span>`,
        );
        return divContent;
      });
      if (mentionsList.length !== 0) {
        return (
          <>
            <div dangerouslySetInnerHTML={{__html: divContent}}></div>
          </>
        );
      } else {
        return value;
      }
    } else {
      return value;
    }
  };
  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img
                src={
                  postData.itemId.ownerId === null ||
                  postData.itemId.ownerId.length === 0 ?
                    businessData.default_image_url :
                    postData.itemId.ownerId[0].photo !== '' &&
                      postData.itemId.ownerId[0].photo !== null ?
                    postData.itemId.ownerId[0].photo :
                    ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                {postData.userId === null || postData.userId.length === 0 ?
                  businessData.company_name :
                  postData.userId[0].name}{' '}
                {postData.listId !== null && postData.listId.length !== 0 ? (
                  <RightArrowSec>
                    <ArrowRight>
                      <RiArrowDropRightFill />
                    </ArrowRight>
                    <DescriptionBox>
                      <div
                        data-for="custom-class"
                        data-tip={postData.listId[0].name}
                      >
                        <span>{postData.listId[0].name}</span>
                      </div>
                      <ReactTooltip
                        id="custom-class"
                        className="extraClass"
                        effect="solid"
                        backgroundColor="#ff2e9a"
                        textColor="white"
                      />
                    </DescriptionBox>
                  </RightArrowSec>
                ) : null}
              </ProfileName>
              <ChatInput>
                {findDesc(
                    postData.itemId.data,
                    postData.itemId.taggedUsers,
                    postData.itemId.taggedLists,
                )}
              </ChatInput>
              <LikesBar
                type="disabled"
                totalLikes={postData.itemId.likes.length}
                totalComments={
                  postData.totalComments.length > 0 ?
                    postData.totalComments[0].totalCount :
                    0
                }
                date={new Date(postData.itemId.createdAt)}
                setDisplayComments={setDisplayComments}
                displayComments={displayComments}
                postId={postData._id}
                postLikes={postData.itemId.likes}
                displayCommentInput={displayCommentInput}
                setDisplayCommentInput={setDisplayCommentInput}
                setFlag={setFlag}
                flag={flag}
                business={businessData}
              />
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>

        <ReplyWrap>
          <Comments
            i={postData}
            postData={postData}
            displayComments={displayComments}
            setFlag={setFlag}
            flag={flag}
            business={businessData}
          />
        </ReplyWrap>
      </UserMsgWrap>
    </>
  );
};

export default DisplayComment;
