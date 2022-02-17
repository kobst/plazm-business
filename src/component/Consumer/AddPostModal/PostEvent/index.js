import React from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";
import Constants from "../../../../constants/index";

const AllListingsContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  p {
    font-size: 12px;
    font-weight: 600;
  }
`;

const EventListing = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #ff2e9a;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  span {
    color: #ffffff;
  }
  .TitleSpan {
    min-width: 100px;
    display: inline-flex;
    color: #ff2e9a;
    text-align: right;
    justify-content: flex-end;
    margin: 0 5px 0 0;
  }
`;

const CloseList = styled.button`
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 20px;
  }
  :hover,
  :focus {
    outline: 0;
  }
`;

const PostEvent = ({ eventDetails, setEventDetails, loader }) => {
  return (
    <>
      {eventDetails !== null ? (
        <AllListingsContent>
          <div>
            <span>
              <EventListing>
                <span className="TitleSpan">Event Date :</span>{" "}
                <span>{eventDetails.eventDate}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
                <span className="TitleSpan">Event Timing :</span>{" "}
                <span>{eventDetails.eventTime}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
                <span className="TitleSpan">Event Repeat :</span>{" "}
                {eventDetails.eventRepeat == 8 ? (
                  <span>Once</span>
                ) : (
                  eventDetails.eventRepeat.map((val) => (
                    <span>{Constants.REPETITION_DAY[val] + " "}</span>
                  ))
                )}
              </EventListing>
            </span>
          </div>

          <CloseList onClick={() => setEventDetails(null)} disabled={loader}>
            <IoMdCloseCircle />
          </CloseList>
        </AllListingsContent>
      ) : null}
    </>
  );
};

export default PostEvent;
