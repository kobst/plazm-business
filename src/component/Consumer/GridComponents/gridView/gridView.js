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

const HexHighlight = (props) => {
	// works
	const color1 = new THREE.Color('rgb(225,109,245)');
	const color2 = new THREE.Color('rgb(78,248,231)');

	const [size, setSize] = useState(2.7);
	const highlightRef = useRef();

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
		new THREE.Vector3(w * -0.25, h * 0.5, 0),
	];

	var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));
	const geometry = new THREE.BufferGeometry().setFromPoints(points);

	return (
		<line geometry={geometry}>
			<lineBasicMaterial attach="material" color="black" linewidth="4" />
		</line>
	);
};

function CameraMain(props) {
	const cam = useRef();
	const posCoords = useRef();
	const group = useRef();

	const sampleBox = useRef();
	// const [y] = Scroll([-100, 100], { domTarget: window });

	const camPos = useStore((state) => state.camPosition);

	const setCamPos = useStore((state) => state.setCamPosition);
	const setGridView = useStore((state) => state.setGridView);
	const centerPlace = useStore((state) => state.centerPlace);
	const gridView = useStore((state) => state.gridView);
	const setMaxViewable = useStore((state) => state.setMaxViewable);
	const setMaxViewableDepth = useStore((state) => state.setMaxViewableDepth);
	const previewMode = useStore((state) => state.previewMode);

	const [vec] = useState(() => new THREE.Vector3());
	const set = useThree((state) => state.set);
	const {setDefaultCamera} = useThree();

	useEffect(() => void set({camera: cam.current}), []);

	useEffect(() => {
		// if (previewMode) {
		//     let x, y, z
		//     x = camPos[0]
		// }

		const previewMarginX = 2;
		const previewMarginY = 2;
		let x, y, z;
		x = previewMode ? camPos[0] * previewMarginX : camPos[0];
		y = previewMode ? camPos[1] * previewMarginY : camPos[1];
		z = camPos[2];
		posCoords.current = [x, y, z];
	}, [camPos]);

	useFrame(() => {
		if (group.current && posCoords.current) {
			group.current.position.lerp(
				vec.set(posCoords.current[0], posCoords.current[1], 5),
				0.05
			);

			// let zoomLevel = cam.current.zoom
			// if (zoomLevel > 50) {
			// } else if (zoomLevel > 40) {
			//     setMaxViewable(6)
			//     setMaxViewableDepth(2)
			// } else if (zoomLevel > 30) {
			//     setMaxViewable(9)
			//     setMaxViewableDepth(3)
			// } else if (zoomLevel > 20) {
			//     setMaxViewable(12)
			//     setMaxViewableDepth(3)
			// } else if (zoomLevel > 10) {
			//     setMaxViewable(15)
			//     setMaxViewableDepth(4)
			// } else {
			//     setMaxViewable(18)
			//     setMaxViewableDepth(4)
			// }
		}
	});

	return (
		<group ref={group}>
			{/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}

			<HexHighlight position={[0, 0, -10]} />

			<OrthographicCamera ref={cam} zoom={20} {...props} />

			{/* <perspectiveCamera ref={cam} zoom={20} {...props} /> */}
		</group>
	);
}

const GridView = (props) => {
	const camera = useRef();
	const hexGrp = useRef();
	const scrollRef = useRef();
	var raycaster = new THREE.Raycaster();
	const [center2dVec] = useState(() => new THREE.Vector2(0, 0));
	const gridView = useStore((state) => state.gridView);
	const cameraPos = useStore((state) => state.camPosition);
	const setCamPos = useStore((state) => state.setCamPosition);
	const setCenterPlace = useStore((state) => state.setCenterPlace);

	const multiDict = useStore((state) => state.multiDict);
	const setMultiDict = useStore((state) => state.setMultiDict);
	const setOrderedPlacesDict = useStore((state) => state.setOrderedPlacesDict);
	const orderedPlaces = useStore((state) => state.orderedPlaces);
	const setOrderedPlaces = useStore((state) => state.setOrderedPlaces);
	const placeCoordDict = useStore((state) => state.placeCoordDict);
	const setPlaceCoordDict = useStore((state) => state.setPlaceCoordDict);
	const centerPlace = useStore((state) => state.centerPlace);
	const depth1Places = useStore((state) => state.depth1Places);
	const setDepth1Places = useStore((state) => state.setDepth1Places);
	const centerHexPosition = useStore((state) => state.centerHexPosition);
	const setCenterHexPosition = useStore((state) => state.setCenterHexPosition);

	const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition);
	const setDisplacedCenterHexPosition = useStore((state) => state.setDisplacedCenterHexPosition);

	const places = useStore((state) => state.places);
	const filteredPlaces = useState([]);

	const [deltaX, setDeltaX] = useState(0);
	const [deltaY, setDeltaY] = useState(0);
	const [shifting, setShifting] = useState(false);

	const [tempCenter, setTempCenter] = useState(null);

	const [camVec] = useState(() => new THREE.Vector3());

	const shiftCamera = (hexIndex) => {
		let cubeVector = _hexArray[hexIndex].coordinate;
		let newCoordinateX = cubeVector[0] + displacedCenterHexPosition[0];
		let newCoordinateY = cubeVector[1] + displacedCenterHexPosition[1];
		let newCoordinateZ = cubeVector[2] + displacedCenterHexPosition[2];
		let newCoordinateKey = newCoordinateX + '-' + newCoordinateY + '-' + newCoordinateZ;

		let placeShiftedTowards = placeCoordDict[newCoordinateKey];

		if (placeShiftedTowards) {
			setTempCenter(placeShiftedTowards);
			// let obj = multiDict[placeShiftedTowards._id]

			// change to placeShiftedTowards.posVector
			if (placeShiftedTowards.posVector) {
				setCamPos(placeShiftedTowards.posVector);
				setCenterPlace(placeShiftedTowards);
				setDisplacedCenterHexPosition([
					newCoordinateX,
					newCoordinateY,
					newCoordinateZ,
				]);
			} else {
			}
		} else {
			if (tempCenter) {
			}
		}
		// setShifting(false)
	};

	const shiftDelta = () => {
		if (deltaX == 0 && deltaY == 0) {
			return;
		}
		let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

		setDeltaX(0);
		setDeltaY(0);

		const handleScroll = (e) => {
			setDeltaX(deltaX + e.deltaX);
			setDeltaY(deltaY + e.deltaY);
		};

		angle = angle + 90;

		if (angle > 360) {
			angle = angle - 360;
		}

		useEffect(() => {
			// set preview

			let threshold = 150;
			if (Math.abs(deltaX) + Math.abs(deltaY) > threshold) {
				shiftDelta();
			}

			let timer_setDelta = setTimeout(() => {
				setDeltaX(0);
				setDeltaY(0);
			}, 500);
			// this will clear Timeout when component unmount like in willComponentUnmount
			return () => {
				clearTimeout(timer_setDelta);
			};
		}, [deltaX, deltaY]);

		const boxesLimited = useMemo(() => {
			let postBusinessAdjustedPlaces = [];
			orderedPlaces.forEach((element) => {
				if (element.business) {
					element.default_image_url =
						element.business[0].default_image_url;
					element.company_name =
						element.business[0].company_name;
				}
				postBusinessAdjustedPlaces.push(element);
			});

			return postBusinessAdjustedPlaces.map(({...otherProps}, index) => (
				<PlaceMesh
					_id={otherProps._id}
					key={otherProps._id}
					placeObject={otherProps}
					position={otherProps.posVector}
					color={otherProps.icon_color}
				/>
			));
		}, [orderedPlaces]);

		return (
			<>
				<div
					style={{width: '100%', height: '100%'}}
					onWheel={handleScroll}
				>
					<Canvas
						color
						attach="background"
						args={['transparent']}
					>
						<CameraMain
							ref={camera}
							position={[0, 0, 20]}
						/>
						{boxesLimited}
						<ambientLight intensity={2.0} />
					</Canvas>
				</div>
			</>
		);
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
			/>
		));
	}, [orderedPlaces]);

	return (
		<>
			<div style={{width: '100%', height: '100%'}} onWheel={handleScroll}>
				<Canvas>
					<CameraMain ref={camera} position={[0, 0, 20]} />
					{boxesLimited}
					<ambientLight intensity={2.0} />
				</Canvas>
			</div>
		</>
	);
};

export default GridView;
