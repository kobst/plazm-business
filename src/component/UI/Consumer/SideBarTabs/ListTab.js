import { FaDivide } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStore from "../../../Consumer/useState";

import { useHistory } from "react-router-dom";

import UploadImg from "../../../../images/upload-img.jpg";
import "./styles.css";

import {
  checkMime,
  replaceBucket,
} from "../../../../utilities/checkResizedImage";

const ListTab = ({
  data,
  handleListTabClick,
  // setSelectedListId,
  // selectedListId,
  // setListTab,
  // selectedList,
  // setSelectedList,
}) => {
  const history = useHistory();

  const user = useSelector((state) => state.user.user);
  const [uploadMenu, setUploadMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [hover, setHover] = useState(false);
  const selectedListId = useStore((state) => state.selectedListId);
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setSelectedList = useStore((state) => state.setSelectedList);

  /** to check if list view size image exists in bucket */
  useEffect(() => {
    if (data.media.length > 0) {
      const findMime = checkMime(data.media[0].image);
      const image = replaceBucket(data.media[0].image, findMime, 45, 35);
      setImage(image);
    } else setImage(UploadImg);
  }, [data]);

  useEffect(() => {
    if (selectedListId === data._id) {
      // set highlight
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedListId]);

  const errorFunction = () => {
    if (data.media.length && image !== data.media[0].image)
      setImage(data.media[0].image);
    else setImage(UploadImg);
  };

  const handleClick = () => {
    setSelectedList(data);
    setSelectedListId(data._id);
    handleListTabClick(data);
    history.push(`/list/${data._id}`);
  };
  const handelHover = () => {
    setHover(true);
  };
  const handelLeave = () => {
    setHover(false);
  };
  return (
    <>
      <div
        onClick={() => handleClick(data._id)}
        className={selected ? "listTab-item selected" : "listTab-item"}
        onMouseOver={handelHover}
        onMouseLeave={handelLeave}
      >
        {hover && <div className="tool-tip">{data.name}</div>}
        <img
          src={image}
          className="listTab-icon"
          alt=""
          onError={() => errorFunction()}
        />
        <span className="sidebar-text">
          <span className="subscription-text">{data.name}</span>
          <div className="RedDot"></div>
        </span>
      </div>
    </>
  );
};

export default ListTab;
