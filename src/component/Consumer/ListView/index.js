import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCreatedAndFollowedList } from "../../../reducers/listReducer";

const ListView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const obj = {
      id: user._id,
      value: 0,
    };
    dispatch(fetchUserCreatedAndFollowedList(obj));
  }, [dispatch, user._id]);
  return <></>;
};

export default ListView;
