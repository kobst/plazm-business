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


const DropDown = ({options, value, onChange}) => {
  const [open, setOpen] = useState();
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target) && open) {
      setOpen(false);
    }
  };

  const onSelect = (v) => {
    setOpen(false);
    onChange(v)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <DateText ref={ref}>
      {value ?? '--'}
      <DateDropdown onClick={() => setOpen((v) => !v)}>
        <IoMdArrowDropdown />
      </DateDropdown>
      <DropDownSection isOpen={open}>
        <ul>
          {options.map((option) => (
            <li key={option} onClick={() => onSelect(option)}>{option}</li>
          ))}
        </ul>
      </DropDownSection>
    </DateText>
  );
};

export default DropDown;
