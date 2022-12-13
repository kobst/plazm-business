import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import BusinessListing from './BusinessListing';
import {
  clearMyFeedData,
  setLoading,
  setSideFiltersHomeSearch,
} from '../../../reducers/myFeedReducer';
import {setUserlocation} from '../../../reducers/businessReducer';

import useStore from '../useState';

const ContentWrap = styled.div`
  padding: 0px;
  width: 100%;
`;

const HomeSearch = ({
  ...props
}) => {
  const dispatch = useDispatch();
  const [locationState, setLocationState] = useState('prompt');
  const [loader, setLoader] = useState(null);
  const [coords, setCoords] = useState(null);
  const [closestFilter, setClosestFilter] = useState(true);


  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setSearchIndex = useStore((state) => state.setSearchIndex);
  const setListClickedFromSearch = useStore((state) => state.setListClickedFromSearch);
  const draggedLocation = useStore((state) => state.draggedLocation);

  useEffect(() => {
    dispatch(setSideFiltersHomeSearch());
    dispatch(clearMyFeedData());
  }, [dispatch]);

  // /** to set coordinates when location is enabled */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setClosestFilter(true);
      setLocationState('granted');
      setCoords({
        latitude: draggedLocation.lat,
        longitude: draggedLocation.lng,
      });
      dispatch(
          setUserlocation({
            latitude: draggedLocation.lat,
            longitude: draggedLocation.lat,
          }),
      );
    });
  }, [dispatch]);


  /** to wait for 3 sec for user reply to allow/deny geoLocation */
  useEffect(() => {
    if (locationState) {
      setLoader(true);
      dispatch(setLoading());
      if (locationState === 'prompt') {
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      } else setLoader(false);
    }
  }, [locationState, props.coords]);

  return (
    <>
      <ContentWrap>
        <BusinessListing
          setSelectedListId={setSelectedListId}
          setListClickedFromSearch={setListClickedFromSearch}
          setSearchIndex={setSearchIndex}
          loader={loader}
          coords={coords}
          closestFilter={closestFilter}
        />
      </ContentWrap>
    </>
  );
};

export default HomeSearch;
