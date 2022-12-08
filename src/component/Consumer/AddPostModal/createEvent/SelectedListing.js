import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { MdCheck } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import {
  FirstRow,
  ClockIcon,
  DateText,
  DateDropdown,
  DropDownList,
  RightTick,
  ErrorDiv,
} from "./styled.js";

const getText = (length) => (length < 2 ? " List Selected" : " Lists Selected");

const SelectedListing = ({ formik }) => {
  const ref = useRef();
  const userLists = useSelector((state) => state.list.userLists);
  const [open, setOpen] = useState();

  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target) && open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const toggleList = (list) => {
    const lists = formik.values.lists;
    if (lists?.includes(list)) {
      formik.setFieldValue(
        "lists",
        formik.values.lists.filter((l) => l !== list)
      );
    } else {
      formik.setFieldValue("lists", [...lists, list]);
    }
  };
  const lists = formik.values.lists;

  return (
    <>
      <FirstRow>
        <ClockIcon>
          <BsGrid />
        </ClockIcon>
        <DateText ref={ref}>
          {lists?.length
            ? lists?.length + getText(lists?.length)
            : "Select List"}
          <DateDropdown onClick={() => setOpen((v) => !v)}>
            <IoMdArrowDropdown />
          </DateDropdown>
          <DropDownList isOpen={open}>
            <ul>
              {userLists.map((list, idx) => (
                <li key={list._id} onClick={() => toggleList(list._id)}>
                  <div className="ListName">{list.name}</div>
                  {lists?.includes(list._id) && (
                    <span>
                      <RightTick>
                        <MdCheck />
                      </RightTick>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </DropDownList>
        </DateText>
      </FirstRow>
      {formik.errors && formik.errors.lists ? (
        <FirstRow>
          <ErrorDiv>{formik.errors.lists}</ErrorDiv>
        </FirstRow>
      ) : null}
    </>
  );
};

export default SelectedListing;
