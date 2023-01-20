import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { assignHexDict } from "./functions/index";

import GridView from "./gridView/gridView";
import useStore from "../useState/index";

import "./style.css";

const GridContainer = () => {
  const feedData = useSelector((state) => state.myFeed.myFeed);
  const searchData = useSelector((state) => state.myFeed.searchFeed);

  const gridMode = useStore((state) => state.gridMode);

  const setGridView = useStore((state) => state.setGridView);

  const places = useStore((state) => state.places);
  const setPlaces = useStore((state) => state.setPlaces);

  const setCamPos = useStore((state) => state.setCamPosition);

  const centerPlace = useStore((state) => state.centerPlace);

  const setMultiDict = useStore((state) => state.setMultiDict);
  const setOrderedPlaces = useStore((state) => state.setOrderedPlaces);
  const setPlaceCoordDict = useStore((state) => state.setPlaceCoordDict);

  const draggedLocation = useStore((state) => state.draggedLocation);

  const tabSelected = useStore((state) => state.tabSelected);

  const setDisplacedCenterHexPosition = useStore(
    (state) => state.setDisplacedCenterHexPosition
  );

  useEffect(() => {
    if (searchData.length > 0 && tabSelected == 1) {
      loadData(searchData);
    }
    if (feedData.length > 0 && tabSelected == 2) {
      loadData(feedData);
    }
    if (feedData.length > 0 && tabSelected == -1) {
      loadData(feedData);
    }
  }, [feedData, searchData]);

  const loadData = (data) => {
    const _places = [];
    data.forEach((element) => {
      const deepClone = JSON.parse(JSON.stringify(element));
      if (!deepClone.businessLocation && deepClone.location) {
        deepClone.businessLocation = deepClone.location;
      }
      _places.push(deepClone);
    });
    setPlaces(_places);
    setGridView(true);
  };

  // call recenter

  // on setting places
  useEffect(() => {
    reCenter(null);
  }, [places, draggedLocation, gridMode]);
  // on shifting centerPlace..
  useEffect(() => {
    const timer1 = setTimeout(() => reCenter(centerPlace), 2000);
    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(timer1);
    };
  }, [centerPlace]);

  const reCenter = (place) => {
    let limit = 20;

    let limitedOrderedPlaces;
    if (place) {
      const { _orderedPlacesResponse, _slotDictResponse, _multiDictResponse } =
        assignHexDict(places, draggedLocation, place);

      if (_orderedPlacesResponse.length < limit) {
        limit = _orderedPlacesResponse.length;
      }
      limitedOrderedPlaces = _orderedPlacesResponse.slice(0, limit - 1);
      setOrderedPlaces(limitedOrderedPlaces);
      setMultiDict(_multiDictResponse);
      setPlaceCoordDict(_slotDictResponse);
      setDisplacedCenterHexPosition([0, 0, 0]);
      setCamPos([0, 0, 5]);
    } else {
      if (places.length > 0) {
        const {
          _orderedPlacesResponse,
          _slotDictResponse,
          _multiDictResponse,
        } = assignHexDict(places, draggedLocation, place);

        if (_orderedPlacesResponse.length < limit) {
          limit = _orderedPlacesResponse.length;
        }
        limitedOrderedPlaces = _orderedPlacesResponse.slice(0, limit);
        setOrderedPlaces(limitedOrderedPlaces);
        setMultiDict(_multiDictResponse);
        setPlaceCoordDict(_slotDictResponse);
        setDisplacedCenterHexPosition([0, 0, 0]);
        setCamPos([0, 0, 5]);
      } else {
        setOrderedPlaces([]);
        setMultiDict({});
        setPlaceCoordDict({});
        setDisplacedCenterHexPosition([0, 0, 0]);
        setCamPos([0, 0, 5]);
      }
    }
  };

  return (
    <div>
      {gridMode && (
        <container className="grid-container-left">
          <GridView center={draggedLocation} places={places} />
        </container>
      )}
    </div>
  );
};

export default GridContainer;
