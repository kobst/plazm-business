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
import ValueLoader from "../../../../../../utils/loader";

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
  align-items: flex-start;
  justify-content: flex-start;
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
  @media (max-width: 767px) {
  }
  &.current {
    background: #ff2e9a;
    box-shadow: 10px 0px 43px -12px #1c1838;
    backdrop-filter: blur(250px);
  }
  &.disabled {
    opacity: 0.4;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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

const CalenderSection = ({ businessId }) => {
  const dispatch = useDispatch();
  const eventDate = useSelector((state) => state.event.date);
  const loader = useSelector((state) => state.event.loading);
  const loadingForWeek = useSelector((state) => state.event.loadingForAWeek);
  const currentDate = new Date();
  const days = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
  const [currentDay, setCurrentDay] = useState(days[currentDate.getDay()]);
  const currentDayNo = currentDate.getDay();
  const [previousBtnClicked, setPreviousBtnClicked] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (
        eventDate.toDateString() !== currentDate.toDateString() ||
        previousBtnClicked
      )
        await dispatch(
          fetchEventsForTheWeek({ businessId: businessId, date: eventDate })
        );
    };
    fetchData();
  }, [eventDate]);

  const fetchEventsForAParticularDay = async (day, dayNo) => {
    if (dayNo >= currentDayNo || nextBtnClicked) {
      const obj = {
        date: eventDate,
        day: day,
        businessId: businessId,
      };
      setCurrentDay(day);
      await dispatch(fetchEventsForTheDay(obj));
    }
  };

  const previousWeek = async () => {
    dispatch(previousWeekDate());
    setPreviousBtnClicked(true);
    setNextBtnClicked(false);
  };

  const nextWeek = async () => {
    dispatch(nextWeekDate());
    setPreviousBtnClicked(false);
    setNextBtnClicked(true);
  };
  return (
    <>
      {loader || loadingForWeek ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <CalenderSectionWrap>
          <TopArrows>
            <Button
              disabled={eventDate < currentDate}
              onClick={() => previousWeek()}
            >
              <LeftArrow
                className={eventDate < currentDate ? "disabled" : ""}
                disabled={eventDate < currentDate}
              >
                <RiArrowDropLeftLine />
              </LeftArrow>
            </Button>
            <RightArrow>
              <RiArrowDropRightLine onClick={() => nextWeek()} />
            </RightArrow>
          </TopArrows>
          <DaysWrap>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 0 < currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "sun"
                  ? "current"
                  : 0 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sun", 0)}
            >
              sun
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ?  1< currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "mon"
                  ? "current"
                  : 1 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("mon", 1)}
            >
              mon
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 2< currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "tue"
                  ? "current"
                  : 2 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("tue", 2)}
            >
              tue
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 3< currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "wed"
                  ? "current"
                  : 3 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("wed", 3)}
            >
              wed
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 4< currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "thurs"
                  ? "current"
                  : 4 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("thurs", 4)}
            >
              thur
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 5< currentDayNo?"disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "fri"
                  ? "current"
                  : 5 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("fri", 5)}
            >
              fri
            </DaysDiv>
            <DaysDiv
              className={
                previousBtnClicked
                  ? 6< currentDayNo? "disabled":""
                  : nextBtnClicked ? ""
                  : currentDay === "sat"
                  ? "current"
                  : 6 < currentDayNo
                  ? "disabled"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sat", 6)}
            >
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
