import React, {useRef, useState, useEffect} from 'react';
import {useFrame, useThree, extend} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, MapControls} from 'three/examples/jsm/controls/OrbitControls';
import {OrthographicCamera} from '@react-three/drei';

import useStore from '../useState/index';


extend({OrbitControls});
extend({MapControls});


function cameraMain(props) {
  const cam = useRef();
  const camCoords = useRef();

  const camPos = useStore((state) => state.camPosition);

  const [vec] = useState(() => new THREE.Vector3());


  const set = useThree((state) => state.set);

  useEffect(() => void set({camera: cam.current}), []);

  useEffect(() => {
    camCoords.current = [camPos[0], camPos[1], 20];
  }, [camPos]);


  useFrame(() => {
    if (cam.current && camCoords.current) {
      cam.current.position.lerp(vec.set(camCoords.current[0], camCoords.current[1], 20), 0.05);
    }
  });


  return (
    <group>
      <OrthographicCamera ref={cam} zoom={10} {...props} />
    </group>

  );
}

export default cameraMain;
