import React from "react";
import {
  DateText,
  DateDropdown,
} from "../styled.js";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


const UpDownSelect = ({options, value, onChange}) => {
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

  return (
    <DateText>
      {value ?? '--'}
      <DateDropdown>
        <IoMdArrowDropup onClick={() => onUp()} className="DropupIcon" /> <IoMdArrowDropdown onClick={() => onDown()} />
      </DateDropdown>
    </DateText>
  );
};

export default UpDownSelect;
