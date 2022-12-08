import React, {useRef, useState, useEffect} from 'react';
import {useFrame, extend} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, MapControls} from 'three/examples/jsm/controls/OrbitControls';

import useStore from '../../useState/index';

import {Text} from 'troika-three-text';
import {a} from '@react-spring/three';


extend({OrbitControls});
extend({MapControls});
extend({Text});

const HexTile = (props) => {
  const hexRef = useRef();

  const xOffset = 0.5;
  const yOffset = 0.5;

  const size = 2.5;
  const w = 2 * size;
  const h = Math.sqrt(3) * size;

  const points = [
    new THREE.Vector3(w * -0.25, h * 0.5, 0),
    new THREE.Vector3(w * 0.25, h * 0.5, 0),
    new THREE.Vector3(w * 0.5, 0, 0),
    new THREE.Vector3(w * 0.25, h * -0.5, 0),
    new THREE.Vector3(w * -0.25, h * -0.5, 0),
    new THREE.Vector3(w * -0.5, 0, 0),
  ];

  const loader = new THREE.TextureLoader();
  const texture = loader.load(props.placeImage);
  texture.offset.set(xOffset, yOffset);
  texture.repeat.set(0.25, 0.25);

  const geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

  const targetQuaternion = new THREE.Quaternion();
  targetQuaternion.setFromEuler(new THREE.Euler(0, 2 * Math.PI, 0));

  // use spring
  const [active, setActive] = useState(true);

  useFrame(() => {
    if (hexRef.current) {
      const ran = Math.floor(Math.random() * 40);
      if (ran == 3) {
        setActive(!active);
      }
    }
  });

  return (
    <a.group
      ref={hexRef}
    >
      <mesh geometry={geomShape}>
        {texture && (
          <meshBasicMaterial
            attach="material"
            map={texture}
            side="THREE.DoubleSide"
          />
        )}
      </mesh>
    </a.group>
  );
};

const PlaceMesh = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const meshGroup = useRef();
  const hexBackground = useRef();

  const coords = useRef([0, 0, 0]);
  const cubes = useRef([]);
  const rotation = useRef([0, 0]);
  const mapPoint = useRef([0, 0]);

  const multiDictSub = useStore((state) => state.multiDict);

  const mapPosDict = useStore((state) => state.mapPosDict);

  const [vec] = useState(() => new THREE.Vector3());

  useFrame(() => {
    if (meshGroup.current) {
      if (coords.current) {
        meshGroup.current.position.lerp(
            vec.set(
                coords.current[0],
                coords.current[1],
                coords.current[2]
            ),
            0.05
        );
      }
      if (mesh.current) {
        mesh.current.rotation.y = mesh.current.rotation.y += 0.01;
      }
    }
  });

  useEffect(() => {
    const obj = multiDictSub[props._id];
    if (obj) {
      coords.current = obj.posVector;
      cubes.current = obj.cubeCoor;
      rotation.current = [obj.xRotation, obj.yRotation];
    }
  }, [multiDictSub]);

  useEffect(() => {
    const mapPos = mapPosDict[props._id];
    if (mapPos) {
      mapPoint.current = mapPos.pos;
    }
  }, [mapPosDict]);

  return (
    <group
      userData={props.placeObject}
      ref={meshGroup}
      position={[0, 0, 0]}
      scale={(1, 1, 1)}
    >
      <HexTile
        innerRef={hexBackground}
        color={tileColor}
        position={[0, 0, 0]}
        placeImage={props.placeObject.default_image_url}
        _id={props._id}
      ></HexTile>
    </group>
  );
};

export default PlaceMesh;
