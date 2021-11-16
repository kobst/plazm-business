import React, { Component, useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import ReactMapboxGl, { Layer, Source, Feature, MapContext } from "react-mapbox-gl";
import useStore from '../useState/index'


// import '../../App.css';


import * as turf from '@turf/turf'
import { connect } from 'react-redux'

// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js

// https://alex3165.github.io/react-mapbox-gl/demos

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        // if (unit=="K") { dist = dist * 1.609344 }
        // if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}



function orderPlaces(places, selectedPlace, defaultCenter) {

    let center = {}
    if (selectedPlace) {
        center.lat = selectedPlace.businessLocation.coordinates[1]
        center.lng = selectedPlace.businessLocation.coordinates[0]
    } else {
        center = defaultCenter
    }

    places.sort(function (a, b) {
        let distA = distance(a.businessLocation.coordinates[1], a.businessLocation.coordinates[0], center.lat, center.lng)
        let distB = distance(b.businessLocation.coordinates[1], b.businessLocation.coordinates[0], center.lat, center.lng)
        return distA - distB
    })

    return places

}


const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: true
});

const MapView = (props) => {

    const [boundBox, setBox] = useState(null)
    const [features, setFeatures] = useState(null)
    const [places_center, setPlaces_center] = useState([])
    const [places_0, setPlaces_0] = useState([])
    const [places_1, setPlaces_1] = useState([])
    const [places_2, setPlaces_2] = useState([])

    const places = useStore(state => state.places)
    const selectedPlace = useStore(state => state.selectedPlace)
    const multiDictSub = useStore(state => state.multiDict)
    const orderedPlaces = useStore(state => state.orderedPlaces)
    const maxViewable = useStore(state => state.maxViewable)
    const setPosDict = useStore(state => state.setMapPosDict)
    const gridView = useStore(state => state.gridView)

    const gridContainerStyle = {
        // height: '100vh',
        // width: '100%'
        height: '66vh',
        width: '33vw',
        borderRadius: '10%'
    }

    const mapContainerStyle = {
        // height: '100vh',
        // width: '100%',
        height: '800px',
        width: '1200px',
        borderRadius: '10%'
    }

    const [dimensions, setDimensions] = useState(gridContainerStyle)


    useEffect(() => {
        let mounted = true;
        if (orderedPlaces.length > 1 && mounted) {
            let coordArray = []
            var limit = 10
            if (orderedPlaces.length < limit) {
                limit = orderedPlaces.length - 1
            }
            if (maxViewable) {
                limit = maxViewable
            }
            console.log("ordered places " + orderedPlaces.length)

            for (let i = 0; i < limit; i++) {
                // console.log(i)
                // console.log(orderedPlaces[i])
                if (orderedPlaces[i]) {
                    let coords = orderedPlaces[i].businessLocation.coordinates
                    coordArray.push(coords)
                }

            }


            // console.log("coord array  " + coordArray)
            const geoJsonFeatures = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: [coordArray]
                    }
                }]
            }

            let lngLatBox = turf.bbox(geoJsonFeatures);
            // console.log('lngLatBox', lngLatBox)
            let sw = [lngLatBox[0], lngLatBox[1]]
            let ne = [lngLatBox[2], lngLatBox[3]]
            let fitboundsObj = [sw, ne]
            setBox(fitboundsObj)

        }
        return () => mounted = false;
    }, [orderedPlaces, maxViewable]);



    // only use if not using second map
    useMemo(() => {
        console.log(props.gridMode + 'map view toggle')
        if (gridView) {
            setDimensions(gridContainerStyle)
            // Map.resize()
            // ReCenter()

        } else {
            setDimensions(mapContainerStyle)
            // Map.resize()
            // ReCenter()

        }
    }, [gridView])




    const clickHandler = (event) => {
        console.log("map clicked")
        // let coordinates = event.lnglat.wrap()
        console.log(event)
        // props.toggle(event)
    }




    useEffect(() => {
        // console.log("- - multi effect - - ")
        let mounted = true;
        let places_0 = []
        let places_1 = []
        let places_2 = []
        let places_center = []
        places.forEach((element) => {

            let obj = multiDictSub[element._id]
            if (obj) {
                let posVector = obj.posVector[2]
                if (posVector < -2) {
                    places_2.push(element)
                } else if (posVector < -1) {
                    places_1.push(element)
                } else if (posVector < 0) {
                    places_0.push(element)
                } else if (posVector < 1) {
                    places_center.push(element)
                }
            }
        })
        setPlaces_center(places_center)
        setPlaces_0(places_0)
        setPlaces_1(places_1)
        setPlaces_2(places_2)
        return () => mounted = false;
    }, [multiDictSub])




    return (
        // <div className="circleDiv">
        <div>
            <Map
                style='mapbox://styles/kobstr/cj0itw9ku003l2smnu8wbz94o'
                // style='mapbox://styles/mapbox/streets-v9'
                pitch={[60]}
                fitBounds={boundBox}

                onClick={clickHandler}
                containerStyle={dimensions}>

                <MapContext.Consumer>
                    {(map) => {
                        // use `map` here
                        // console.log("map" + map)
                        const newPosDict = {}

                        orderedPlaces.forEach((place) => {
                            // console.log(place.businessLocation.coordinates + "inside map")
                            let pix = map.project(place.businessLocation.coordinates)
                            // console.log(pix)
                            // console.log("-----------")
                            let obj = { pos: pix, name: place.company_name }
                            // obj._id = place._id
                            // obj.mapPos = pix
                            newPosDict[place._id] = obj

                        })
                        // console.log("map positions")
                        // console.log(newPosDict)

                        map.on('idle', function () {
                            map.resize()
                            map.zoom = 15
                        })
                    }}

                </MapContext.Consumer>



                {selectedPlace && <Layer type="circle" id="location_id" paint={{
                    "circle-radius": 20,
                    "circle-color": "#ff0000"
                }}>
                    <Feature coordinates={[props.center.lat, props.center.lng]} />
                </Layer>
                }



                {gridView &&
                    <>
                        <Layer type="circle" id="layer_id_0" paint={{
                            "circle-radius": 10,
                            "circle-color": "yellow"
                        }}>
                            {places_0.map(({ ...otherProps }) => {
                                return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            })}
                        </Layer>
                        <Layer type="circle" id="layer_id_1" paint={{
                            "circle-radius": 10,
                            "circle-color": "magenta"
                        }}>
                            {places_1.map(({ ...otherProps }) => {

                                return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            })}
                        </Layer>
                        <Layer type="circle" id="layer_id_2" paint={{
                            "circle-radius": 10,
                            "circle-color": "blue"
                        }}>
                            {places_2.map(({ ...otherProps }) => {


                                return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            })}
                        </Layer>
                        <Layer type="circle" id="layer_id_3" paint={{
                            "circle-radius": 10,
                            "circle-color": "red"
                        }}>
                            {places_center.map(({ ...otherProps }) => {

                                return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                            })}
                        </Layer>
                    </>
                }





                {/* <Layer type="circle" id="layer_id" paint={{
                    "circle-radius": 10,
                    "circle-color": "green"
                }}>
                    {places_1.map(({ ...otherProps }) => {
                        return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                    })}
                </Layer> */}



                {selectedPlace && <Layer type="circle" id="selectedPlace_id" paint={{
                    "circle-radius": 20,
                    "circle-opacity": 0,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#ff0000"
                }}>
                    <Feature coordinates={selectedPlace.businessLocation.coordinates} />
                </Layer>
                }

            </Map>
        </div>
    )



}





export default MapView

