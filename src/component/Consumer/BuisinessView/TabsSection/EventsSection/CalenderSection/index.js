import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import SaveButton from "../../../../UI/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsForTheDay,
  nextWeekDate,
  previousWeekDate,
  fetchEventsForTheWeek,
} from "../../../../../../reducers/eventReducer";
import ValueLoader from '../../../../../../utils/loader';

const CalenderSectionWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px;
  flex-direction: column;
  background: #221e45;
  @media (max-width: 767px) {
  }
`;
const TopArrows = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
  button {
    :hover, :focus {
      outline:0;
      border: 0;
    }
  }
  @media (max-width: 767px) {
  }
`;
const LeftArrow = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: #fff;
  }
  @media (max-width: 767px) {
  }
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  :hover, :focus {
    outline:0;
    border: 0;
  }
`;
const RightArrow = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: #fff;
  }
  @media (max-width: 767px) {
  }
  &.disabled {
    opacity: 0.4;
  }
  :hover, :focus {
    outline:0;
    border: 0;
  }
`;
const DaysWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  @media (max-width: 767px) {
  }
`;

const DaysDiv = styled.div`
  width: 55px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #2b2759;
  border-radius: 13px;
  font-size: 10px;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 10px;
  position: relative;
  @media (max-width: 767px) {
  }
  &.current {
    background: #ff2e9a;
    box-shadow: 0px 0px 4px #FF2E9A;
    backdrop-filter: blur(250px);
    :after{
      content: "";
      width: 35px;
      height: 2px;
      background: #FF2E9A;
      position: absolute;
      bottom: -6px;
    }
  }
  &.disabled {
    opacity: 0.4;
  }
  
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  button {
    padding: 0;
    line-height: 14px;
    font-weight: 600;
    min-width: 110px;
  }
  @media (max-width: 767px) {
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
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: 0;
`;

const CurrentDate = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: 500;
`;

const ArrowsWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TodayBtn = styled.button`
  background: #FF006B;
  border-radius: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
  border:0;
  padding: 4px 9px;
  cursor: pointer;
`;

const DaysIndicator = styled.div`
  width: 7px;
  height: 7px;
  background: #FF2E9A;
  box-shadow: 0px 0px 4px #FF2E9A;
  border-radius: 50%;
  position: absolute;
  right:0;
  top: 0;
`;

const CalenderSection = ({ businessId }) => {
  const dispatch = useDispatch();
  const eventDate = useSelector((state) => state.event.date);
  const loader = useSelector((state) => state.event.loading);
  const loadingForWeek = useSelector(state => state.event.loadingForAWeek);
  const currentDate = new Date();
  const days = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];
  const [currentDay, setCurrentDay] = useState(days[currentDate.getDay()])
  const [previousBtnClicked, setPreviousBtnClicked] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (eventDate.toDateString() !== currentDate.toDateString() || previousBtnClicked)
        await dispatch(
          fetchEventsForTheWeek({ businessId: businessId, date: eventDate })
        );
    };
    fetchData();
  }, [eventDate]);

  const fetchEventsForAParticularDay = async (day) => {
    const obj = {
      date: new Date(),
      day: day,
      businessId: businessId,
    };
    setCurrentDay(day)
    await dispatch(fetchEventsForTheDay(obj));
  };

  const previousWeek = async () => {
    dispatch(previousWeekDate());
    setPreviousBtnClicked(true)
    setNextBtnClicked(false)
  };

  const nextWeek = async () => {
    dispatch(nextWeekDate());
    setPreviousBtnClicked(false)
    setNextBtnClicked(true)
  };
  return (
    <>
      {loader || loadingForWeek? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <CalenderSectionWrap>
          <TopArrows>
            <ArrowsWrap>
              <Button disabled={eventDate < currentDate} onClick={() => previousWeek()}> 
              <LeftArrow
                className={
                  eventDate < currentDate
                    ? "disabled"
                    : ""
                }              
                disabled={eventDate < currentDate}
              >
                <RiArrowDropLeftLine />
              </LeftArrow></Button>
              <CurrentDate>22 Feb - 28 Feb 2021</CurrentDate>
              <RightArrow>
                <RiArrowDropRightLine onClick={() => nextWeek()} />
              </RightArrow>
            </ArrowsWrap>
            <TodayBtn>Today</TodayBtn>
          </TopArrows>

          <DaysWrap>
            <DaysDiv
              className={previousBtnClicked||nextBtnClicked?"":currentDay==="sun"?"current":""}
              onClick={() => fetchEventsForAParticularDay("sun")}
            >
              sun
            </DaysDiv>
            <DaysDiv
              className={previousBtnClicked||nextBtnClicked?"":currentDay==="mon"?"current":""}
              onClick={() => fetchEventsForAParticularDay("mon")}
            >
              mon
            </DaysDiv>
            <DaysDiv
              className={previousBtnClicked||nextBtnClicked?"":currentDay==="tue"?"current":""}
              onClick={() => fetchEventsForAParticularDay("tue")}
            >
              <DaysIndicator />
              tue
            </DaysDiv>
            <DaysDiv
             className={previousBtnClicked||nextBtnClicked?"":currentDay==="wed"?"current":""}
             onClick={() => fetchEventsForAParticularDay("wed")}>
              wed
            </DaysDiv>
            <DaysDiv 
            className={previousBtnClicked||nextBtnClicked?"":currentDay==="thurs"?"current":""}
            onClick={() => fetchEventsForAParticularDay("thurs")}>
              thur
            </DaysDiv>
            <DaysDiv
            className={previousBtnClicked||nextBtnClicked?"":currentDay==="fri"?"current":""}
             onClick={() => fetchEventsForAParticularDay("fri")}>
              fri
            </DaysDiv>
            <DaysDiv
            className={previousBtnClicked||nextBtnClicked?"":currentDay==="sat"?"current":""}
            onClick={() => fetchEventsForAParticularDay("sat")}>
              sat
            </DaysDiv>
          </DaysWrap>
          <BtnWrap>
            <SaveButton>Create Event</SaveButton>
          </BtnWrap>
        </CalenderSectionWrap>
      )}
    </>
  );
};

export default CalenderSection;
