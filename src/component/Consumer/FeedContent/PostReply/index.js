import React from "react";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import BottomBarLikesContent from "../BottomBarLikes";

const PostReplyWrap = styled.div`
  display: flex;
  padding: 15px 0 0 12px;
  margin: 15px 0;
  border-top: 0.75px solid rgba(255, 255, 255, 0.3);
`;

const UserThumbImg = styled.div`
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

const PostReplyContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 25px 15px 0px;
  width: 100%;
`;
const PostUserName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 5px 0;
  font-weight: 700;
  color: #ff2e9a;
  cursor: pointer;
`;

const SbHeading = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #00c2ff;
`;

const PostCommentDescription = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: justify;
`;

const PostCommentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 2px;
`;
const PostCommentDate = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  min-width: 60px;
  margin-right: 5px;
`;

const PostCommentDateInfo = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #ff2e9a;
`;

const PostReplyContent = () => {
  return (
    <>
      <PostReplyWrap>
        <UserThumbImg>
          <img src={ProfileImg} alt="" />
        </UserThumbImg>
        <PostReplyContentDiv>
          <PostUserName>Brooklyn Simmons</PostUserName>
          <SbHeading>Marriage Anniversary Lunch</SbHeading>
          <PostCommentDescription>
            Hi Edward Han Janet fraser Davidblaine Brendon Fraser . It’s an
            excellent place.. Great pizzza. Let plan a lunch together...
            Partners offers a full range of speciality coffee drinks, baked
            goods, and heftier meal options for breakfast and lunch. At the
            company’s Long Island City location, a selection of pastries is
            available all day while the kitchen is open from 9 a.m. to 2:45 p.m.
          </PostCommentDescription>
          <PostCommentInfo>
            <PostCommentDate>Date -</PostCommentDate>
            <PostCommentDateInfo>Monday to Tuesday</PostCommentDateInfo>
          </PostCommentInfo>
          <PostCommentInfo>
            <PostCommentDate>Hours -</PostCommentDate>
            <PostCommentDateInfo>04:00 PM - 8:00 PM </PostCommentDateInfo>
          </PostCommentInfo>
          <BottomBarLikesContent />
        </PostReplyContentDiv>
      </PostReplyWrap>
    </>
  );
};

export default PostReplyContent;
