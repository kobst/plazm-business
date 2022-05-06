import React from 'react';
import styled from 'styled-components';

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 2px;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const LabelWrap = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  min-width: 60px;
  margin-right: 5px;
`;
const LabelInput = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #ff2e9a;
`;

function DateBar({ startDay, endDay }) {
  return (
    <BottomBarLikes>
      <LabelWrap>Date -</LabelWrap>
      <LabelInput>
        {startDay} to {endDay}
      </LabelInput>
    </BottomBarLikes>
  );
}

export default DateBar;
