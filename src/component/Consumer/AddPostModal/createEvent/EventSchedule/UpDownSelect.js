import React, { useState, useRef, useEffect } from "react";
import {
  DateText,
  DateDropdown,
  DropDownSection,
} from "../styled.js";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


const UpDownSelect = ({options, value, onChange}) => {
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

  const onUp = () => {
    const index = options.indexOf(value)
    if(index > 0) {
      onChange(options[index-1])
    }
  }


  const onDown = () => {
    const index = options.indexOf(value)
    if(index < options.length - 1) {
      onChange(options[index+1])
    }
  }

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // });

  return (
    <DateText ref={ref}>
      {value ?? '--'}
      <DateDropdown>
        <IoMdArrowDropup onClick={() => onUp()} className="DropupIcon" /> <IoMdArrowDropdown onClick={() => onDown()} />
      </DateDropdown>
      {/* <DropDownSection isOpen={open}>
        <ul>
          {options.map((option) => (
            <li key={option} onClick={() => onSelect(option)}>{option}</li>
          ))}
        </ul>
      </DropDownSection> */}
    </DateText>
  );
};

export default UpDownSelect;
