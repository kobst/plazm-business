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
  setSelectedDate,
  setWeekButtonClicked,
} from "../../../../../../reducers/eventReducer";
import ValueLoader from "../../../../../../utils/loader";
import AddEventModal from "../../../../AddPostModal/addEventModal";
import ModalComponent from "../../../../UI/Modal";

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
    :after {
      content: "";
      width: 35px;
      height: 2px;
      background: #ff2e9a;
      position: absolute;
      bottom: -6px;
      left: 10px;
    }
  }
  &.selectedDay {
    background: #ff2e9a;
    box-shadow: 0px 0px 4px #ff2e9a;
    backdrop-filter: blur(250px);
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
  const loadingForWeek = useSelector((state) => state.event.loadingForAWeek);
  const loader = useSelector((state) => state.event.loading);
  const events = useSelector((state) => state.event.events);
  const initialWeekEvents = useSelector(
    (state) => state.event.initialWeekEvents
  );
  const currentDate = new Date();
  const days = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
  const currentDayNo = currentDate.getDay();
  const [previousBtnClicked, setPreviousBtnClicked] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [dateToDisplay, setDateToDisplay] = useState({
    firstDay: "",
    lastDay: "",
  });
  const [todayClicked, setTodayClicked] = useState(false);
  const today = days[currentDate.getDay()];
  const [count, setCount] = useState(0);
  const [selectedCapsule, setSelectedCapsule] = useState(
    days[currentDate.getDay()]
  );
  const [addEventModal, setAddEventModal] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
    if(moment(new Date()).isBetween(dateToDisplay.firstDay, dateToDisplay.lastDay)) {
      setSelectedCapsule(days[currentDate.getDay()])
    }
  },[dateToDisplay])

  useEffect(() => {
    const fetchData = async () => {
      if (
        (eventDate.toDateString() !== currentDate.toDateString() ||
          previousBtnClicked) &&
        !todayClicked
      )
        await dispatch(
          fetchEventsForTheWeek({
            businessId: businessId,
            date: eventDate,
            userId: user._id,
          })
        );
      /** to fetch week data for initial week */ else {
        await dispatch(
          fetchInitialWeekEvents({
            businessId: businessId,
            date: eventDate,
            userId: user._id,
          })
        );
        dispatch(
          fetchEventsForTheDay({
            date: new Date(),
            day: days[new Date().getDay()],
            businessId: businessId,
          })
        );
      }
    };
    fetchData();
  }, [eventDate]);

  /** to set week starting and end date */
  useEffect(() => {
    const curr = new Date(eventDate);
    const first = curr.getDate() - curr.getDay();
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
            moment(new Date(dateToDisplay.firstDay)).add(param, "day"),
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
            moment(new Date(dateToDisplay.firstDay)).add(param, "day"),
            "DD-MM-YYYY"
          ).format("DD MMM YYYY")
      );
      if (find) return true;
      else return false;
    }
  };

  /** to fetch event for a particular day */
  const fetchEventsForAParticularDay = async (day, dayNo) => {
    if (
      (dayNo >= currentDayNo && !previousBtnClicked && !todayClicked) ||
      (nextBtnClicked && !todayClicked) ||
      (previousBtnClicked && count !== 0) ||
      (dayNo >= currentDayNo && previousBtnClicked && count === 0) ||
      (dayNo >= currentDayNo && nextBtnClicked && todayClicked) ||
      (dayNo >= currentDayNo &&
        !previousBtnClicked &&
        !nextBtnClicked &&
        todayClicked)
    ) {
      setSelectedCapsule(day);
      dispatch(setWeekButtonClicked(false));
      const obj = {
        date: eventDate,
        day: day,
        businessId: businessId,
      };
      dispatch(setSelectedDate(day));
      await dispatch(fetchEventsForTheDay(obj));
    }
  };

  /** to toggle event date to previous week */
  const previousWeek = () => {
    dispatch(setWeekButtonClicked(true));
    setSelectedCapsule("");
    setCount(count - 1);
    setTodayClicked(false);
    dispatch(previousWeekDate());
    setPreviousBtnClicked(true);
    setNextBtnClicked(false);
  };

  /** to toggle event date to next week */
  const nextWeek = () => {
    dispatch(setWeekButtonClicked(true));
    setSelectedCapsule("");
    setCount(count + 1);
    dispatch(nextWeekDate());
    setTodayClicked(false);
    setPreviousBtnClicked(false);
    setNextBtnClicked(true);
  };

  /** today function */
  const todayFunction = () => {
    dispatch(setWeekButtonClicked(false));
    setTodayClicked(true);
    dispatch(setCurrentDate());
    dispatch(setSelectedDate(days[currentDate.getDay()]));
    setSelectedCapsule(days[currentDate.getDay()]);
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
      {addEventModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addEventModal}
          closeModal={() => setAddEventModal(false)}
        >
          <AddEventModal closeModal={() => setAddEventModal(false)} />
        </ModalComponent>
      )}
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
                {moment(new Date(dateToDisplay.firstDay)).format("DD MMM") +
                  " - " +
                  dateToDisplay.lastDay}
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
                (today === "sun" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "sun"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 0 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "sun"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 0 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "sun"
                    ? "selectedDay"
                    : ""
                  : today === "sun"
                  ? selectedCapsule === "sun"
                    ? "current selectedDay"
                    : "current"
                  : 0 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "sun"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sun", 0)}
            >
              {(previousBtnClicked &&
                0 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(0) === true) ||
              (previousBtnClicked &&
                checkEventPresent(0) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(0) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(0) === true &&
                todayClicked &&
                0 >= currentDayNo) ||
              (0 >= currentDayNo && checkEventPresent(0) === true) ? (
                <DaysIndicator />
              ) : null}
              sun
            </DaysDiv>
            <DaysDiv
              className={
                (today === "mon" && todayClicked) ||
                (today === "mon" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "mon"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 1 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "mon"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 1 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "mon"
                    ? "selectedDay"
                    : ""
                  : today === "mon"
                  ? selectedCapsule === "mon"
                    ? "current selectedDay"
                    : "current"
                  : 1 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "mon"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("mon", 1)}
            >
              {(previousBtnClicked &&
                1 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(1) === true) ||
              (previousBtnClicked &&
                checkEventPresent(1) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(1) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(1) === true &&
                todayClicked &&
                1 >= currentDayNo) ||
              (1 >= currentDayNo && checkEventPresent(1) === true) ? (
                <DaysIndicator />
              ) : null}
              mon
            </DaysDiv>
            <DaysDiv
              className={
                (today === "tue" && todayClicked) ||
                (today === "tue" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "tue"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 2 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "tue"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 2 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "tue"
                    ? "selectedDay"
                    : ""
                  : today === "tue"
                  ? selectedCapsule === "tue"
                    ? "current selectedDay"
                    : "current"
                  : 2 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "tue"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("tue", 2)}
            >
              {(previousBtnClicked &&
                2 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(2) === true) ||
              (previousBtnClicked &&
                checkEventPresent(2) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(2) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(2) === true &&
                todayClicked &&
                2 >= currentDayNo) ||
              (2 >= currentDayNo && checkEventPresent(2) === true) ? (
                <DaysIndicator />
              ) : null}
              tue
            </DaysDiv>
            <DaysDiv
              className={
                (today === "wed" && todayClicked) ||
                (today === "wed" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "wed"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 3 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "wed"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 3 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "wed"
                    ? "selectedDay"
                    : ""
                  : today === "wed"
                  ? selectedCapsule === "wed"
                    ? "current selectedDay"
                    : "current"
                  : 3 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "wed"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("wed", 3)}
            >
              {(previousBtnClicked &&
                3 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(3) === true) ||
              (previousBtnClicked &&
                checkEventPresent(3) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(3) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(3) === true &&
                todayClicked &&
                3 >= currentDayNo) ||
              (3 >= currentDayNo && checkEventPresent(3) === true) ? (
                <DaysIndicator />
              ) : null}
              wed
            </DaysDiv>
            <DaysDiv
              className={
                (today === "thurs" && todayClicked) ||
                (today === "thurs" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "thurs"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 4 < currentDayNo && count === 0
                    ? "disabled"
                    : 4 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "thurs"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? selectedCapsule === "thurs"
                    ? "selectedDay"
                    : ""
                  : today === "thurs"
                  ? selectedCapsule === "thurs"
                    ? "current selectedDay"
                    : "current"
                  : 4 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "thurs"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("thurs", 4)}
            >
              {(previousBtnClicked &&
                4 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(4) === true) ||
              (previousBtnClicked &&
                checkEventPresent(4) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(4) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(4) === true &&
                todayClicked &&
                4 >= currentDayNo) ||
              (4 >= currentDayNo && checkEventPresent(4) === true) ? (
                <DaysIndicator />
              ) : null}
              thur
            </DaysDiv>
            <DaysDiv
              className={
                (today === "fri" && todayClicked) ||
                (today === "fri" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "fri"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 5 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "fri"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 5 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "fri"
                    ? "selectedDay"
                    : ""
                  : today === "fri"
                  ? selectedCapsule === "fri"
                    ? "current selectedDay"
                    : "current"
                  : 5 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "fri"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("fri", 5)}
            >
              {(previousBtnClicked &&
                5 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(5) === true) ||
              (previousBtnClicked &&
                checkEventPresent(5) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(5) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(5) === true &&
                todayClicked &&
                5 >= currentDayNo) ||
              (5 >= currentDayNo && checkEventPresent(5) === true) ? (
                <DaysIndicator />
              ) : null}
              fri
            </DaysDiv>
            <DaysDiv
              className={
                (today === "sat" && todayClicked) ||
                (today === "sat" && !nextBtnClicked && count === 0)
                  ? selectedCapsule === "sat"
                    ? "current selectedDay"
                    : "current"
                  : previousBtnClicked
                  ? 6 < currentDayNo && count === 0
                    ? "disabled"
                    : selectedCapsule === "sat"
                    ? "selectedDay"
                    : ""
                  : nextBtnClicked
                  ? 6 < currentDayNo && todayClicked
                    ? "disabled"
                    : selectedCapsule === "sat"
                    ? "selectedDay"
                    : ""
                  : today === "sat"
                  ? selectedCapsule === "sat"
                    ? "current selectedDay"
                    : "current"
                  : 6 < currentDayNo
                  ? "disabled"
                  : selectedCapsule === "sat"
                  ? "selectedDay"
                  : ""
              }
              onClick={() => fetchEventsForAParticularDay("sat", 6)}
            >
              {(previousBtnClicked &&
                6 >= currentDayNo &&
                count === 0 &&
                checkEventPresent(6) === true) ||
              (previousBtnClicked &&
                checkEventPresent(6) === true &&
                count !== 0) ||
              (nextBtnClicked &&
                checkEventPresent(6) === true &&
                !todayClicked) ||
              (nextBtnClicked &&
                checkEventPresent(6) === true &&
                todayClicked &&
                6 >= currentDayNo) ||
              (6 >= currentDayNo && checkEventPresent(6) === true) ? (
                <DaysIndicator />
              ) : null}
              sat
            </DaysDiv>
          </DaysWrap>
          <BtnWrap>
            <SaveButton onClick={() => setAddEventModal(true)}>
              Create Event
            </SaveButton>
          </BtnWrap>
        </CalenderSectionWrap>
      )}
    </>
  );
};

export default CalenderSection;
