import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import {OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

import useStore from './useState'
import HexGroup from './hexGroup'





extend({ OrbitControls })
extend({ MapControls })


const NewControls = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const [targetVec] = useState(() => new THREE.Vector3())
    // useFrame((state) => controls.current.update());

    useFrame(() => {
        // console.log(JSON.stringify(JSON.stringify(controls.current)))
        if (controls.current) {
            controls.current.update()
            const camPos = useStore.getState().camPosition
            // const vec = new THREE.Vector3(camPos["x"], camPos["y"], 0)
            targetVec.set(camPos["x"], camPos["y"], -20)
            // console.log("target   " + JSON.stringify(targetVec))
            controls.current.target = targetVec
            // console.log(camPos.x)
            // camera.lookAt(vec)
            // camera.updateProjectionMatrix()
        }
    })



    return (
        <mapControls
            // <orbitControls
            ref={controls}
            args={[camera, gl.domElement]}
            enableZoom={true}
            enablePan={true}
            enableRotate={false}
            screenSpacePanning={true}

            // maxAzimuthAngle={Math.PI / 2}
            // minAzimuthAngle={-Math.PI / 2}
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={-Math.PI / 2}

            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 4}
            minPolarAngle={0}

            minZoom={15}
            maxZoom={55}

            dampingFactor={0.05}

        />
    );
}

// from https://yuji.wordpress.com/2021/05/31/react-three-fiber-set-default-camera/


const CameraSet = (props) => {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => void set({ camera: ref.current }), []);
    useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />;
  };



function Camera(props) {
    const cam = useRef()
    const sampleBox = useRef()
    // const [y] = Scroll([-100, 100], { domTarget: window });
    const setCamPos = useStore((state) => state.setCamPosition)
    const camPos = useStore(state => state.camPosition)
    const setGridView = useStore((state) => state.setGridView)
    const centerPlace = useStore((state) => state.centerPlace)
    const gridView = useStore((state) => state.gridView)
    const setMaxViewable = useStore((state) => state.setMaxViewable)
    const setMaxViewableDepth = useStore((state) => state.setMaxViewableDepth)
    const set = useThree((state) => state.set)
    // const { setDefaultCamera } = useThree()

    var _camPos = null
    // useEffect(() => void setDefaultCamera(cam.current), [])

    useEffect(() => void set({ camera: cam.current }), []);

    useFrame(() => {
        if (cam.current) {

            let zoomLevel = cam.current.zoom

            if (zoomLevel > 50) {
                setGridView(false)
            } else if (zoomLevel > 40) {
                setGridView(true)
                setMaxViewable(6)
                setMaxViewableDepth(2)
            } else if (zoomLevel > 30) {
                setGridView(true)
                setMaxViewable(9)
                setMaxViewableDepth(3)
            } else if (zoomLevel > 20) {
                setGridView(true)
                setMaxViewable(12)
                setMaxViewableDepth(3)
            } else if (zoomLevel > 10) {
                setGridView(true)
                setMaxViewable(15)
                setMaxViewableDepth(4)
            } else {
                setMaxViewable(18)
                setMaxViewableDepth(4)
                setGridView(true)
            }





            //wjy does this set camPos but never seem to console.log
            if (_camPos !== cam.current.position) {
                // console.log("set cam pos " + JSON.stringify(_camPos))
                // console.log(cam.current)
                setCamPos(cam.current.position)
                _camPos = cam.current.position
            }
        }
    })



    return (
        <group>
            {/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}
            {/* <perspectiveCamera ref={cam} {...props} /> */}
            {/* <OrthographicCamera ref={cam} position={[0, 0, -10]} {...props} /> */}
            <OrthographicCamera ref={cam} zoom={20} {...props} />

        </group>

    )
}



const GridThreeJS = (props) => {

    const userLists = useSelector((state) => state.list.userLists);
    const feedData = useSelector((state) => state.myFeed.myFeed);

    const [places, setPlaces] = useState([])
   
    const [draggedCenter, setDraggedCenter] = useState({
        lat: JSON.stringify(process.env.REACT_APP_LATITUDE),
        lng: JSON.stringify(process.env.REACT_APP_LONGITUDE)
    })

 
    const camera = useRef()
    const hexGrp = useRef()


    var raycaster_ = new THREE.Raycaster();
    const gridView = useStore((state) => state.gridView)
    const cameraPos = useStore((state) => state.camPosition)

    const setPreview = (hovering) => {
        // console.log("setPreview" + hovering)
        props.hovering(hovering)
    }

    const hoverPlace = (place) => {
        console.log("hoverPlace" + place.company_name)
        props.selectPlace(place)
    }

    const moveCameraToClicked = (place) => {
        console.log("move camera " + place.company_name)

    }


    console.log("loading gridThreeJS-------")



    useEffect(()=>{

       setPlaces(feedData)

      },[feedData])

    return (
        <Canvas>
            {/* camera={{ position: [0, 0, 20], near: 10, far: 60 }}> */}
            <Camera
                raycaster={raycaster_}
                ref={camera}
                position={[0, 0, 20]} />


            <NewControls />


            <HexGroup
                position={[0, 0, 0]}
                places={places}
                center={draggedCenter}
                // selectPlace={props.selectPlace}
                // setHexRings={props.setHexRings}
                moveCamera={moveCameraToClicked}
                hover={hoverPlace}
                hovering={setPreview} />

            {/* <SingleDetailView /> */}


            <ambientLight intensity={1.4} />

        </Canvas >
    )
}

export default GridThreeJS