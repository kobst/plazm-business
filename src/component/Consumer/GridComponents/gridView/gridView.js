import React, {useRef, useState, useEffect, useMemo} from 'react';
import {Canvas, useFrame, useThree, extend} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, MapControls} from 'three/examples/jsm/controls/OrbitControls';
import {OrthographicCamera} from '@react-three/drei';

import useStore from '../../useState/index';

import PlaceMesh from './placeMesh';

import hexSlotFunction from '../functions/hexSlots';

extend({OrbitControls});
extend({MapControls});

const _hexArray = hexSlotFunction();

function CameraMain(props) {
  const cam = useRef();
  const posCoords = useRef();
  const camPos = useStore((state) => state.camPosition);
  const setGridView = useStore((state) => state.setGridView);
  const setMaxViewable = useStore((state) => state.setMaxViewable);
  const setMaxViewableDepth = useStore((state) => state.setMaxViewableDepth);

  const [vec] = useState(() => new THREE.Vector3());

  const set = useThree((state) => state.set);

  useEffect(() => void set({camera: cam.current}), []);

  useEffect(() => {
    posCoords.current = camPos;
  }, [camPos]);

  useFrame(() => {
    if (cam.current) {
      cam.current.position.lerp(
          vec.set(posCoords.current[0], posCoords.current[1], 5),
          0.05
      );

      const zoomLevel = cam.current.zoom;

      if (zoomLevel > 50) {
        setGridView(false);
      } else if (zoomLevel > 40) {
        setGridView(true);
        setMaxViewable(6);
        setMaxViewableDepth(2);
      } else if (zoomLevel > 30) {
        setGridView(true);
        setMaxViewable(9);
        setMaxViewableDepth(3);
      } else if (zoomLevel > 20) {
        setGridView(true);
        setMaxViewable(12);
        setMaxViewableDepth(3);
      } else if (zoomLevel > 10) {
        setGridView(true);
        setMaxViewable(15);
        setMaxViewableDepth(4);
      } else {
        setMaxViewable(18);
        setMaxViewableDepth(4);
        setGridView(true);
      }
    }
  });

  return (
    <group>
      {/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}
      {/* <perspectiveCamera ref={cam} zoom={20} {...props} /> */}
      <OrthographicCamera ref={cam} zoom={20} {...props} />
    </group>
  );
}

const GridView = (props) => {
  const camera = useRef();
  const setCamPos = useStore((state) => state.setCamPosition);
  const setCenterPlace = useStore((state) => state.setCenterPlace);

  const multiDict = useStore((state) => state.multiDict);
  const orderedPlaces = useStore((state) => state.orderedPlaces);
  const placeCoordDict = useStore((state) => state.placeCoordDict);

  const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition);
  const setDisplacedCenterHexPosition = useStore((state) => state.setDisplacedCenterHexPosition);

  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  const [tempCenter, setTempCenter] = useState(null);

  const shiftCamera = (hexIndex) => {
    const cubeVector = _hexArray[hexIndex].coordinate;
    const newCoordinateX = cubeVector[0] + displacedCenterHexPosition[0];
    const newCoordinateY = cubeVector[1] + displacedCenterHexPosition[1];
    const newCoordinateZ = cubeVector[2] + displacedCenterHexPosition[2];
    const newCoordinateKey = newCoordinateX + '-' + newCoordinateY + '-' + newCoordinateZ;

    const placeShiftedTowards = placeCoordDict[newCoordinateKey];

    if (placeShiftedTowards) {
      setTempCenter(placeShiftedTowards);
      const obj = multiDict[placeShiftedTowards._id];

      if (obj) {
        setCamPos(obj.posVector);
        setCenterPlace(placeShiftedTowards);
        setDisplacedCenterHexPosition([
          newCoordinateX,
          newCoordinateY,
          newCoordinateZ,
        ]);
      }
    } else {
      if (tempCenter) {
      }
    }
  };

  const shiftDelta = () => {
    if (deltaX == 0 && deltaY == 0) {
      return;
    }
    let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

    setDeltaX(0);
    setDeltaY(0);

    if (angle < 0) {
      angle = 360 + angle;
    }

    angle = angle + 90;

    if (angle > 360) {
      angle = angle - 360;
    }

    for (let i = 1; i < 7; i++) {
      const hexItem = _hexArray[i];
      if (
        (hexItem.rangeMax < hexItem.rangeMin &&
					(angle >= hexItem.rangeMin ||
						angle < hexItem.rangeMax)) ||
				(angle >= hexItem.rangeMin && angle < hexItem.rangeMax)
      ) {
        shiftCamera(i);
        break;
      }
    }
  };

  const handleScroll = (e) => {
    setDeltaX(deltaX + e.deltaX);
    setDeltaY(deltaY + e.deltaY);
  };

  useEffect(() => {
    // set preview

    const threshold = 150;
    if (Math.abs(deltaX) + Math.abs(deltaY) > threshold) {
      shiftDelta();
    }

    const timerSetDelta = setTimeout(() => {
      setDeltaX(0);
      setDeltaY(0);
    }, 500);
    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(timerSetDelta);
    };
  }, [deltaX, deltaY]);

  const boxesLimited = useMemo(() => {
    const postBusinessAdjustedPlaces = [];
    orderedPlaces.forEach((element) => {
      if (element.business) {
        element.default_image_url =
					element.business[0].default_image_url;
        element.company_name = element.business[0].company_name;
      }
      postBusinessAdjustedPlaces.push(element);
    });

    return postBusinessAdjustedPlaces.map(({...otherProps}, index) => (
      <PlaceMesh
        _id={otherProps._id}
        key={otherProps._id}
        placeObject={otherProps}
        // placeObject={otherProps.business[0]}
        // hover={hoverPlace}
        // hovering={setPreview}
        // click={handleClick}
        // selectPlace={props.selectPlace}
      />
    ));
  }, [orderedPlaces]);

  return (
    <>
      <div style={{width: '100%', height: '100%'}} onWheel={handleScroll}>
        <Canvas>
          {/* camera={{ position: [0, 0, 20], near: 10, far: 60 }}>  */}
          <CameraMain ref={camera} position={[0, 0, 20]} />

          {/* <NewControls /> */}

          {boxesLimited}

          {/* <SingleDetailView /> */}

          <ambientLight intensity={2.0} />
        </Canvas>
      </div>
    </>
  );
};

export default GridView;

// const setPreview = (hovering) => {
//     props.hovering(hovering)
// }

// const handleClick = (_place) => {
//     // ReCenter(_place)
//     // props.moveCamera(_place)
// }

// const hoverPlace = (place) => {
//     // adjustZ(place)
//     // setDepth(place)

//     if (place) {
//         props.selectPlace(place)

//         // adjustZ(place)
//     }

// }
