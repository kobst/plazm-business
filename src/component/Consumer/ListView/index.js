import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSelectedListDetails,
  fetchUserCreatedAndFollowedList,
} from '../../../reducers/listReducer';

function ListView() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const obj = {
      id: user._id,
      value: 0,
    };
    dispatch(fetchUserCreatedAndFollowedList(obj));
    dispatch(
      fetchSelectedListDetails({ id: '608271ed16f9cb00088ce985', value: 0 })
    );
  }, [dispatch, user._id]);
  return <></>;
}

export default ListView;
