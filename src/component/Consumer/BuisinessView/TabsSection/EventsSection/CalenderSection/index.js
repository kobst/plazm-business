import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import SaveButton from "../../../../UI/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsForTheDay,
  nextWeekDate,
  previousWeekDate,
  fetchEventsForTheWeek,
  fetchInitialWeekEvents,
  setCurrentDate,
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
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
  button {
    :hover,
    :focus {
      outline: 0;
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
  :hover,
  :focus {
    outline: 0;
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
  :hover,
  :focus {
    outline: 0;
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
    box-shadow: 0px 0px 4px #ff2e9a;
    backdrop-filter: blur(250px);
    :after {
      content: "";
      width: 35px;
      height: 2px;
      background: #ff2e9a;
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
  background: #ff006b;
  border-radius: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
  border: 0;
  padding: 4px 9px;
  cursor: pointer;
`;

const DaysIndicator = styled.div`
  width: 7px;
  height: 7px;
  background: #ff2e9a;
  box-shadow: 0px 0px 4px #ff2e9a;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
`;

const CalenderSection = ({ businessId }) => {
  const dispatch = useDispatch();
  const eventDate = useSelector((state) => state.event.date);
  const loader = useSelector((state) => state.event.loading);
  const loadingForWeek = useSelector((state) => state.event.loadingForAWeek);
  const events = useSelector((state) => state.event.events);
  const initialWeekEvents = useSelector(
    (state) => state.event.initialWeekEvents
  );
  const currentDate = new Date();
  const days = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
  const [currentDay, setCurrentDay] = useState(days[currentDate.getDay()]);
  const currentDayNo = currentDate.getDay();
  const [previousBtnClicked, setPreviousBtnClicked] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [dateToDisplay, setDateToDisplay] = useState({
    firstDay: "",
    lastDay: "",
  });
  const [todayClicked, setTodayClicked] = useState(false);
  const today = days[currentDate.getDay()];

  useEffect(() => {
    const fetchData = async () => {
      if (
        eventDate.toDateString() !== currentDate.toDateString() ||
        previousBtnClicked
      )
        await dispatch(
          fetchEventsForTheWeek({ businessId: businessId, date: eventDate })
        );
      /** to fetch week data for initial week */ else {
        await dispatch(
          fetchInitialWeekEvents({ businessId: businessId, date: eventDate })
        );
      }
    };
    fetchData();
  }, [eventDate]);

  /** to set week starting and end date */
  useEffect(() => {
    const curr = new Date(eventDate);
    const first = curr.getDate() - curr.getDay() + 1;
    const last = first + 6;
    const firstDay = new Date(curr.setDate(first)).toUTCString();
    const lastDay = new Date(curr.setDate(last)).toUTCString();
    setDateToDisplay({
      firstDay: moment(firstDay).format("DD MMM YYYY"),
      lastDay: moment(lastDay).format("DD MMM YYYY"),
    });
  }, [eventDate]);

  /** to check if events are present or not on that particular day */
  const checkEventPresent = (param) => {
    /**for initial week */
    if (initialWeekEvents.length > 0) {
      const find = initialWeekEvents.find(
        (i) =>
          moment(new Date(i.eventSchedule.start_time)).format("DD MMM YYYY") ===
          moment(
            moment(dateToDisplay.firstDay).add(param, "day"),
            "DD-MM-YYYY"
          ).format("DD MMM YYYY")
      );
      if (find) return true;
      else return false;
    } else {
      const find = events.find(
        (i) =>
          moment(new Date(i.eventSchedule.start_time)).format("DD MMM YYYY") ===
          moment(
            moment(dateToDisplay.firstDay).add(param, "day"),
            "DD-MM-YYYY"
          ).format("DD MMM YYYY")
      );
      if (find) return true;
      else return false;
    }
  };

  /** to fetch event for a particular day */
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

  /** to toggle event date to previous week */
  const previousWeek = async () => {
    setTodayClicked(false);
    dispatch(previousWeekDate());
    setPreviousBtnClicked(true);
    setNextBtnClicked(false);
  };

  /** to toggle event date to next week */
  const nextWeek = async () => {
    dispatch(nextWeekDate());
    setTodayClicked(false);
    setPreviousBtnClicked(false);
    setNextBtnClicked(true);
  };

  const todayFunction = () => {
    setCurrentDay(days[currentDate.getDay()]);
    setTodayClicked(true);
    dispatch(setCurrentDate());
    dispatch(
      fetchEventsForTheDay({
        date: new Date(),
        day: days[new Date().getDay()],
        businessId: businessId,
      })
    );
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
            <ArrowsWrap>
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
              <CurrentDate>
                {dateToDisplay.firstDay + " - " + dateToDisplay.lastDay}
              </CurrentDate>
              <RightArrow>
                <RiArrowDropRightLine onClick={() => nextWeek()} />
              </RightArrow>
            </ArrowsWrap>
            <TodayBtn onClick={() => todayFunction()}>Today</TodayBtn>
          </TopArrows>
          <DaysWrap>
            <DaysDiv
              className={
                (today === "sun" && todayClicked) ||
                (today === "sun" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 0 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(6) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(6) === true
                    ? "present"
                    : ""
                  : today === "sun"
                  ? "current"
                  : 0 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(6) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sun", 0)}
            >
              {(previousBtnClicked &&
                0 >= currentDayNo &&
                checkEventPresent(6) === true) ||
              (nextBtnClicked && checkEventPresent(6) === true) ||
              (0 >= currentDayNo && checkEventPresent(6) === true) ? (
                <DaysIndicator />
              ) : null}
              sun
            </DaysDiv>
            <DaysDiv
              className={
                (today === "mon" && todayClicked) ||
                (today === "mon" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 1 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(0) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(0) === true
                    ? "present"
                    : ""
                  : today === "mon"
                  ? "current"
                  : 1 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(0) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("mon", 1)}
            >
              {(previousBtnClicked &&
                1 >= currentDayNo &&
                checkEventPresent(0) === true) ||
              (nextBtnClicked && checkEventPresent(0) === true) ||
              (1 >= currentDayNo && checkEventPresent(0) === true) ? (
                <DaysIndicator />
              ) : null}
              mon
            </DaysDiv>
            <DaysDiv
              className={
                (today === "tue" && todayClicked) ||
                (today === "tue" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 2 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(1) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(1) === true
                    ? "present"
                    : ""
                  : today === "tue"
                  ? "current"
                  : 2 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(1) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("tue", 2)}
            >
              {(previousBtnClicked &&
                2 >= currentDayNo &&
                checkEventPresent(1) === true) ||
              (nextBtnClicked && checkEventPresent(6) === true) ||
              (2 >= currentDayNo && checkEventPresent(1) === true) ? (
                <DaysIndicator />
              ) : null}
              tue
            </DaysDiv>
            <DaysDiv
              className={
                (today === "wed" && todayClicked) ||
                (today === "wed" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 3 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(2) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(2) === true
                    ? "present"
                    : ""
                  : today === "wed"
                  ? "current"
                  : 3 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(2) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("wed", 3)}
            >
              {(previousBtnClicked &&
                3 >= currentDayNo &&
                checkEventPresent(2) === true) ||
              (nextBtnClicked && checkEventPresent(2) === true) ||
              (3 >= currentDayNo && checkEventPresent(2) === true) ? (
                <DaysIndicator />
              ) : null}
              wed
            </DaysDiv>
            <DaysDiv
              className={
                (today === "thurs" && todayClicked) ||
                (today === "thurs" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 4 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(3) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(3) === true
                    ? "present"
                    : ""
                  : today === "thurs"
                  ? "current"
                  : 4 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(3) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("thurs", 4)}
            >
              {(previousBtnClicked &&
                4 >= currentDayNo &&
                checkEventPresent(3) === true) ||
              (nextBtnClicked && checkEventPresent(3) === true) ||
              (4 >= currentDayNo && checkEventPresent(3) === true) ? (
                <DaysIndicator />
              ) : null}
              thur
            </DaysDiv>
            <DaysDiv
              className={
                (today === "fri" && todayClicked) ||
                (today === "fri" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 5 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(4) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(4) === true
                    ? "present"
                    : ""
                  : today === "fri"
                  ? "current"
                  : 5 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(4) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("fri", 5)}
            >
              {(previousBtnClicked &&
                5 >= currentDayNo &&
                checkEventPresent(4) === true) ||
              (nextBtnClicked && checkEventPresent(4) === true) ||
              (5 >= currentDayNo && checkEventPresent(4) === true) ? (
                <DaysIndicator />
              ) : null}
              fri
            </DaysDiv>
            <DaysDiv
              className={
                (today === "sat" && todayClicked) ||
                (today === "sat" && !nextBtnClicked)
                  ? "current"
                  : previousBtnClicked
                  ? 6 < currentDayNo
                    ? "disabled"
                    : checkEventPresent(5) === true
                    ? "present"
                    : ""
                  : nextBtnClicked
                  ? checkEventPresent(5) === true
                    ? "present"
                    : ""
                  : today === "sat"
                  ? "current"
                  : 6 < currentDayNo
                  ? "disabled"
                  : checkEventPresent(5) === true
                  ? "present"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sat", 6)}
            >
              {(previousBtnClicked &&
                6 >= currentDayNo &&
                checkEventPresent(5) === true) ||
              (nextBtnClicked && checkEventPresent(5) === true) ||
              (6 >= currentDayNo && checkEventPresent(5) === true) ? (
                <DaysIndicator />
              ) : null}
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
