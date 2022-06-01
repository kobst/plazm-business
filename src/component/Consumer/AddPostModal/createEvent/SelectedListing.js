import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdCheck } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
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
  AddImagesLabel,
  ImagesRow,
  ImagesNameSec,
  ImagesCross,
  DropDownList,
  RightTick,
} from "./styled.js";

const SelectedListing = ({ formik }) => {
  const userLists = useSelector((state) => state.list.userLists);
  const [listName, setListName] = useState("");

  console.log('==================userLists==================');
  console.log(userLists);
  console.log('====================================');

  return (
    <FirstRow>
      <ClockIcon>
        <BsGrid />
      </ClockIcon>
      <DateText>
        Select List
        <DateDropdown>
          <IoMdArrowDropdown />
        </DateDropdown>
        <DropDownList>
          <ul>
            <li>
              <div className="ListName">Best 10 Gyms in New York</div>
              <span>
                <RightTick>
                  <MdCheck />
                </RightTick>
              </span>
            </li>
            <li>
              <div className="ListName">Best 10 Gyms in New York</div>
            </li>
            <li>
              <div className="ListName">Best 10 Gyms in New York</div>
            </li>
          </ul>
        </DropDownList>
      </DateText>
    </FirstRow>
  );
};

export default SelectedListing;
