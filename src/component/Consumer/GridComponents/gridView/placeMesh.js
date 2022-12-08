import React, {useRef, useState, useEffect} from 'react';
import {useFrame, extend} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, MapControls, MOUSE} from 'three/examples/jsm/controls/OrbitControls';
import {Html} from '@react-three/drei';

import colorDict from '../functions/colorSlotDict';

import {useSpring, a} from '@react-spring/three';

import fonts from './fonts';

import useStore from '../../useState/index';

import {Text} from 'troika-three-text';

extend({OrbitControls});
extend({MapControls});
extend({Text});

const PreviewCard = (props) => {
	const hexRef = useRef();
	const centerPlace = useStore((state) => state.centerPlace);
	//use spring
	const [active, setActive] = useState(false);

	const {_color, pos, rotation, scale, ...propsSpring} = useSpring({
		_color: active ? 'pink' : 'purple',
		pos: active ? [0, 0, 10] : [0, 0, -2],
		scale: active ? [5, 5, 5] : [0, 0, 0],
		config: {mass: 10, tension: 500, friction: 200, duration: 2000},
	});

	return (
		<a.group scale={scale} ref={hexRef}>
			<mesh position={[0, 0, 0]}>
				<boxBufferGeometry args={[2, 2, 2]} />

				<meshBasicMaterial attachArray="material" color={_color} />
				<meshBasicMaterial attachArray="material" color={_color} />
				<meshBasicMaterial attachArray="material" color={_color} />
				<meshBasicMaterial attachArray="material" color={_color} />
				<meshBasicMaterial attachArray="material" color={_color} />
				<meshBasicMaterial attachArray="material" color={_color} />
			</mesh>
		</a.group>
	);
};

const HexTile = (props) => {
	// works
	const color1 = new THREE.Color('rgb(225,109,245)');
	const color2 = new THREE.Color('rgb(78,248,231)');

	const hexRef = useRef();

	const xOffset = 0.5;
	const yOffset = 0.5;

	const size = 2.5;
	const w = 2 * size;
	const h = Math.sqrt(3) * size;

	const [_color, setColor] = useState(color1);
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

	var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

	var geomShape2 = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

	geomShape2 = geomShape2.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI));

	var targetQuaternion = new THREE.Quaternion();
	targetQuaternion.setFromEuler(new THREE.Euler(0, 2 * Math.PI, 0));

	//use spring
	const [active, setActive] = useState(true);

	const {color, pos, rotation, scale, ...propsSpring} = useSpring({
		color: active ? 'hotpink' : 'white',
		pos: active ? [0, 0, 2] : [0, 0, 0],
		rotation: active ? [0, 0, 0] : [0, THREE.Math.degToRad(180), 0],
		scale: active ? [1.5, 1.5, 1.5] : [0.5, 0.5, 0.5],
		config: {mass: 10, tension: 500, friction: 200, precision: 0.00001},
	});

	const {rotationS} = useSpring({
		rotationS: active ? [0, 0, 0] : [0, THREE.Math.degToRad(180), 0],
		config: {mass: 10, tension: 500, friction: 200, precision: 0.00001},
	});

	useFrame(() => {
		if (hexRef.current) {
			let ran = Math.floor(Math.random() * 40);
			if (ran == 3) {
				setActive(!active);
			}
		}
	});

	return (
		<a.group ref={hexRef}>
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

const Label = (props) => {
	const textRef = useRef();
	const pivotRef = useRef();
	const coords = useRef([0, 0, 0]);

	const multiDictSub = useStore((state) => state.multiDict);

	const [opts, setOpts] = useState({
		font: 'Roboto',
		fontSize: 1,
		color: 'black',
		maxWidth: 1,
		lineHeight: 1,
		letterSpacing: 0,
		textAlign: 'center',
		materialType: 'MeshPhongMaterial',
	});

	return (
		<group ref={pivotRef}>
			<text
				ref={textRef}
				position={[0, 0, 5]}
				rotation={[0, 0, 0]}
				{...opts}
				text={props.name}
				font={fonts[opts.font]}
				anchorX="center"
				anchorY="top"
			>
				{opts.materialType === 'MeshPhongMaterial' ? (
					<meshPhongMaterial
						attach="material"
						color={opts.color}
					/>
				) : null}
			</text>
		</group>
	);
};

const LabelHtml = (props) => {
	return (
		<Html className="content" position={[0, -0.5, 20]} transform occlude>
			<div>
				<h4 style={{color: 'red'}}>{props.company_name}</h4>
			</div>
		</Html>
	);
};

const PlaceMesh = (props) => {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	const meshGroup = useRef();

	const plane = useRef();
	const connector = useRef();
	const textRef = useRef();
	const coords = useRef([0, 0, 0]);
	const pos = useRef([0, 0, 0]);

	const cubes = useRef([]);
	const rotation = useRef([0, 0]);
	const mapPoint = useRef([0, 0]);

	const _colorDict = colorDict();

	const [depth1, setDepth1] = useState(false);
	const [outerDepth, setOuterDepth] = useState(true);

	const [hovered, setHover] = useState(false);
	const [previewActive, setPreviewActive] = useState(false);
	const [startPos, setStartPos] = useState([-50, 50, 0]);
	const [tileColor, setTileColor] = useState('black');

	const previewMode = useStore((state) => state.previewMode);
	const setPreviewMode = useStore((state) => state.setPreviewMode);
	const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition);
	const setDisplacedCenterHexPosition = useStore((state) => state.setDisplacedCenterHexPosition);

	const setCamPos = useStore((state) => state.setCamPosition);
	const setCenterPlace = useStore((state) => state.setCenterPlace);

	const [opts, setOpts] = useState({
		font: 'Roboto',
		fontSize: 1.0,
		color: 'white',
		maxWidth: 1,
		lineHeight: 1,
		letterSpacing: 0,
		textAlign: 'center',
		materialType: 'MeshPhongMaterial',
	});

	const multiDictSub = useStore((state) => state.multiDict);
	const centerHexPosition = useStore((state) => state.centerHexPosition);

	const placeCoordDict = useStore((state) => state.placeCoordDict);

	const orderedPlaceDict = useStore((state) => state.orderedPlacesDict);
	const mapPosDict = useStore((state) => state.mapPosDict);
	const maxViewable = useStore((state) => state.maxViewable);
	const maxViewableDepth = useStore((state) => state.maxViewableDepth);

	const centerPlace = useStore((state) => state.centerPlace);
	const setSelectedPlace = useStore((state) => state.setSelectedPlace);

	const [vec] = useState(() => new THREE.Vector3());

	const loader = new THREE.TextureLoader();
	const texture = loader.load(props.placeObject.default_image_url);

	const {scaleText, ...propsSpring} = useSpring({
		scaleText: previewActive ? [2, 2, 2] : [1, 1, 1],
		config: {mass: 10, tension: 500, friction: 200, precision: 0.00001},
	});

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
		const previewMarginX = 2;
		const previewMarginY = 2;
		let x, y, z;
		x = previewMode ? props.position[0] * previewMarginX : props.position[0];
		y = previewMode ? props.position[1] * previewMarginY : props.position[1];
		z = props.position[2];
		coords.current = [x, y, z];
		setTileColor(props.color);
	}, [props.position, previewMode]);

	useEffect(() => {
		let mapPos = mapPosDict[props._id];
		if (mapPos) {
			mapPoint.current = mapPos.pos;
		}
	}, [mapPosDict]);

	useEffect(() => {
		if (centerPlace) {
			if (centerPlace._id === props._id) {
				setPreviewActive(true);
				setOuterDepth(false);
				setDepth1(false);
			} else {
				setPreviewActive(false);
			}
		}
	}, [centerPlace]);

	const handleHover = (place) => {
		if (meshGroup.current) {
			meshGroup.current.scale.set(1.25, 1.25, 1.25);
		}
		setSelectedPlace(place);
	};

	const handleLeave = () => {
		if (meshGroup.current) {
			meshGroup.current.scale.set(1, 1, 1);
		}
		setSelectedPlace(null);
	};

	const handleClick = (place) => {
		if (place) {
			setPreviewMode(!previewMode);
			setCamPos(place.posVector);
			setCenterPlace(place);

			let cubeVector = place.cubeVector;
			let newCoordinateX = cubeVector[0] + displacedCenterHexPosition[0];
			let newCoordinateY = cubeVector[1] + displacedCenterHexPosition[1];
			let newCoordinateZ = cubeVector[2] + displacedCenterHexPosition[2];
			setDisplacedCenterHexPosition([
				newCoordinateX,
				newCoordinateY,
				newCoordinateZ,
			]);
		}
		// need a way to make this center Place?
	};

	return (
		<group
			// {...props}
			userData={props.placeObject}
			ref={meshGroup}
			position={[0, 0, -5]}
			scale={(1, 1, 1)}
			onClick={() => handleClick(props.placeObject)}
			onPointerOver={() => handleHover(props.placeObject)}
			onPointerOut={() => handleLeave(false)}
		>
			{previewMode ? (
				<PreviewCard
					position={[0, 0, 10]}
					company_name={props.placeObject.company_name}
					previewActive={previewActive}
				/>
			) : null}

			<HexTile
				innerRef={hexBackground}
				color={tileColor}
				placeImage={props.placeObject.default_image_url}
				_id={props._id}
			></HexTile>
		</group>
	);
};

export default PlaceMesh;
