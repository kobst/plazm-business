import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { MdFavoriteBorder, MdChatBubbleOutline } from "react-icons/md";

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

const UsersButton = styled.button`
  font-weight: 600;
  font-size: 13px;
  line-height: normal;
  text-align: center;
  color: #ff2e9a;
  background: transparent;
  width: auto;
  border: 0;
  padding: 0px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
`;

const CircleDot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  margin: 0 5px;
  background: #ff2e9a;
`;
const ChatDate = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  span {
    margin: 0 10px;
  }
`;

const RightDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  display: flex;
  margin: 0 0 0 20px;
  @media (max-width: 767px) {
    margin: 8px 15px 0 0px;
  }
  svg {
    margin: 0 7px 0 0;
  }
`;

const LikesBar = ({ date }) => {
  const [eventDate, setEventDate] = useState();
  /** to convert date into display format */
  useEffect(() => {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = date.getDate();

    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];

    let year = date.getFullYear();

    setEventDate(`${day} ${monthName} ${year}`);
  }, [date]);
  return (
    <>
      <BottomBarLikes>
        <LikesBtnWrap>
          <UsersButton>Reply</UsersButton>
          <CircleDot />
          <UsersButton>Like</UsersButton>

          <ChatDate>
            <span>-</span>{eventDate}
          </ChatDate>
        </LikesBtnWrap>
        <LikesBtnWrap>
          <RightDiv>
            <MdFavoriteBorder /> 2
          </RightDiv>
          <RightDiv>
            <MdChatBubbleOutline /> 3
          </RightDiv>
        </LikesBtnWrap>
      </BottomBarLikes>
    </>
  );
};

export default LikesBar;
