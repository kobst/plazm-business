import { FaDivide } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import UploadImg from "../../../../images/upload-img.jpg";


import {
    checkMime,
    replaceBucket,
  } from "../../../../utilities/checkResizedImage";

const ListTab = ({
    data,
    setSelectedListId,
    selectedList,
    setSelectedList,
  }) => {
    const user = useSelector((state) => state.user.user);
    const [uploadMenu, setUploadMenu] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
  
    /** to check if list view size image exists in bucket */
    useEffect(() => {
      if (data.media.length > 0) {
        const findMime = checkMime(data.media[0].image);
        const image = replaceBucket(data.media[0].image, findMime, 155, 135);
        setImage(image);
      } else setImage(UploadImg);
    }, [data]);
  
  
  
    const errorFunction = () => {
      if (data.media.length && image !== data.media[0].image)
        setImage(data.media[0].image);
      else setImage(UploadImg);
    };
  
    return (
      <>
        <div
          onClick={() => setSelectedListId(data._id)}
          className="item"
        >
          
            <img src={image} alt="" onError={() => errorFunction()} />
            <span className="sidebar-text">Lists</span>
  
        </div>
      </>
    );
  };
  
  export default ListTab;
  