import React, { Component, useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import ReactMapboxGl, {
  Layer,
  Source,
  Feature,
  MapContext,
} from "react-mapbox-gl";
import useStore from "../useState/index";
import "./styles.css";
import Geocode from "react-geocode";
import GoogleMapReact from "google-map-react";
import ColorDict from '../GridComponents/functions/colorSlotDict'

// import '../../App.css';

import * as turf from "@turf/turf";
import { connect } from "react-redux";

// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js

// https://alex3165.github.io/react-mapbox-gl/demos

function distance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    // if (unit=="K") { dist = dist * 1.609344 }
    // if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}




// function orderPlaces(places, selectedPlace, defaultCenter) {

//     let center = {}
//     if (selectedPlace) {
//         center.lat = selectedPlace.businessLocation.coordinates[1]
//         center.lng = selectedPlace.businessLocation.coordinates[0]
//     } else {
//         center = defaultCenter
//     }

//     places.sort(function (a, b) {
//         let distA = distance(a.businessLocation.coordinates[1], a.businessLocation.coordinates[0], center.lat, center.lng)
//         let distB = distance(b.businessLocation.coordinates[1], b.businessLocation.coordinates[0], center.lat, center.lng)
//         return distA - distB
//     })

//     return places

// }

const setBBox = (_orderedPlaces) => {
    let maxViewable = 10
    let coordArray = [];
    var limit = 10;
    if (_orderedPlaces.length < limit) {
      limit = _orderedPlaces.length - 1;
    }
    if (maxViewable) {
      limit = maxViewable;
    }
    console.log("ordered places " + _orderedPlaces.length);

    for (let i = 0; i < limit; i++) {
      // console.log(i)
      // console.log(orderedPlaces[i])
      if (_orderedPlaces[i]) {
        let coords = _orderedPlaces[i].businessLocation.coordinates;
        coordArray.push(coords);
      }
    }

    // console.log("coord array  " + coordArray)
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

    let lngLatBox = turf.bbox(geoJsonFeatures);
    let sw = [lngLatBox[0], lngLatBox[1]];
    let ne = [lngLatBox[2], lngLatBox[3]];
    let fitBoundsObj = [sw, ne];
    return fitBoundsObj
    // setBox(fitboundsObj);
};


const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: true,
});

Geocode.setApiKey("AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q");

const MapView = (props) => {

    const [boundBox, setBox] = useState(null)
    const [lineArray, setLineArray] = useState([])
    const [hex, setHex] = useState()
    const [features, setFeatures] = useState(null)
    const [places_center, setPlaces_center] = useState([])
    const [placesOuter, setPlacesOuter] = useState([])
    const [places_0, setPlaces_0] = useState()
    const [places_1, setPlaces_1] = useState()
    const [places_2, setPlaces_2] = useState()
    const [places_3, setPlaces_3] = useState()
    const [places_4, setPlaces_4] = useState()
    const [places_5, setPlaces_5] = useState()
    const [places_6, setPlaces_6] = useState()

    const [redLine, setRedLine] = useState(null)
    const [orangeLine, setOrangeLine] = useState(null)
    const [yellowLine, setYellowLine] = useState(null)
    const [greenLine, setGreenLine] = useState(null)
    const [blueLine, setBlueLine] = useState(null)
    const [violetLine, setVioletLine] = useState(null)
   
    const [tempCenter, setTempCenter] = useState()
    // const [sublocality, setSubLocality] = useState("")
    // const [city, setCity] = useState("")
    const _colorDict = ColorDict()

    
    const places = useStore(state => state.places)
    const selectedPlace = useStore(state => state.selectedPlace)
    const centerPlace = useStore(state => state.centerPlace)
    const multiDictSub = useStore(state => state.multiDict)
    const orderedPlaces = useStore(state => state.orderedPlaces)
    const slotDict = useStore(state => state.placeCoordDict)
    const maxViewable = useStore(state => state.maxViewable)
    const setPosDict = useStore(state => state.setMapPosDict)
    const gridMode = useStore(state => state.gridMode)
    const setSubLocality = useStore(state => state.setSublocality)
    const setCity = useStore(state => state.setCity)


    const setDraggedLocation = useStore(state => state.setDraggedLocation)
    const draggedLocation = useStore(state => state.draggedLocation)

    const gridContainerStyle = {
        // height: '100vh',
        // width: '100%'
        height: '100vh',
        width: '100vw',
        borderRadius: '5%'
    }

    
    const mapContainerStyle = {
    // height: '100vh',
    // width: '100%',
      height: "100vh",
     width: "60vw",
     borderRadius: "10%",
    };

  const [dimensions, setDimensions] = useState(mapContainerStyle);

  // only use if not using second map
  useMemo(() => {
    console.log("map view toggle");
    if (gridMode) {
      console.log("gridView true");
      setDimensions(gridContainerStyle);
      // Map.resize()
      // ReCenter()
    } else {
      console.log("gridView false");
      setDimensions(mapContainerStyle);
      // Map.resize()
      // ReCenter()
    }
  }, [gridMode]);

//   useEffect(() => {
//     console.log("reading selected place from mapview");

//     if (selectedPlace) {
//       // console.log(selectedPlace)
//     //   setGridView(false);
//     }
//   }, [selectedPlace]);






    const setLines = (dict) => {
        let centerWhite = dict["0-0-0"]
        let topRed = dict["0--1-1"]
        let topRightOrange = dict["1--1-0"]
        let bottomRightYellow = dict["1-0--1"]
        let bottomGreen = dict["0-1--1"]
        let bottomLeftBlue = dict["-1-1-0"]
        let topLeftViolet = dict["-1-0-1"]

        if (centerWhite) {
            if (topRed) {
                setRedLine([centerWhite.businessLocation.coordinates, topRed.businessLocation.coordinates])
            } else {
                setRedLine(null)
            }

            if (topRightOrange) {
                setOrangeLine([centerWhite.businessLocation.coordinates, topRightOrange.businessLocation.coordinates])
            } else {
                setOrangeLine(null)
            }

            if (bottomRightYellow) {
                setYellowLine([centerWhite.businessLocation.coordinates, bottomRightYellow.businessLocation.coordinates])
            } else {
                setYellowLine(null)
            }

            if (bottomGreen) {
                setGreenLine([centerWhite.businessLocation.coordinates, bottomGreen.businessLocation.coordinates])
            } else {
                setGreenLine(null)
            }

            if (bottomLeftBlue) {
                setBlueLine([centerWhite.businessLocation.coordinates, bottomLeftBlue.businessLocation.coordinates])
            } else {
                setBlueLine(null)
            }

            if (topLeftViolet) {
                setVioletLine([centerWhite.businessLocation.coordinates, topLeftViolet.businessLocation.coordinates])
            } else {
                setVioletLine(null)
            }
        } else {
            setRedLine(null)
            setOrangeLine(null)
            setYellowLine(null)
            setGreenLine(null)
            setBlueLine(null)
            setVioletLine(null)
        }

    }



    useEffect(() => {
        let mounted = true;
        if (orderedPlaces.length > 1 && mounted) {
            let obj = setBBox(orderedPlaces)
            setBox(obj)
        }
        return () => mounted = false;
    }, [orderedPlaces, maxViewable]);


    useEffect(() => {
        let mounted = true;
        if (mounted && gridMode) {
            setLines(slotDict)
        }
        return () => mounted = false;
    }, [slotDict]);






      useEffect(() => {
        console.log(" geocode ");
        Geocode.fromLatLng(
          JSON.stringify(draggedLocation.lat),
          JSON.stringify(draggedLocation.lng)
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            console.log(address);
            // "sublocality" "locality"
            for (let i = 0; i < response.results[0].address_components.length; i++) {
              for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                if (response.results[0].address_components[i].types[j] ==="sublocality") {
                  setSubLocality(response.results[0].address_components[i].long_name);
                  console.log(response.results[0].address_components[i].long_name);
                }}}
          })}, [draggedLocation])   

  const clickHandler = (map, event) => {
    console.log("map clicked");
    // let coordinates = event.lnglat.wrap()
    console.log({ map, event });
    // props.toggle(event)
    if (event.fitboundUpdate) {
      console.log("Map bounds have been programmatically changed");
      console.log(map.getCenter());
    } else {
      console.log("Map bounds have been changed by user interaction");
      let cntr = map.getCenter();
      console.log(cntr);
      setTempCenter(cntr);
      setDraggedLocation(cntr);
    }
  };

  const dragHandler = (map, event) => {
    console.log({ map, event });
    if (event.fitboundUpdate) {
      console.log("Map bounds have been programmatically changed");
      console.log(map.getCenter());
    } else {
      console.log("Map bounds have been changed by user interaction");
      let cntr = map.getCenter();
      console.log(cntr);
      setTempCenter(cntr);
      setDraggedLocation(cntr);
    }
  }







    return (
        // <div className="circleDiv">
        <div className="map-container">
            <Map
                // style='mapbox://styles/kobstr/cj0itw9ku003l2smnu8wbz94o'
                // style='mapbox://styles/kobstr/cka78e4mj1aef1io837hkirap'
                // style ='mapbox://styles/kobstr/cjryb7aiy1xjy1fohrw6z6ow3'
                // style='mapbox://styles/mapbox/streets-v9'
                style='mapbox://styles/kobstr/ckyank9on08ld14nuzyhrwddi'
                pitch={[60]}
                fitBounds={boundBox}
                onDragEnd={dragHandler}
                onClick={clickHandler}
                containerStyle={dimensions}>

                <MapContext.Consumer>
                    {(map) => {
                        // use `map` here
                        // console.log("map" + map)
                        const newPosDict = {}

                        // orderedPlaces.forEach((place) => {
                        //     // console.log(place.businessLocation.coordinates + "inside map")
                        //     let pix = map.project(place.businessLocation.coordinates)
                        //     // console.log(pix)
                        //     // console.log("-----------")
                        //     let obj = { pos: pix, name: place.company_name }
                        //     // obj._id = place._id
                        //     // obj.mapPos = pix
                        //     newPosDict[place._id] = obj

                        // })
                
                        map.on('idle', function () {
                            map.resize()
                            map.zoom = 15
                        })
                    }}

                </MapContext.Consumer>


                {orderedPlaces.map(({ ...otherProps }) => {
                    return <Layer type="circle" id={otherProps._id} paint={{"circle-radius": 10, "circle-color": otherProps.icon_color}}>
                            <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            </Layer>
                })}

                {/* <GeoJSONLayer  paint={{"line-color": "white", "line-width": 4, "line-opacity": 1}} data={hex} /> */}



                <Layer type="line" id='violet' paint={{"line-width": 10, "line-color": 'red'}}>
                     {lineArray ? <Feature key={"line"} coordinates={lineArray} /> : null}
                 </Layer>

                 <Layer type="line" id='red' paint={{"line-width": 10, "line-color": 'red'}}>
                     {redLine ? <Feature key={"line"} coordinates={redLine} /> : null}
                 </Layer>

                 <Layer type="line" id='orange' paint={{"line-width": 10, "line-color": 'orange'}}>
                     {orangeLine ? <Feature key={"line"} coordinates={orangeLine} /> : null}
                 </Layer>

                 <Layer type="line" id='yellow' paint={{"line-width": 10, "line-color": 'yellow'}}>
                     {yellowLine ? <Feature key={"line"} coordinates={yellowLine} /> : null}
                 </Layer>

                 <Layer type="line" id='green' paint={{"line-width": 10, "line-color": 'green'}}>
                     {greenLine ? <Feature key={"line"} coordinates={greenLine} /> : null}
                 </Layer>

                 <Layer type="line" id='blue' paint={{"line-width": 10, "line-color": 'blue'}}>
                     {blueLine ? <Feature key={"line"} coordinates={blueLine} /> : null}
                 </Layer>

                 <Layer type="line" id='violet' paint={{"line-width": 10, "line-color": 'violet'}}>
                     {violetLine ? <Feature key={"line"} coordinates={violetLine} /> : null}
                 </Layer>



                {selectedPlace && selectedPlace.businessLocation && <Layer type="circle" id="selectedPlace_id" paint={{
                    "circle-radius": 20,
                    "circle-opacity": 0,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#ff0000"
                }}>
                    <Feature coordinates={selectedPlace.businessLocation.coordinates} />
                </Layer>}


                {draggedLocation && <Layer type="circle" id="draggedLocation" paint={{
                    "circle-radius": 10,
                    "circle-opacity": 1,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ff0000"
                }}>
                    <Feature coordinates={[draggedLocation.lng, draggedLocation.lat]} />
                </Layer>}
                

            </Map>
        </div>
    )

}





export default MapView
