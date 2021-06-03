import React, { useState } from "react";
import styled from "styled-components";
import FormBody from "./formBody";
import { Formik } from "formik";
import BackButton from "../../UI/BackButton";
import SaveButton from "../../UI/SaveButton";
import * as Yup from "yup";
import { validate } from "./validate";
import Calendar from "./calendar";
import moment from "moment";

const EventWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 15px;
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


const ScheduleAnEvent = ({
  setDisplayCalendar,
  setEventDetails,
  setDisplayList,
}) => {
  const [date, changeDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [startDateFocus, setStartDateFocus] = useState(false);
  const [endDateFocus, setEndDateFocus] = useState(false);
  const displayCalendar = (e) => {
    e.preventDefault();
    setDisplayCalendar(false);
  };
  return (
    <EventWrap>
      <TopBar>
        <Heading>Schedule An Event</Heading>
      </TopBar>
      <CalenderTopWrap>
      
      <FormWrap>
        <Formik
          enableReinitialize={true}
          initialValues={{
            startDate: moment(date),
            endDate: moment(endDate),
            startTime: date,
            endTime: endDate,
            repeat: "Once",
          }}
          /*validation schema */
          validationSchema={Yup.object(validate)}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            /*to set event details*/
            const obj = {
              eventDate: `${moment(date).format("DD MMM YYYY")} to ${moment(
                endDate
              ).format("DD MMM YYYY")}`,
              eventTime: `FROM: ${moment(values.startTime).format(
                "HH:mm A"
              )} to ${moment(values.endTime).format("HH:mm A")}`,
              eventRepeat: values.repeat,
              start_time: values.startTime,
              end_time: values.endTime,
            };
            setEventDetails(obj);
            setDisplayCalendar(false);
            setDisplayList(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} method="POST">
              <CustomFirst>
              <CalendarWrap>
                {startDateFocus ? (
                  <Calendar date={date} changeDate={changeDate} minDate={null}/>
                ) : endDateFocus ? (
                  <Calendar date={endDate} changeDate={setEndDate} minDate={date}/>
                ) : null}
              </CalendarWrap>
              <FormBody
                formik={formik}
                setStartDateFocus={setStartDateFocus}
                setEndDateFocus={setEndDateFocus}
              />
              </CustomFirst>
              {/* bottom buttons bar */}
              <BottomButtonsBar>
                <BackButton onClick={(e) => displayCalendar(e)}>
                  Back
                </BackButton>
                <SaveButton type="submit">Confirm</SaveButton>
              </BottomButtonsBar>
            </form>
          )}
        </Formik>
      </FormWrap>
      </CalenderTopWrap>
    </EventWrap>
  );
};

export default ScheduleAnEvent;
