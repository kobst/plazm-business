import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
// import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
// import * as THREE from 'three';
// import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
// import { OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";
import { AssignMolecularDict, AssignHexDict,  _createXYZ } from './functions/index'


// import GridThreeJS from './GridThree'
// import RadarView from './RadarView'

import MapView from './mapView/index';
import RadarView from './radarView/radarView'
import GridView from './gridView/gridView'
import useStore from './useState/index'

import './style.css';

const GridContainer = () => {

    // const dispatch = useDispatch()
    // const userLists = useSelector((state) => state.list.userLists);

    const feedData = useSelector((state) => state.myFeed.myFeed);

    const [draggedCenter, setDraggedCenter] = useState({
        lat: JSON.stringify(process.env.REACT_APP_LATITUDE),
        lng: JSON.stringify(process.env.REACT_APP_LONGITUDE)
    })
 
    const [placesLoading, setPlacesLoading] = useState(true)


    const gridView = useStore((state) => state.gridView)

    const places = useStore((state) => state.places)
    const setPlaces = useStore((state) => state.setPlaces)
    
    const cameraPos = useStore((state) => state.camPosition)
    const setCamPos = useStore((state) => state.setCamPosition)

    const setCenterPlace = useStore((state) => state.setCenterPlace)
    const centerPlace = useStore((state) => state.centerPlace)

    const multiDict = useStore((state) => state.multiDict)
    const setMultiDict = useStore((state) => state.setMultiDict)
    const orderedPlaces = useStore((state) => state.orderedPlaces)
    const setOrderedPlaces = useStore((state) => state.setOrderedPlaces)
    const placeCoordDict = useStore((state) => state.placeCoordDict)
    const setPlaceCoordDict = useStore((state) => state.setPlaceCoordDict)
   
    const selectedPlace = useStore((state) => state.selectPlace)
    const setSelectedPlace = useStore((state) => state.setSelectedPlace)

    const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition)
    const setDisplacedCenterHexPosition = useStore((state) => state.setDisplacedCenterHexPosition)


// should I put Re-Center Here?

    useEffect(() => {
        let _places = []
        console.log("getting feed data")
        feedData.forEach(element => {
            let deepClone = JSON.parse(JSON.stringify(element));
            if (!deepClone.businessLocation && deepClone.location) {
                deepClone.businessLocation = deepClone.location
            }
            console.log(deepClone)
            _places.push(deepClone)
        });
        setPlacesLoading(false)
        setPlaces(_places)

    }, [feedData])


    // call Recenter 

    //on setting places
    useEffect(() => {
        console.log("initial props places")
        ReCenter(null)
    }, [places])

    // on shifting centerPlace..
    useEffect(() => {
        if (centerPlace) {
            console.log("new center " + centerPlace.company_name)
            // adjustZ(centerPlace)
        }
        let timer1 = setTimeout(() => ReCenter(centerPlace), 2000);
        // this will clear Timeout when component unmount like in willComponentUnmount
        return () => {
            clearTimeout(timer1);
        };
    }, [centerPlace]);




    const resetCenter = (newCenter) => {
        console.log('new center from passed' + newCenter)
        // setDraggedCenter(newCenter)
    }

    const showPreview = (place) => {
        console.log('show preview' + place)
    }

    const setSelectPlace = (place) => {
        console.log('select Place' + place)
    }


    const ReCenter = (place) => {
        //props.selectPlace(place)
        console.log("Recenter  -   " + place)
        let limit = 20
        const tilt = 10
        let _orderedPlaces
        let _multiDict
        let limitedOrderedPlaces
        let _vect = [0, 0, 0]
        if (place) {
            console.log("----place---" + place.company_name)
            // props.selectPlace(place)

            // all in one
            // const { _orderedPlacesResponse, _slotDictResponse, _multiDictResponse } = AssignMolecularDict(places, props.center, place)
            const { _orderedPlacesResponse, _slotDictResponse, _multiDictResponse } = AssignHexDict(places, draggedCenter, place)

            if (_orderedPlacesResponse.length < limit) {
                limit = _orderedPlacesResponse.length
            }
            limitedOrderedPlaces = _orderedPlacesResponse.slice(0, limit - 1)
            setOrderedPlaces(limitedOrderedPlaces)
            setMultiDict(_multiDictResponse)
            setPlaceCoordDict(_slotDictResponse)
            setDisplacedCenterHexPosition([0, 0, 0])
            setCamPos([0, 0, 5])

        } else {
            console.log("no center place")
            if (places.length > 0) {
                console.log(places.length + " length ---")
                // all in one
                // const { _orderedPlacesResponse, _slotDictResponse, _multiDictResponse } = AssignMolecularDict(props.places, props.center)
                const { _orderedPlacesResponse, _slotDictResponse, _multiDictResponse } = AssignHexDict(places, draggedCenter, place)


                if (_orderedPlacesResponse.length < limit) {
                    limit = _orderedPlacesResponse.length
                }
                limitedOrderedPlaces = _orderedPlacesResponse.slice(0, limit)
                setOrderedPlaces(limitedOrderedPlaces)
                setMultiDict(_multiDictResponse)
                setPlaceCoordDict(_slotDictResponse)
                setDisplacedCenterHexPosition([0, 0, 0])
                setCamPos([0, 0, 5])

                

            } else {
                console.log(" nooooo place")
            }
        }
    }





    return (
        <div>
              <container className="grid-container-small">
                 <GridView center={draggedCenter} places={places} selectPlace={setSelectPlace} hovering={showPreview} />
            </container>

            <div className="radar-container">
                <RadarView />
            </div> 

            {/* {gridView ? <div className="map-overlay"></div> : <div className="map-overlay-large"></div>} */}
            <div className="map-container">
                <MapView gridMode={gridView} />
            </div> 
        </div >
    )
}

export default GridContainer