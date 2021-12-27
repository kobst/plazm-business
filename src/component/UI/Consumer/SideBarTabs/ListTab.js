import { FaDivide } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import UploadImg from "../../../../images/upload-img.jpg";
import "./styles.css";


import {
    checkMime,
    replaceBucket,
  } from "../../../../utilities/checkResizedImage";

const ListTab = ({
    data,
    handleListTabClick,
    setSelectedListId,
    selectedListId,
    setListTab,
    selectedList,
    setSelectedList,
  }) => {
    const user = useSelector((state) => state.user.user);
    const [uploadMenu, setUploadMenu] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);

    const [selected, setSelected] = useState(false)
  
    /** to check if list view size image exists in bucket */
    useEffect(() => {
      if (data.media.length > 0) {
        const findMime = checkMime(data.media[0].image);
        const image = replaceBucket(data.media[0].image, findMime, 45, 35);
        setImage(image);
      } else setImage(UploadImg);
    }, [data]);

    useEffect(()=>{
        if (selectedListId === data._id) {
            // set highlight
            setSelected(true)
        } else {
            setSelected(false)
        }

    }, [selectedListId])
  
  
  
    const errorFunction = () => {
      if (data.media.length && image !== data.media[0].image)
        setImage(data.media[0].image);
      else setImage(UploadImg);
    };

    const handleClick = ()=> {
        setSelectedListId(data._id)
        handleListTabClick(data)
    }




  
    return (
      <>
        <div
          onClick={() => handleClick(data._id)}
          className={selected ? "listTab-item selected" : "listTab-item"}
        >
            <img src={image} className="listTab-icon" alt="" onError={() => errorFunction()} />
            <span className="sidebar-text">{data.name}</span>
  
        </div>
      </>
    );
  };
  
  export default ListTab;
  