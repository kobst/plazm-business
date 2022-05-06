import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import BusinessListing from './BusinessListing';
import {
  clearMyFeedData,
  setLoading,
  setSideFiltersHomeSearch,
} from '../../../reducers/myFeedReducer';
import ValueLoader from '../../../utils/loader';
import { setUserlocation } from '../../../reducers/businessReducer';

import useStore from '../useState';
import GridView from '../GridComponents/gridView/gridView';

const ContentWrap = styled.div`
  padding: 0px;
  width: 100%;
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

function HomeSearch({ ...props }) {
  const dispatch = useDispatch();
  const [locationState, setLocationState] = useState('prompt');
  const [loader, setLoader] = useState(null);
  const [coords, setCoords] = useState(null);
  const [closestFilter, setClosestFilter] = useState(true);

  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setSearchIndex = useStore((state) => state.setSearchIndex);
  const setListClickedFromSearch = useStore(
    (state) => state.setListClickedFromSearch
  );
  const draggedLocation = useStore((state) => state.draggedLocation);
  const gridMode = useStore((state) => state.gridMode);

  useEffect(() => {
    dispatch(setSideFiltersHomeSearch());
    dispatch(clearMyFeedData());
  }, [dispatch]);

  // /** to set coordinates when location is enabled */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
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
        })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState, props.coords]);

  return (
    <>
      {/* {!gridMode && */}
      <ContentWrap>
        {/* {(locationState === "granted" && coords !== null) ||
        locationState === "denied" ||
        locationState === "prompt" ? ( */}
        <BusinessListing
          setSelectedListId={setSelectedListId}
          setListClickedFromSearch={setListClickedFromSearch}
          setSearchIndex={setSearchIndex}
          loader={loader}
          coords={coords}
          // setDisplayTab={setDisplayTab}
          closestFilter={closestFilter}
        />
        {/* ) : (
          <LoaderWrap>
            <ValueLoader />
          </LoaderWrap>
        )} */}
      </ContentWrap>
      {/* } */}
    </>
  );
}

export default HomeSearch;
