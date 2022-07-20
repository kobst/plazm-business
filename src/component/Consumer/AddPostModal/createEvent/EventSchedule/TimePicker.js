import React, { useState, useRef, useEffect } from "react";
import {
  FirstRow,
  ClockIcon,
  DatePickerInput,
  DateRow,
  DateDiv,
  DateText,
  DateDropdown,
  Hyphen,
  DropDownSection,
} from "../styled.js";
import { IoMdArrowDropdown } from "react-icons/io";

const timeOptions = (max, min) => {
  const data = [];
  for (var i = 0; i < 1440; i += 15) {
    if (max && i >= max) {
      continue;
    }
    if (min && i <= min) {
      continue;
    }
    let hours = Math.floor(i / 60);
    const hour = Math.floor(i / 60);
    let minutes = i % 60;
    if (minutes < 10) {
      minutes = "0" + minutes; // adding leading zero
    }
    let ampm = hours % 24 < 12 ? "am" : "pm";
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    data.push({
      minutes: i,
      value: hour + ":" + minutes,
      text: hours + ":" + minutes + " " + ampm,
    });
  }
  return data;
};

const toMinutes = (hms) => {
  var a = hms.split(":");
  return +a[0] * 60 + +a[1];
};

const getTime = (hm) => {
  const minutes = toMinutes(hm);
  const time = timeOptions().find((v) => v.minutes == minutes);
  return time?.text;
};

const TimePicker = ({ onChange, value, max, min }) => {
  const [open, setOpen] = useState();
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target) && open) {
      setOpen(false);
    }
  };

  const onSelectTime = (t) => {
    onChange(t.value);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <DateText ref={ref}>
      <span className={open ? "ActiveBox" : null}>
        {value ? getTime(value) : "--"}
      </span>
      <DateDropdown onClick={() => setOpen((v) => !v)}>
        <IoMdArrowDropdown />
      </DateDropdown>
      <DropDownSection isOpen={open}>
        <ul>
          {timeOptions(max, min).map((time) => (
            <li key={time.value} onClick={() => onSelectTime(time)}>
              {time.text}
            </li>
          ))}
        </ul>
      </DropDownSection>
    </DateText>
  );
};

export default TimePicker;
