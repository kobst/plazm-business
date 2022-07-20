import React, { useState } from "react";
import Calendar from "./calendar";
import Constants from "../../../../../constants/index";
import { FaRegClock } from "react-icons/fa";
import {
  FirstRow,
  ClockIcon,
  DatePickerInput,
  DateRow,
  DateDiv,
  Hyphen,
  ErrorDiv,
  ForText,
} from "../styled.js";
import { DaysWrap } from "./styled";
import TimePicker from "./TimePicker";
import DropDown from "./DropDown";
import UpDownSelect from "./UpDownSelect";

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
            date={formik.values.date} 
            changeDate={(val) => formik.setFieldValue('date', val)}
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
          options={[formik.values.repeat?.includes(8) ? "Repeat On" : "One Time"]}
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
        {/* {formik.values.repeat != 8 && (
        <>
          <ForText>For</ForText>
          <UpDownSelect 
            options={['1 Week', '2 Week', '3 Week', '4 Week', '5 Week']}
            onChange={(value) => formik.setFieldValue("for", value)}
            value={formik.values.for}
          />
          </>)} */}
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
