import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";

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
  }
  .MuiPickersCalendarHeader-dayLabel:last-child {
    color: #ee3840;
    font-weight: 600;
    text-transform: uppercase;
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
`;

/*
 *@desc: calendar component
 */
function Calendar({ date, changeDate }) {
  return (
    <CalendarWrap>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
        />
      </MuiPickersUtilsProvider>
    </CalendarWrap>
  );
}
export default Calendar;
