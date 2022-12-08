import React, {useRef, useState, useEffect, useMemo} from 'react';
import {Canvas, useFrame, useThree, extend} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, MapControls} from 'three/examples/jsm/controls/OrbitControls';
import {RoundedBox, OrthographicCamera} from '@react-three/drei';

import useStore from '../useState/index';

import './styles.css';

extend({OrbitControls});
extend({MapControls});

const RadarDot = (props) => {
  const [color, setColor] = useState('purple');
  const multiDict = useStore((state) => state.multiDict);
  const centerPlace = useStore((state) => state.centerPlace);
  const coords = useRef();
  const mesh = useRef();

  const [vec] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const obj = multiDict[props.placeObject._id];
    if (obj) {
      coords.current = obj.posVector;
    }
  }, [multiDict]);

  useEffect(() => {
    if (centerPlace) {
      if (centerPlace._id === props.placeObject._id) {
        setColor('red');
      } else {
        setColor('purple');
      }
    }
  }, [centerPlace]);

  useFrame(() => {
    if (mesh.current) {
      if (coords.current) {
        mesh.current.position.lerp(
            vec.set(coords.current[0], coords.current[1], 0),
            0.05
        );
      }
    }
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <circleGeometry args={[1, 32]} attach="geometry" />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
};

function Camera(props) {
  const cam = useRef();
  const camCoords = useRef();
  const group = useRef();

  const camPos = useStore((state) => state.camPosition);

  const [vec] = useState(() => new THREE.Vector3());

  const set = useThree((state) => state.set);

  useEffect(() => void set({camera: cam.current}), []);

  useFrame(() => {
    if (group.current && camCoords.current) {
      group.current.position.lerp(
          vec.set(camCoords.current[0], camCoords.current[1], 20),
          0.05
      );
    }
  });

  useEffect(() => {
    camCoords.current = [camPos[0], camPos[1], 20];
  }, [camPos]);

  return (
    <group ref={group}>
      <RoundedBox args={[1, 1, 1]} radius={0.05}>
        <meshPhongMaterial attach="material" color="#f3f3f3" />
      </RoundedBox>
      <OrthographicCamera ref={cam} zoom={7} {...props} />
    </group>
  );

  // zoom 12 shows depth 1
  // zoom 7 shows depth 2
}

const RadarView = () => {
  const orderedPlaces = useStore((state) => state.orderedPlaces);

  const dotsLimited = useMemo(() => {
    return orderedPlaces.map(({...otherProps}, index) => (
      <RadarDot key={otherProps._id} placeObject={otherProps} />
    ));
  }, [orderedPlaces]);

  return (
    <div className="radar-container">
      <Canvas>
        <color attach="background" args={['blue']} />
        <Camera position={[0, 0, 20]} />
        {dotsLimited}
      </Canvas>
    </div>
  );
};

export default RadarView;
