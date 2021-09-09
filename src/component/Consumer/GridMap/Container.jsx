

import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import { OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";


import MapView from './MapView';
import GridThreeJS from './GridThree'
import RadarView from './RadarView'
import useStore from './useState'

import './style.css';

const GridContainer = () => {

    // const dispatch = useDispatch()
    // const userLists = useSelector((state) => state.list.userLists);


    const feedData = useSelector((state) => state.myFeed.myFeed);

    const [draggedCenter, setDraggedCenter] = useState({
        lat: JSON.stringify(process.env.REACT_APP_LATITUDE),
        lng: JSON.stringify(process.env.REACT_APP_LONGITUDE)
    })
    const [places, setPlaces] = useState([])
    const [placesLoading, setPlacesLoading] = useState(true)
    const [selectedPlace, setSelectedPlace] = useState(null)


    const gridView = useStore((state) => state.gridView)

    // const places = useStore((state) => state.places)
    // const setPlaces = useStore((state) => state.setPlaces)



    useEffect(() => {
        let _places = []
        feedData.forEach(element => {
            let deepClone = JSON.parse(JSON.stringify(element));
            deepClone.defaultForm = true;
            let _lat = 40.7303033 + Math.random()
            let _lng = -73.9839626 + Math.random()
            let _location = { type: "point", coordinates: [_lng, _lat] }
            deepClone.location = _location
            console.log(deepClone)
            _places.push(deepClone)
        });
        setPlacesLoading(false)
        setPlaces(_places)

    }, [feedData])


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



    return (
        <div>
            <container className="grid-container">
                {placesLoading ? <h2>LOADING PLACES</h2> : <GridThreeJS center={draggedCenter} places={places} selectPlace={setSelectPlace} hovering={showPreview} />}
            </container>

            <div className="radar-container">
                <RadarView places={places} />
            </div>

            {gridView ? <div className="map-overlay"></div> : <div className="map-overlay-large"></div>}
            <div className="map-container">
                <MapView center={draggedCenter} places={places} resetCenter={resetCenter} selectedPlace={selectedPlace} gridMode={gridView} />
            </div>
        </div >
    )
}

export default GridContainer
