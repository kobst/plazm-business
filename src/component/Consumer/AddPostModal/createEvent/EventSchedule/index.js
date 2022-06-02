import React, { useState } from "react";
import styled from "styled-components";
import FormBody from "./formBody";
import { Formik } from "formik";
import * as Yup from "yup";
import { validate } from "./validate";
import Calendar from "./calendar";
import moment from "moment";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import Constants from "../../../../../constants/index";

import { FaRegClock } from "react-icons/fa";

import {
  FirstRow,
  ClockIcon,
  DatePickerInput,
  DateRow,
  DateDiv,
  DateText,
  DateDropdown,
  Hyphen,
  ErrorDiv,
  ForText,
} from "../styled.js";
import { DaysWrap } from "./styled";
import TimePicker from "./TimePicker";
import DropDown from "./DropDown";

const EventWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const CalendarWrap = styled.div`
  /* width: 50%; */
  @media (max-width: 767px) {
    width: 100%;
  }
  .MuiPickersStaticWrapper-staticWrapperRoot {
    @media (max-width: 767px) {
      min-width: inherit;
    }
  }
  .MuiPickersBasePicker-pickerViewLandscape {
    @media (max-width: 767px) {
      padding: 0;
      min-width: 200px;
      max-width: 100%;
    }
  }
`;

const FormWrap = styled.div`
  /* width: 50%; */
  width: 100%;
  display: flex;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 0 0 15px;
  }
`;

const CalenderTopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  flex-direction: row;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CustomFirst = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  flex-direction: row;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const toMinutes = (hms) => {
  var a = hms.split(":");
  return +a[0] * 60 + +a[1];
};

const ScheduleAnEvent = ({ formik }) => {

  const handleRepetition = (value) => {
    const date = new Date(
      Math.round(Date.now() / (30 * 60 * 1000)) * (30 * 60 * 1000)
    );
    // setRepeat((prev) => !prev);
    // formik.values.repeat
    if (value == "Repeat On") {
      const dayToday = new Date().getDay();
      formik.setFieldValue("repeat", [dayToday + 1]);
    } else {
      formik.setFieldValue("repeat", [8]);
    }
  };

  const handleDayClick = (e) => {
    const day = +e.target.id;
    if (formik.values.repeat.includes(day)) {
      formik.setFieldValue(
        "repeat",
        formik.values.repeat.filter((val) => val !== day)
      );
    } else {
      formik.setFieldValue("repeat", [...formik.values.repeat, day]);
    }
  };

  return (
    <>
      <FirstRow>
        <ClockIcon>
          <FaRegClock className="IconOne" />
        </ClockIcon>
        <DatePickerInput>
          <Calendar
            className="EventCalender"
            date={date}
            changeDate={changeDate}
            minDate={null}
          />
        </DatePickerInput>
        <DateRow>
          <DateDiv>
            <TimePicker
              max={toMinutes(formik.values.end_time)}
              value={formik.values.start_time}
              onChange={(val) => formik.setFieldValue("start_time", val)}
            />
            <Hyphen>-</Hyphen>
            <TimePicker
              min={toMinutes(formik.values.start_time)}
              value={formik.values.end_time}
              onChange={(val) => formik.setFieldValue("end_time", val)}
            />
          </DateDiv>
        </DateRow>
      </FirstRow>
      <FirstRow className="PL-20">
        <DropDown
          options={["One Time", "Repeat On"]}
          onChange={handleRepetition}
          value={formik.values.repeat?.includes(8) ? "One Time" : "Repeat On"}
        />
        <DaysWrap>
          {formik.values.repeat != 8 && (
            <>
              {Object.entries(Constants.REPETITION_DAY).map(([key, value]) => {
                let className = parseInt(key) % 2 === 0 ? "" : "blueBg";
                if (formik.values.repeat.includes(+key)) {
                  className += " ColrRed";
                }
                return (
                  <a
                    key={key}
                    id={key}
                    className={className}
                    onClick={handleDayClick}
                  >
                    {value}
                  </a>
                );
              })}
            </>
          )}
        </DaysWrap>
        <ForText>For</ForText>
        <TimePicker
              max={toMinutes(formik.values.end_time)}
              value={formik.values.start_time}
              onChange={(val) => formik.setFieldValue("start_time", val)}
            />
      </FirstRow>
      {formik.errors && formik.errors.repeat ? (
        <FirstRow>
          <ErrorDiv>{formik.errors.repeat}</ErrorDiv>
        </FirstRow>
      ) : null}
    </>
  );
};

export default ScheduleAnEvent;
