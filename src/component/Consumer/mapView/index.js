import React, {useState, useEffect, useMemo} from 'react';
import ReactMapboxGl, {Layer, Feature, MapContext} from 'react-mapbox-gl';
import useStore from '../useState/index';
import './styles.css';
import Geocode from 'react-geocode';

import * as turf from '@turf/turf';

// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js

// https://alex3165.github.io/react-mapbox-gl/demos

// eslint-disable-next-line new-cap
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: true,
});

Geocode.setApiKey('AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q');

const MapView = () => {
  const [boundBox, setBox] = useState(null);
  const [placesCenter, setPlacesCenter] = useState([]);
  const [places0, setPlaces0] = useState([]);
  const [places1, setPlaces1] = useState([]);
  const [places2, setPlaces2] = useState([]);

  const places = useStore((state) => state.places);
  const selectedPlace = useStore((state) => state.selectedPlace);
  const multiDictSub = useStore((state) => state.multiDict);
  const orderedPlaces = useStore((state) => state.orderedPlaces);
  const maxViewable = useStore((state) => state.maxViewable);
  const gridView = useStore((state) => state.gridView);
  const setGridView = useStore((state) => state.setGridView);
  const setSubLocality = useStore((state) => state.setSublocality);
  const setCity = useStore((state) => state.setCity);

  const setDraggedLocation = useStore((state) => state.setDraggedLocation);
  const draggedLocation = useStore((state) => state.draggedLocation);

  const gridContainerStyle = {
    // height: '100vh',
    // width: '100%'
    height: '100vh',
    width: '50vw',
    borderRadius: '10%',
  };

  const mapContainerStyle = {
    // height: '100vh',
    // width: '100%',
    height: '80vh',
    width: '40vw',
    borderRadius: '10%',
  };

  const [dimensions, setDimensions] = useState(gridContainerStyle);

  const setBBox = () => {
    const coordArray = [];
    let limit = 10;
    if (orderedPlaces.length < limit) {
      limit = orderedPlaces.length - 1;
    }
    if (maxViewable) {
      limit = maxViewable;
    }
    // console.log("ordered places " + orderedPlaces.length);

    for (let i = 0; i < limit; i++) {
      // console.log(i)
      // console.log(orderedPlaces[i])
      if (orderedPlaces[i]) {
        const coords = orderedPlaces[i].businessLocation.coordinates;
        coordArray.push(coords);
      }
    }

    // console.log("coord array  " + coordArray)
    const geoJsonFeatures = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [coordArray],
          },
        },
      ],
    };

    const lngLatBox = turf.bbox(geoJsonFeatures);
    // console.log('lngLatBox', lngLatBox)
    const sw = [lngLatBox[0], lngLatBox[1]];
    const ne = [lngLatBox[2], lngLatBox[3]];
    const fitboundsObj = [sw, ne];
    setBox(fitboundsObj);
  };

  useEffect(() => {
    let mounted = true;
    if (orderedPlaces.length > 1 && mounted) {
      setBBox();
    }
    return () => (mounted = false);
  }, [orderedPlaces, maxViewable]);

  // only use if not using second map
  useMemo(() => {
    if (gridView) {
      setDimensions(gridContainerStyle);
    } else {
      setDimensions(mapContainerStyle);
    }
  }, [gridView]);

  useEffect(() => {
    if (selectedPlace) {
      setGridView(false);
    }
  }, [selectedPlace]);

  useEffect(() => {
    Geocode.fromLatLng(draggedLocation.lat, draggedLocation.lng).then(
        (response) => {
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j <
						response.results[0]
						    .address_components[i]
						    .types.length;
              j++
            ) {
              if (
                response.results[0]
                    .address_components[
                        i
                    ].types[j] ===
							'sublocality'
              ) {
                setSubLocality(
                    response
                        .results[0]
                        .address_components[
                            i
                        ]
                        .long_name
                );
                // console.log(response.results[0].address_components[i].long_name);
              }
              if (
                response.results[0]
                    .address_components[
                        i
                    ].types[j] ===
							'locality'
              ) {
                setCity(
                    response
                        .results[0]
                        .address_components[
                            i
                        ]
                        .long_name
                );
                // console.log(response.results[0].address_components[i].long_name);
              }
            }
          }
        },
        (error) => {
          console.error(error);
        }
    );
  }, [draggedLocation]);

  const clickHandler = (map, event) => {
    // console.log("map clicked");
    // let coordinates = event.lnglat.wrap()
    // console.log({ map, event });
    // props.toggle(event)
    if (event.fitboundUpdate) {
      // console.log("Map bounds have been programmatically changed");
      // console.log(map.getCenter());
    } else {
      // console.log("Map bounds have been changed by user interaction");
      const cntr = map.getCenter();
      // console.log(cntr);
      setDraggedLocation(cntr);
    }
  };

  const dragHandler = (map, event) => {
    // console.log({ map, event });
    if (event.fitboundUpdate) {
      // console.log("Map bounds have been programmatically changed");
      // console.log(map.getCenter());
    } else {
      // console.log("Map bounds have been changed by user interaction");
      const cntr = map.getCenter();
      // console.log(cntr);
      setDraggedLocation(cntr);
    }
  };

  useEffect(() => {
    const places0 = [];
    const places1 = [];
    const places2 = [];
    const placesCenter = [];
    places.forEach((element) => {
      const obj = multiDictSub[element._id];
      if (obj) {
        const posVector = obj.posVector[2];
        if (posVector < -2) {
          places2.push(element);
        } else if (posVector < -1) {
          places1.push(element);
        } else if (posVector < 0) {
          places0.push(element);
        } else if (posVector < 1) {
          placesCenter.push(element);
        }
      }
    });
    setPlacesCenter(placesCenter);
    setPlaces0(places0);
    setPlaces1(places1);
    setPlaces2(places2);
    return () => (mounted = false);
  }, [multiDictSub]);

  return (
  // <div className="circleDiv">
    <div className="map-container">
      <Map
        // style='mapbox://styles/kobstr/cj0itw9ku003l2smnu8wbz94o'
        style="mapbox://styles/kobstr/cka78e4mj1aef1io837hkirap"
        // style ='mapbox://styles/kobstr/cjryb7aiy1xjy1fohrw6z6ow3'
        // style='mapbox://styles/mapbox/streets-v9'
        pitch={[60]}
        fitBounds={boundBox}
        onDragEnd={dragHandler}
        onClick={clickHandler}
        containerStyle={dimensions}
      >
        <MapContext.Consumer>
          {(map) => {
            // use `map` here
            // console.log("map" + map)
            const newPosDict = {};

            orderedPlaces.forEach((place) => {
              // console.log(place.businessLocation.coordinates + "inside map")
              const pix =
								map.project(
								    place
								        .businessLocation
								        .coordinates
								);
              // console.log(pix)
              // console.log("-----------")
              const obj = {
                pos: pix,
                name: place.company_name,
              };
              // obj._id = place._id
              // obj.mapPos = pix
              newPosDict[
                  place._id
              ] = obj;
            });

            map.on('idle', function() {
              map.resize();
              map.zoom = 15;
            });
          }}
        </MapContext.Consumer>

        {gridView && (
          <>
            <Layer
              type="circle"
              id="layer_id_0"
              paint={{
                'circle-radius': 10,
                'circle-color': 'yellow',
              }}
            >
              {places0.map(
                  ({
                    ...otherProps
                  }) => {
                    return (
                      <Feature
                        key={
                          otherProps._id
                        }
                        coordinates={
                          otherProps
                              .businessLocation
                              .coordinates
                        }
                      />
                    );
                  }
              )}
            </Layer>
            <Layer
              type="circle"
              id="layer_id_1"
              paint={{
                'circle-radius': 10,
                'circle-color': 'magenta',
              }}
            >
              {places1.map(
                  ({
                    ...otherProps
                  }) => {
                    return (
                      <Feature
                        key={
                          otherProps._id
                        }
                        coordinates={
                          otherProps
                              .businessLocation
                              .coordinates
                        }
                      />
                    );
                  }
              )}
            </Layer>
            <Layer
              type="circle"
              id="layer_id_2"
              paint={{
                'circle-radius': 10,
                'circle-color': 'blue',
              }}
            >
              {places2.map(
                  ({
                    ...otherProps
                  }) => {
                    return (
                      <Feature
                        key={
                          otherProps._id
                        }
                        coordinates={
                          otherProps
                              .businessLocation
                              .coordinates
                        }
                      />
                    );
                  }
              )}
            </Layer>
            <Layer
              type="circle"
              id="layer_id_3"
              paint={{
                'circle-radius': 10,
                'circle-color': 'red',
              }}
            >
              {placesCenter.map(
                  ({
                    ...otherProps
                  }) => {
                    return (
                      <Feature
                        key={
                          otherProps._id
                        }
                        coordinates={
                          otherProps
                              .businessLocation
                              .coordinates
                        }
                      />
                    );
                  }
              )}
            </Layer>
          </>
        )}

        {/* <Layer type="circle" id="layer_id" paint={{
                    "circle-radius": 10,
                    "circle-color": "green"
                }}>
                    {places1.map(({ ...otherProps }) => {
                        return <Feature key={otherProps._id} coordinates={otherProps.businessLocation.coordinates} />
                    })}
                </Layer> */}

        {selectedPlace && selectedPlace.businessLocation && (
          <Layer
            type="circle"
            id="selectedPlace_id"
            paint={{
              'circle-radius': 20,
              'circle-opacity': 0,
              'circle-stroke-width': 1,
              'circle-stroke-color':
								'#ff0000',
            }}
          >
            <Feature
              coordinates={
                selectedPlace
                    .businessLocation
                    .coordinates
              }
            />
          </Layer>
        )}

        {draggedLocation && (
          <Layer
            type="circle"
            id="draggedLocation"
            paint={{
              'circle-radius': 10,
              'circle-opacity': 1,
              'circle-stroke-width': 2,
              'circle-stroke-color':
								'#ff0000',
            }}
          >
            <Feature
              coordinates={[
                draggedLocation.lng,
                draggedLocation.lat,
              ]}
            />
          </Layer>
        )}
      </Map>
    </div>
  );
};

export default MapView;
