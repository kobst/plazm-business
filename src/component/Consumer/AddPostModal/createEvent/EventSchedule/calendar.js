import React, { useState } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";
import moment from "moment";
import MomentUtils from "@date-io/moment";

moment.updateLocale("en", {
  week: {
    dow: 1
  }
});

const CalendarWrap = styled.div`
  .MuiPickersDatePickerRoot-toolbarLandscape {
    display: none;
  }
  .MuiTypography-colorInherit {
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }
  .MuiPickersStaticWrapper-staticWrapperRoot {
    background-color: #282352;
  }
  .MuiPickersCalendarHeader-dayLabel {
    color: #0094ff;
    font-weight: 600;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 22px;
    width:16px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(5) {
    position: relative;
    left: 5px;
    width: 15px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(4) {
    position: relative;
    left: 5px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(3) {
    position: relative;
    left: 5px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(2) {
    position: relative;
    left: 5px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(1) {
    width:20px;
    position: relative;
    left:8px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(6) {
    width:16px;
    position: relative;
    left: 5px;
  }
  .MuiPickersCalendarHeader-dayLabel:last-child {
    color: #ee3840;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    left: 5px;
  }
  .MuiPickersCalendarHeader-iconButton {
    background-color: transparent;
  }
  .MuiIconButton-root {
    color: #ffffff;
  }
  .MuiPickersDay-daySelected {
    border-radius: 4px;
    background-color: #ff2e9a;
  }
  .MuiPickersSlideTransition-transitionContainer > * {
    font-weight: bold;
  }
  // .MuiFormControl-root {
  //   display: none
  // }
  @media only screen and (max-width: 767px) {
  .MuiPickersCalendarHeader-daysHeader span:nth-child(1) {
      width: 27px;
      left: 3px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(2) {
      left: 0px;
      width: 23px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(3) {
      left: 0px;
      width: 25px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(4) {
      left: -1px;
      width: 23px;
  }
  .MuiPickersCalendarHeader-daysHeader span:nth-child(5) {
      left: -3px;
      width: 20px;
      margin-right: 14px;
  }  
  .MuiPickersCalendarHeader-daysHeader span:nth-child(6) {
      width: 21px;
      left: 4px;
      margin-right: 13px;
  }  
  .MuiPickersCalendarHeader-dayLabel:last-child {
      left: 13px;
      width: 22px;
  }
  }
  &.MuiPickersToolbar-toolbar {
    display: none;
  }  
`;

/*
 *@desc: calendar component
 */
function Calendar({ date, changeDate }) {
  const [open, setOpen] = useState(false);

  const onChange = (value) => {
    setOpen(!open);
    changeDate(value);
  };

  const onChangeTime = (value) => {
    const time = moment(value).format("HH:mm:ss");
    const date1 = moment(date).format("YYYY-MM-DD");
    changeDate(moment(date1+' '+time));
  };
  return (
    <CalendarWrap>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          autoOk
          variant="inline"
          openTo="date"
          value={date}
          onChange={onChange}
          minDate={new Date()}
          format="ddd, DD MMM YYYY"
        />
      </MuiPickersUtilsProvider>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          open={open}
          label="12 hours"
          value={date}
          onChange={onChangeTime}
          onClose={() => setOpen(!open)}
        />
      </MuiPickersUtilsProvider> */}
    </CalendarWrap>
  );
}
export default Calendar;