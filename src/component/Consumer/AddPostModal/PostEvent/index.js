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
                Event Date : <span>{eventDetails.eventDate}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
                Event Timing : <span>{eventDetails.eventTime}</span>
              </EventListing>
            </span>
            <span>
              <EventListing>
                Event Repeat : <span>{eventDetails.eventRepeat}</span>
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
