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
  .MuiFormControl-root {
    display: none
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
          orientation="landscape"
          variant="static"
          openTo="date"
          value={date}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          open={open}
          label="12 hours"
          value={date}
          onChange={onChangeTime}
          onClose={() => setOpen(!open)}
        />
      </MuiPickersUtilsProvider>
    </CalendarWrap>
  );
}
export default Calendar;
