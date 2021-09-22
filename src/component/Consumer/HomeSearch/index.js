import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import BusinessListing from "./BusinessListing";
import {
  clearMyFeedData,
  setSideFiltersByClosest,
  setSideFiltersHomeSearch,
} from "../../../reducers/myFeedReducer";

const ContentWrap = styled.div`
  padding: 0px;
`;

const HomeSearch = ({
  setSelectedListId,
  setListClickedFromSearch,
  setSearchIndex,
  setDisplayTab,
}) => {
  const dispatch = useDispatch();
  const [locationState, setLocationState] = useState(null);
  const [loader, setLoader] = useState(null);
  const [coords, setCoords] = useState(null);

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  useEffect(() => {
    dispatch(setSideFiltersHomeSearch());
    dispatch(clearMyFeedData());
  }, [dispatch]);

  /** to set the coordinates if the user allows geoLocation */
  const success = (pos) => {
    const crd = pos.coords;
    setCoords({ latitude: crd.latitude, longitude: crd.longitude });
  };

  /** to ask user for permissions to fetch current geoLocation */
  const fetchGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          /** if location is provided then we need data by closest latitude/longitude */
          dispatch(setSideFiltersByClosest());
          if (locationState !== "denied") setLocationState(result.state);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              success,
              () => {},
              options
            );
          }

          result.onchange = function () {
            setLocationState(result.state);
          };
        });
    } else {
      console.log("Location Not available!");
    }
  };

  /** to wait for 3 sec for user reply to allow/deny geoLocation */
  useEffect(() => {
    fetchGeoLocation();
    if (locationState) {
      setLoader(true);
      if (locationState === "prompt") {
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      } else setLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState]);
  return (
    <>
      <ContentWrap>
        {(locationState === "granted" && coords !== null) ||
        locationState === "denied" ||
        locationState === "prompt" ? (
          <BusinessListing
            setSelectedListId={setSelectedListId}
            setListClickedFromSearch={setListClickedFromSearch}
            setSearchIndex={setSearchIndex}
            loader={loader}
            coords={coords}
            setDisplayTab={setDisplayTab}
          />
        ) : null}
      </ContentWrap>
    </>
  );
};

export default HomeSearch;
