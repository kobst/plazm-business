import React from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

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

const CloseList = styled.div`
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 20px;
  }
`;

const PostEvent = ({ eventDetails, setEventDetails }) => {
  return (
    <>
      {eventDetails !== null ? (
        <AllListingsContent>
          <div>
            <span>
              <EventListing>
                <span className="TitleSpan">Event Date :</span> <span>{eventDetails.eventDate}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
                <span className="TitleSpan">Event Timing :</span> <span>{eventDetails.eventTime}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
               <span className="TitleSpan">Event Repeat :</span> <span>{eventDetails.eventRepeat}</span>
              </EventListing>
            </span>
          </div>

          <CloseList>
            <IoMdCloseCircle onClick={() => setEventDetails(null)} />
          </CloseList>
        </AllListingsContent>
      ) : null}
    </>
  );
};

export default PostEvent;
