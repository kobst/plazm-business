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
import { LinearMipMapNearestFilter } from "three";

// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js

// https://alex3165.github.io/react-mapbox-gl/demos

https://medium.com/critigenopensource/an-approach-to-integrating-mapboxgl-in-react-redux-b50d82bc0ed0


const setLinesExt = (dict) => {
    let centerWhite = dict["0-0-0"]
    let topRed = dict["0--1-1"]
    let topRightOrange = dict["1--1-0"]
    let bottomRightYellow = dict["1-0--1"]
    let bottomGreen = dict["0-1--1"]
    let bottomLeftBlue = dict["-1-1-0"]
    let topLeftViolet = dict["-1-0-1"]
    let redLine, orangeLine, yellowLine, greenLine, blueLine, violetLine

    if (centerWhite) {
        if (topRed) {
            redLine = [centerWhite.businessLocation.coordinates, topRed.businessLocation.coordinates]
        } else {
           redLine = null
        }

        if (topRightOrange) {
            orangeLine = [centerWhite.businessLocation.coordinates, topRightOrange.businessLocation.coordinates]
        } else {
            orangeLine = null
        }

        if (bottomRightYellow) {
            yellow = [centerWhite.businessLocation.coordinates, bottomRightYellow.businessLocation.coordinates]
        } else {
            yellowLine = null
        }

        if (bottomGreen) {
            greenLine = [centerWhite.businessLocation.coordinates, bottomGreen.businessLocation.coordinates]
        } else {
            greenLine = null
        }

        if (bottomLeftBlue) {
            blueLine = [centerWhite.businessLocation.coordinates, bottomLeftBlue.businessLocation.coordinates]
        } else {
            blueLine = null
        }

        if (topLeftViolet) {
            violetLine = [centerWhite.businessLocation.coordinates, topLeftViolet.businessLocation.coordinates]
        } else {
            violetLine = null
        }
    } else {
        redLine, blueLine, yellowLine, greenLine, violetLine, orangeLine = null
    }

    return {red: redLine, orange: orangeLine, yellow: yellowLine, blue: blueLine, green: greenLine, violet: violetLine}

}





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
    
    for (let i = 0; i < limit; i++) {
      if (_orderedPlaces[i]) {
        let coords = _orderedPlaces[i].businessLocation.coordinates;
        coordArray.push(coords);
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

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const MapViewHooks = (props) => {

    const mapRef= useRef()
    const mapContainer = useRef(null);
    const [boundBox, setBox] = useState([[-73.9876, 40.7661], [-73.9397, 40.8002]])
    const [map, setMap] = useState()
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
    const userLocation = useStore(state => state.userLocation)
    const [tempCenter, setTempCenter] = useState([userLocation.lng, userLocation.lat])


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
  useEffect(() => {
    if (gridMode) {
      setDimensions(gridContainerStyle);
    } else {
      setDimensions(mapContainerStyle);
    }
  }, [gridMode]);


//   useEffect(() => {
//     if (mapRef.current) return; 
//     mapRef.current = new mapboxgl.Map({
//     container: mapContainer.current,
//     style:'mapbox://styles/kobstr/ckyank9on08ld14nuzyhrwddi',
//     center: tempCenter,
//     zoom: zoom,
//     pitch: [60],
//     fitBounds: boundBox,
//     onDragEnd: dragHandler,
//     onClick: clickHandler
//     });
//   });

  useEffect(()=>{
    const map = new mapboxgl.Map({
        container: mapContainer.current,
        style:'mapbox://styles/kobstr/ckyank9on08ld14nuzyhrwddi',
        center: tempCenter,
        zoom: zoom,
        pitch: [60],
        fitBounds: boundBox,
        onDragEnd: dragHandler,
        onClick: clickHandler
      });

      setMap(map)


        return () => map.remove();
  }, [])


    useEffect(() => {
        let mounted = true;
        if (orderedPlaces.length > 1 && mounted) {
            let obj = setBBox(orderedPlaces)
            setBox(obj)
        }

        map.fitBounds = obj

        // add orderedPlaces as geoJsonFeatures array


        return () => mounted = false;
    }, [orderedPlaces, maxViewable]);

    useEffect(()=>{

        map.addSource('places', {
            type: 'geojson',
            data
          });

        // {orderedPlaces.map(({ ...otherProps }) => {
        //     return (
        //         map.addLayer({

        //         })
        //     )
            
            // (<Layer type="circle" id={otherProps._id} paint={{"circle-radius": 10, "circle-color": otherProps.icon_color}}>
            //         <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
            //         </Layer>)
        // })}

    }, [orderedPlaces])


    useEffect(() => {
        let mounted = true;
        if (mounted && gridMode && map) {
            let lines = setLinesExt(slotDict)
            setRedLine(lines.red)
            setYellowLine(lines.yellow)
            setOrangeLine(lines.orange)
            setBlueLine(lines.blue)
            setGreenLine(lines.green)
            setVioletLine(lines.violet)
            map.addLayer(

            )
        }
        return () => mounted = false;
    }, [slotDict]);

    useEffect(() => {
        Geocode.fromLatLng(
          JSON.stringify(draggedLocation.lat),
          JSON.stringify(draggedLocation.lng)
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            // "sublocality" "locality"
            for (let i = 0; i < response.results[0].address_components.length; i++) {
              for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                if (response.results[0].address_components[i].types[j] ==="sublocality") {
                  setSubLocality(response.results[0].address_components[i].long_name);
                }}}
          })}, [draggedLocation])   

  
  
const clickHandler = (event) => {
    if (map) {
        if (event.fitboundUpdate) {
            mapRef.getCenter();
          } else {
            let cntr = mapRef.getCenter();
            setTempCenter(cntr);
            setDraggedLocation(cntr);
          }
    }
  };

  const dragHandler = (event) => {
    if (map) {    
        if (event.fitboundUpdate) {
            mapRef.getCenter();
        } else {
      let cntr = mapRef.getCenter();
      setTempCenter(cntr);
      setDraggedLocation(cntr);
    }
    }
  }


    return ( 
        <div ref={mapContainer} className="map-container">
        </div>
    )

}



export default MapViewHooks




