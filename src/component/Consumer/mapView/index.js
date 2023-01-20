import React, { Component, useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import ReactMapboxGl, {
  Layer,
  Source,
  Feature,
  MapContext,
  GeoJSONLayer,
} from "react-mapbox-gl";
import useStore from "../useState/index";
import "./styles.css";
import Geocode, { setRegion } from "react-geocode";
import GoogleMapReact from "google-map-react";
import ColorDict from "../GridComponents/functions/colorSlotDict";
import styled from "styled-components";

import * as turf from "@turf/turf";
import { connect } from "react-redux";

const MapCenterOffset = styled.div`
  width: 10px;
  height: 10px
  position: absolute;
  top: 50%;
  right: 25%;
  background: red;
  z-index: 200
  transform: translate(-50%, -50%);
`;

// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js

// https://alex3165.github.io/react-mapbox-gl/demos

// https://medium.com/critigenopensource/an-approach-to-integrating-mapboxgl-in-react-redux-b50d82bc0ed0

const setLinesExt = (dict) => {
  const centerWhite = dict["0-0-0"];
  const topRed = dict["0--1-1"];
  const topRightOrange = dict["1--1-0"];
  const bottomRightYellow = dict["1-0--1"];
  const bottomGreen = dict["0-1--1"];
  const bottomLeftBlue = dict["-1-1-0"];
  const topLeftViolet = dict["-1-0-1"];
  let redLine;
  let orangeLine;
  let yellowLine;
  let greenLine;
  let blueLine;
  let violetLine;

  if (centerWhite) {
    if (topRed) {
      redLine = [
        centerWhite.businessLocation.coordinates,
        topRed.businessLocation.coordinates,
      ];
    } else {
      redLine = null;
    }

    if (topRightOrange) {
      orangeLine = [
        centerWhite.businessLocation.coordinates,
        topRightOrange.businessLocation.coordinates,
      ];
    } else {
      orangeLine = null;
    }

    if (bottomRightYellow) {
      yellowLine = [
        centerWhite.businessLocation.coordinates,
        bottomRightYellow.businessLocation.coordinates,
      ];
    } else {
      yellowLine = null;
    }

    if (bottomGreen) {
      greenLine = [
        centerWhite.businessLocation.coordinates,
        bottomGreen.businessLocation.coordinates,
      ];
    } else {
      greenLine = null;
    }

    if (bottomLeftBlue) {
      blueLine = [
        centerWhite.businessLocation.coordinates,
        bottomLeftBlue.businessLocation.coordinates,
      ];
    } else {
      blueLine = null;
    }

    if (topLeftViolet) {
      violetLine = [
        centerWhite.businessLocation.coordinates,
        topLeftViolet.businessLocation.coordinates,
      ];
    } else {
      violetLine = null;
    }
  } else {
    redLine =
      blueLine =
      yellowLine =
      greenLine =
      violetLine =
      orangeLine =
        null;
  }

  return {
    red: redLine,
    orange: orangeLine,
    yellow: yellowLine,
    blue: blueLine,
    green: greenLine,
    violet: violetLine,
  };
};

const setBBox = (_orderedPlaces) => {
  const maxViewable = 15;
  const coordArray = [];
  const featureSet = [];
  let limit = 10;
  if (_orderedPlaces.length < limit) {
    limit = _orderedPlaces.length - 1;
  }
  if (maxViewable) {
    limit = maxViewable;
  }
  console.log("ordered places " + _orderedPlaces.length);

  for (let i = 0; i < limit; i++) {
    if (_orderedPlaces[i]) {
      const coords = _orderedPlaces[i].businessLocation.coordinates;
      coordArray.push(coords);

      const feature = {
        type: "Feature",
        properties: {
          name: _orderedPlaces[i].company_name,
          color: _orderedPlaces[i].icon_color,
        },
        geometry: {
          type: "Point",
          coordinates: coords,
        },
      };
      featureSet.push(feature);
    }
  }

  const geoJsonFeatures = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [coordArray],
        },
      },
    ],
  };

  const geoFeatures = {
    type: "Features",
    features: featureSet,
  };

  const lngLatBox = turf.bbox(geoJsonFeatures);
  const sw = [lngLatBox[0], lngLatBox[1]];
  const ne = [lngLatBox[2], lngLatBox[3]];
  const fitBoundsObj = [sw, ne];
  return { box: fitBoundsObj, geo: geoFeatures };
};

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: true,
});

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const MapView = (props) => {
  const mapRef = useRef();
  const [boundBox, setBox] = useState([
    [-73.9876, 40.7661],
    [-73.9397, 40.8002],
  ]);
  const [geo, setGeo] = useState(null);
  const [lineArray, setLineArray] = useState([]);
  const [hex, setHex] = useState();
  const [features, setFeatures] = useState(null);
  const [places_center, setPlaces_center] = useState([]);
  const [placesOuter, setPlacesOuter] = useState([]);
  const [places_0, setPlaces_0] = useState();
  const [places_1, setPlaces_1] = useState();
  const [places_2, setPlaces_2] = useState();
  const [places_3, setPlaces_3] = useState();
  const [places_4, setPlaces_4] = useState();
  const [places_5, setPlaces_5] = useState();
  const [places_6, setPlaces_6] = useState();

  const [redLine, setRedLine] = useState(null);
  const [orangeLine, setOrangeLine] = useState(null);
  const [yellowLine, setYellowLine] = useState(null);
  const [greenLine, setGreenLine] = useState(null);
  const [blueLine, setBlueLine] = useState(null);
  const [violetLine, setVioletLine] = useState(null);

  const [layers, setLayers] = useState([]);
  // const [sublocality, setSubLocality] = useState("")
  // const [city, setCity] = useState("")
  const _colorDict = ColorDict();

  const places = useStore((state) => state.places);
  const selectedPlace = useStore((state) => state.selectedPlace);
  const centerPlace = useStore((state) => state.centerPlace);
  const multiDictSub = useStore((state) => state.multiDict);
  const orderedPlaces = useStore((state) => state.orderedPlaces);
  const slotDict = useStore((state) => state.placeCoordDict);
  const maxViewable = useStore((state) => state.maxViewable);
  const setPosDict = useStore((state) => state.setMapPosDict);
  const gridMode = useStore((state) => state.gridMode);
  const setSubLocality = useStore((state) => state.setSublocality);
  const setCity = useStore((state) => state.setCity);

  const detailView = useStore((state) => state.detailView);

  const setDraggedLocation = useStore((state) => state.setDraggedLocation);
  const draggedLocation = useStore((state) => state.draggedLocation);
  const userLocation = useStore((state) => state.userLocation);
  const [tempCenter, setTempCenter] = useState([
    userLocation.lng,
    userLocation.lat,
  ]);
  const [offsetCenter, setOffsetCenter] = useState(null);
  const postsInView = useStore((state) => state.postsInView);

  const gridContainerStyle = {
    // height: '100vh',
    // width: '100%'
    height: "100vh",
    width: "100vw",
    borderRadius: "5%",
  };

  const mapContainerStyle = {
    // height: '100vh',
    // width: '100%',
    height: "100vh",
    width: "60vw",
    borderRadius: "10%",
  };

  const [dimensions, setDimensions] = useState(gridContainerStyle);
  const [padding, setPadding] = useState(500);

  // only use if not using second map
  useMemo(() => {
    console.log("map view toggle");
    if (gridMode) {
      console.log("gridView true");
      // setDimensions(gridContainerStyle);
      setPadding(0);

      // Map.resize()
      // ReCenter()
    } else {
      // console.log("gridView false");
      // setDimensions(mapContainerStyle);
      setRedLine(null);
      setYellowLine(null);
      setOrangeLine(null);
      setGreenLine(null);
      setBlueLine(null);
      setVioletLine(null);
      setPadding(500);
      // Map.resize()
      // ReCenter()
    }
  }, [gridMode]);

  useEffect(() => {
    console.log("detail View from mapview " + detailView);
    if (selectedPlace && selectedPlace.businessLocation && detailView) {
      console.log(
        "selected place exists" + JSON.stringify(selectedPlace.businessLocation)
      );
      setTempCenter(selectedPlace.businessLocation.coordinates);
    }
  }, [detailView]);

  useEffect(() => {
    let mounted = true;

    // postsInView.forEach(elem =>{
    //   // console.log(elem.business[0].company_name)
    //   console.log(elem)

    // })

    if (postsInView.length > 1 && mounted) {
      const obj = setBBox(postsInView);
      setBox(obj.box);
      setGeo(obj.geo);
    }

    return () => {
      mounted = false;
    };
  }, [postsInView]);

  // useEffect(() => {
  //     let mounted = true;
  //     if (orderedPlaces.length > 1 && mounted) {
  //         let obj = setBBox(orderedPlaces)
  //         setBox(obj.box)
  //         setGeo(obj.geo)
  //     }

  //     return () => {mounted = false};

  // }, [orderedPlaces, maxViewable]);

  useEffect(() => {
    let mounted = true;
    if (mounted && gridMode) {
      const lines = setLinesExt(slotDict);
      setRedLine(lines.red);
      setYellowLine(lines.yellow);
      setOrangeLine(lines.orange);
      setBlueLine(lines.blue);
      setGreenLine(lines.green);
      setVioletLine(lines.violet);
    }
    return () => (mounted = false);
  }, [slotDict]);

  useEffect(() => {
    console.log(" geocode ");
    Geocode.fromLatLng(
      JSON.stringify(draggedLocation.lat),
      JSON.stringify(draggedLocation.lng)
    ).then((response) => {
      const address = response.results[0].formatted_address;
      // console.log(address);
      // "sublocality" "locality"
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          if (
            response.results[0].address_components[i].types[j] === "sublocality"
          ) {
            setSubLocality(response.results[0].address_components[i].long_name);
            console.log(response.results[0].address_components[i].long_name);
          }
        }
      }
    });
  }, [draggedLocation]);

  const getOffset = (map) => {
    const cntr = map.getCenter();
    const _centerCoor = map.project(cntr);
    console.log(_centerCoor);
    const offSetCoor = [_centerCoor.x + 350, _centerCoor.y];
    const offSetLatLng = map.unproject(offSetCoor);
    setDraggedLocation(offSetLatLng);
  };

  const clickHandler = (map, event) => {
    setDraggedLocation(event.lngLat.wrap());
    // let coordinates = event.lnglat.wrap()
    // console.log({ map, event });
    // props.toggle(event)

    if (event.fitboundUpdate) {
      console.log("Map bounds have been programmatically changed - click");
      // console.log(map.getCenter());
    } else {
      // console.log("Map bounds have been changed by user interaction");
      const cntr = map.getCenter();
      const cntrPixel = map.project(cntr);

      // console.log(cntr);
      // setTempCenter(cntr);
      // setDraggedLocation(cntr);

      // get point
      // const clickedXYcoordinate = map.unproject(event.point)

      // get delta between clickedXY
      // deltaX = clickedXY[0] - offsetCenter[0]

      // use delta to add to map.center xy coordinates
      // const _point = map.project(coordinate)
      // console.log("map pixel" + coordinate + " " + JSON.stringify(_point))
      // console.log(offsetCenter)
      // setTempCenter(coordinate);
      // setDraggedLocation(coordinate);
    }
  };

  const dragHandler = (map, event) => {
    // console.log({ map, event });
    // setBox(null)
    getOffset(map);

    if (event.fitboundUpdate) {
      console.log("Map bounds have been changed programmatically  - dragged");
      // console.log(map.getCenter());
    } else {
      // console.log("Map bounds have been changed by user interaction");
      // let cntr = map.getCenter();
      // let cntrPixel = map.project(cntr)
      // getOffset(map)
      // console.log(cntr);
      // setTempCenter(cntr);
      // setDraggedLocation(cntr);
    }
  };

  return (
    // <div className="circleDiv">
    <div>
      <div className="offset-center"></div>
      <Map
        // style='mapbox://styles/kobstr/cj0itw9ku003l2smnu8wbz94o'
        // style='mapbox://styles/kobstr/cka78e4mj1aef1io837hkirap'
        // style ='mapbox://styles/kobstr/cjryb7aiy1xjy1fohrw6z6ow3'
        // style='mapbox://styles/mapbox/streets-v9'
        ref={mapRef}
        // style='mapbox://styles/kobstr/ckyank9on08ld14nuzyhrwddi'
        style="mapbox://styles/kobstr/ckyan5qpn0uxk14pe1ah8qatg"
        pitch={[60]}
        // fitBounds={(boundBox, {padding: {top:'00', bottom:'0', left: '400', right: '5'}})}

        onDragEnd={dragHandler}
        onClick={clickHandler}
        center={tempCenter}
        containerStyle={dimensions}
      >
        <MapContext.Consumer>
          {(map) => {
            // use `map` here
            // console.log("map" + map)
            // const newPosDict = {}
            // orderedPlaces.forEach((place) => {
            // map.easeTo({
            //   padding: padding,
            //   duration: 1000
            // })
            // map.fitBounds(boundBox, {
            //   padding: {top: 0, bottom:0, left: 350, right: 150}
            //   })
            // })
            // map.on('idle', function () {
            //     map.resize()
            //     map.zoom = 15
            // })
          }}
        </MapContext.Consumer>
        {/* {orderedPlaces.map(({ ...otherProps }) => {
                    {/* return (<Layer type="circle" id={otherProps._id} paint={{"circle-radius": 10, "circle-color": otherProps.icon_color}}> */}
        {/* return (<Layer type="circle" id={otherProps._id} paint={{"circle-radius": 10, "circle-color": 'white'}}>
                            <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            </Layer>)
                })} */}
        {/* add colored layers like the lines... */}
        <Layer
          type="circle"
          paint={{ "circle-radius": 8, "circle-color": "white" }}
        >
          {!detailView &&
            postsInView.map(({ ...otherProps }) => (
              <Feature
                key={otherProps._id}
                coordinates={otherProps.businessLocation.coordinates}
              />
            ))}
        </Layer>

        <Layer
          type="line"
          id="red"
          paint={{ "line-width": 10, "line-color": "red" }}
        >
          {redLine ? <Feature key={"line"} coordinates={redLine} /> : null}
        </Layer>
        <Layer
          type="line"
          id="orange"
          paint={{ "line-width": 10, "line-color": "orange" }}
        >
          {orangeLine ? (
            <Feature key={"line"} coordinates={orangeLine} />
          ) : null}
        </Layer>
        <Layer
          type="line"
          id="yellow"
          paint={{ "line-width": 10, "line-color": "yellow" }}
        >
          {yellowLine ? (
            <Feature key={"line"} coordinates={yellowLine} />
          ) : null}
        </Layer>
        <Layer
          type="line"
          id="green"
          paint={{ "line-width": 10, "line-color": "green" }}
        >
          {greenLine ? <Feature key={"line"} coordinates={greenLine} /> : null}
        </Layer>
        <Layer
          type="line"
          id="blue"
          paint={{ "line-width": 10, "line-color": "blue" }}
        >
          {blueLine ? <Feature key={"line"} coordinates={blueLine} /> : null}
        </Layer>
        <Layer
          type="line"
          id="violet"
          paint={{ "line-width": 10, "line-color": "violet" }}
        >
          {violetLine ? (
            <Feature key={"line"} coordinates={violetLine} />
          ) : null}
        </Layer>
        <Layer
          type="circle"
          id="selectedPlace_id"
          paint={{
            "circle-radius": 9,
            "circle-opacity": 1,
            "circle-color": "#0BDD13",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ff0000",
          }}
        >
          {selectedPlace && selectedPlace.businessLocation && (
            <Feature coordinates={selectedPlace.businessLocation.coordinates} />
          )}
        </Layer>
        <Layer
          type="circle"
          id="draggedLocation"
          paint={{
            "circle-radius": 6,
            "circle-opacity": 1,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ff0000",
          }}
        >
          {draggedLocation && (
            <Feature coordinates={[draggedLocation.lng, draggedLocation.lat]} />
          )}
        </Layer>
      </Map>
    </div>
  );
};

export default MapView;

// const setLines = (dict) => {
//     let centerWhite = dict["0-0-0"]
//     let topRed = dict["0--1-1"]
//     let topRightOrange = dict["1--1-0"]
//     let bottomRightYellow = dict["1-0--1"]
//     let bottomGreen = dict["0-1--1"]
//     let bottomLeftBlue = dict["-1-1-0"]
//     let topLeftViolet = dict["-1-0-1"]

//     if (centerWhite) {
//         if (topRed) {
//             setRedLine([centerWhite.businessLocation.coordinates, topRed.businessLocation.coordinates])
//         } else {
//             setRedLine(null)
//         }

//         if (topRightOrange) {
//             setOrangeLine([centerWhite.businessLocation.coordinates, topRightOrange.businessLocation.coordinates])
//         } else {
//             setOrangeLine(null)
//         }

//         if (bottomRightYellow) {
//             setYellowLine([centerWhite.businessLocation.coordinates, bottomRightYellow.businessLocation.coordinates])
//         } else {
//             setYellowLine(null)
//         }

//         if (bottomGreen) {
//             setGreenLine([centerWhite.businessLocation.coordinates, bottomGreen.businessLocation.coordinates])
//         } else {
//             setGreenLine(null)
//         }

//         if (bottomLeftBlue) {
//             setBlueLine([centerWhite.businessLocation.coordinates, bottomLeftBlue.businessLocation.coordinates])
//         } else {
//             setBlueLine(null)
//         }

//         if (topLeftViolet) {
//             setVioletLine([centerWhite.businessLocation.coordinates, topLeftViolet.businessLocation.coordinates])
//         } else {
//             setVioletLine(null)
//         }
//     } else {
//         setRedLine(null)
//         setOrangeLine(null)
//         setYellowLine(null)
//         setGreenLine(null)
//         setBlueLine(null)
//         setVioletLine(null)
//     }
// }
