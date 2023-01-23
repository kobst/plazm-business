import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Input from "../../../UI/FormikInput";
import moment from "moment";
import Constants from "../../../../../constants/index";
const InputContainer = styled.div`
  border: 1px solid ${(props) => (props.usererror ? "#FF7171" : "#ffffff")};
  min-height: 60px;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
  padding: 6px 8px;
  margin: 0 0 20px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 0px;
  display: flex;
  flex-direction: column;

  option {
    font-weight: bold;
    font-size: 10px;
    text-transform: uppercase;
    color: #7f75bf;
    line-height: normal;
  }

  &select {
    height: 45px;
  }
`;

const LabelText = styled.label`
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  color: #7f75bf;
  line-height: normal;

  &::after {
    content: "*";
  }
`;

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 11px;
  margin: 0;
`;
const FormWrap = styled.div`
  width: 100%;
`;

const RepeatDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  border: 1px solid #fff;
  padding-top: 7px;
  padding-right: 15px;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    margin-bottom: 15px;
  }
  .container {
    display: block;
    position: relative;
    padding-left: 28px;
    margin-bottom: 12px;
    cursor: pointer;
    font-family: Roboto;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #ffffff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-top: 4px;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 6px;
    left: 10px;
    height: 10px;
    width: 10px;
    background-color: #fff;
    border-radius: 50%;
  }

  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  .container input:checked ~ .checkmark {
    background-color: #fff;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    top: 1px;
    left: 1px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff2e9a;
    border: 0;
    border-width: 0;
  }
`;

const DaysWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 5px;
  a {
    background: transparent;
    border-radius: 3px;
    color: #fff;
    font-weight: 600;
    font-size: 9px;
    line-height: 11px;
    cursor: pointer;
    padding: 5px 7px 7px;
    text-transform: uppercase;
    &.blueBg {
      background: #3f3777;
    }
    &.ColrRed {
      color: #fd3b44;
    }
  }
`;

/*
 *@desc: form body for add event schedule details
 */
function FormBody({ formik, setStartDateFocus, setEndDateFocus }) {
  // const [repeat, setRepeat] = useState(false);
  const setFieldFocus = (val) => {
    setStartDateFocus(val);
    setEndDateFocus(!val);
  };

  const handleRepetition = () => {
    // setRepeat((prev) => !prev);
    if (formik.values.repeat == 8) {
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
    <FormWrap>
      <InputContainer>
        <LabelText>Start Time</LabelText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <>
            <Input
              name="startTime"
              value={moment(formik.values.startTime).format(
                "DD/MM/yyyy HH:mm a"
              )}
              onChange={(e) =>
                formik.setFieldValue(
                  "startTime",
                  moment(e).format("DD/MM/yyyy HH:mm a")
                )
              }
              onFocus={() => setFieldFocus(true)}
            />
            {formik.errors && formik.errors.startTime ? (
              <ErrorDiv>{formik.errors.startTime}</ErrorDiv>
            ) : null}
            {formik.errors && formik.errors.startDate ? (
              <ErrorDiv>{formik.errors.startDate}</ErrorDiv>
            ) : null}
          </>
        </MuiPickersUtilsProvider>
      </InputContainer>
      <InputContainer>
        <LabelText>End Time</LabelText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <>
            <Input
              name="endTime"
              value={moment(formik.values.endTime).format("DD/MM/yyyy HH:mm a")}
              onChange={(e) =>
                formik.setFieldValue(
                  "endTime",
                  moment(e).format("DD/MM/yyyy HH:mm a")
                )
              }
              onFocus={() => setFieldFocus(false)}
            />
            {/* {formik.errors && formik.errors.endDate ? (
              <ErrorDiv>{formik.errors.endDate}</ErrorDiv>
            ) : formik.errors && formik.errors.endTime ? (
              <ErrorDiv>{formik.errors.endTime}</ErrorDiv>
            ) : null} */}
          </>
        </MuiPickersUtilsProvider>
      </InputContainer>
      {/* <InputContainer>
        <LabelText>Repeat</LabelText>
        <FormikSelect name="repeat">
          <option value="once">ONCE</option>
          <option value="Daily">DAILY</option>
          <option value="Weekly">WEEKLY</option>
          <option value="Monday-Friday">MONDAY - FRIDAY</option>
          <option value="Weekend">WEEKEND (SAT-SUN)</option>
        </FormikSelect>
      </InputContainer> */}
      <RepeatDiv>
        <label className="container">
          One Time
          <input
            type="radio"
            checked={formik.values.repeat == 8}
            onClick={handleRepetition}
            name="radio"
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Repeat
          <input
            type="radio"
            checked={formik.values.repeat != 8}
            onClick={handleRepetition}
            name="radio"
          />
          <span className="checkmark"></span>
        </label>
      </RepeatDiv>
      <DaysWrap>
        {formik.values.repeat != 8 && (
          <Fragment>
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
            {/* <a>mon</a>
            <a className="blueBg">tue</a>
            <a>wed</a>
            <a className="blueBg">thr</a>
            <a>fri</a>
            <a className="blueBg">sat</a> */}
          </Fragment>
        )}
      </DaysWrap>
    </FormWrap>
  );
}
export default FormBody;
