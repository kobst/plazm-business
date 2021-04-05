import React from "react";
import styled from "styled-components";
import {  MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker } from "@material-ui/pickers";
import FormikSelect from "../../UI/FormikSelect";

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

/*
 *@desc: form body for add event schedule details
 */
function FormBody({ formik, setStartDateFocus, setEndDateFocus }) {
  const setFieldFocus = (val) => {
    setStartDateFocus(val)
    setEndDateFocus(!val)
  }
  return (
    <>
      <InputContainer>
        <LabelText>Start Time</LabelText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <>
          <TimePicker
            name="startTime"
            format="dd/MM/yyyy HH:mm a"
            ampm={true}
            value={formik.values.startTime}
            onChange={(e) => formik.setFieldValue("startTime", e)}
            onFocus={()=>setFieldFocus(true)}
          />
          {formik.errors && formik.errors.startTime ? (
            <ErrorDiv>{formik.errors.startTime}</ErrorDiv>
          ) : null}
          </>
        </MuiPickersUtilsProvider>
      </InputContainer>
      <InputContainer>
        <LabelText>End Time</LabelText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <>
          <TimePicker
            name="endTime"
            format="dd/MM/yyyy HH:mm a"
            value={formik.values.endTime}
            onChange={(e) => formik.setFieldValue("endTime", e)}
            onFocus={()=>setFieldFocus(false)}
          />
          {formik.errors && formik.errors.endDate ? (
            <ErrorDiv>{formik.errors.endDate}</ErrorDiv>
          ) : formik.errors && formik.errors.endTime ? (
            <ErrorDiv>{formik.errors.endTime}</ErrorDiv>
          ):null}
          </>
        </MuiPickersUtilsProvider>
      </InputContainer>
      <InputContainer>
        <FormikSelect name="repeat">
          <option value="once">ONCE</option>
          <option value="Daily">DAILY</option>
          <option value="Weekly">WEEKLY</option>
          <option value="Monday-Friday">MONDAY - FRIDAY</option>
          <option value="Weekend">WEEKEND (SAT-SUN)</option>
        </FormikSelect>
      </InputContainer>
    </>
  );
}
export default FormBody;
