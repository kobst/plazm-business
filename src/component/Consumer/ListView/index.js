import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedListDetails,
  fetchUserCreatedAndFollowedList,
} from "../../../reducers/listReducer";
import useStore from "../useState";

const ListView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const obj = {
      id: user._id,
      value: 0,
    };
    dispatch(fetchUserCreatedAndFollowedList(obj));
    dispatch(
      fetchSelectedListDetails({
        id: "608271ed16f9cb00088ce985",
        value: 0,
        latitude: Number(userLocation.lat),
        longitude: Number(userLocation.lng),
      })
    );
  }, [dispatch, user._id]);
  return <></>;
};

export default ListView;
