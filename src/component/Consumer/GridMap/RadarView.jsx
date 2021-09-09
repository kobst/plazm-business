import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Suspense, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
// import SphereText from './curvedText'
import useStore from './useState'
import { OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

const RadarDot = (props) => {

    const [color, setColor] = useState('purple')
    const [color2, setColor2] = useState('red')
    const multiDict = useStore((state) => state.multiDict)
    const centerPlace = useStore((state) => state.centerPlace)
    const coords = useRef()
    const mesh = useRef()

    const [vec] = useState(() => new THREE.Vector3())

    useEffect(() => {
        // console.log("- - multi effect - - ")
        let obj = multiDict[props.placeObject._id]
        if (obj) {
            coords.current = obj.posVector


            if (obj.posVector[2] < -2) {
                setColor("blue")
            } else if (obj.posVector[2] < -1)
                setColor("magenta")
            else if (obj.posVector[2] < 0) {
                setColor("yellow")
            } else {
                setColor("red")
            }
        }

    }, [multiDict])


    useFrame(() => {

        if (mesh.current) {
            if (coords.current) {
                mesh.current.position.lerp(vec.set(coords.current[0], coords.current[1], 0), 0.05)
            }
        }
    })

    return (
        <mesh
            position={[0, 0, 0]}
            ref={mesh}>

            <circleGeometry args={[1, 32]} attach="geometry" />
            <meshBasicMaterial attach="material" color={color} />
        </mesh>
    )
}







function Camera(props) {
    const cam = useRef()
    const camCoords = useRef()

    const centerPlace = useStore((state) => state.centerPlace)
    const multiDict = useStore((state) => state.multiDict)


    const [vec] = useState(() => new THREE.Vector3())

    const set = useThree((state) => state.set);

    var _camPos = null

    useEffect(() => void set({ camera: cam.current }), []);


    useFrame(() => {
        if (cam.current && camCoords.current) {
            cam.current.position.lerp(vec.set(camCoords.current[0], camCoords.current[1], 20), 0.05)
            cam.current.updateMatrixWorld()
        }
    })

    useEffect(() => {

        if (centerPlace && multiDict) {
            let centerId = centerPlace._id
            let centerPosObj = multiDict[centerId]
            console.log(centerPosObj)
            if (centerPosObj) {
                camCoords.current = centerPosObj.posVector
            }
        }

    }, [centerPlace, multiDict])



    return (
        <group>

            <OrthographicCamera ref={cam} zoom={7} {...props} />

        </group>

    )

    //zoom 12 shows depth 1
    //zoom 7 shows depth 2
}



const RadarView = (props) => {

    const cam = useRef()
    const camCoords = useRef()
    const gridView = useStore((state) => state.gridView)
    const cameraPos = useStore((state) => state.camPosition)
    const centerPlace = useStore((state) => state.centerPlace)
    const multiDict = useStore((state) => state.multiDict)

    const places = useStore((state) => state.places)


    const dots = useMemo(() => props.places.map(({ ...otherProps }, index) => (

        // const boxes = React.memo(() => props.places.map(({ ...otherProps }, index) => (
        <RadarDot
            key={otherProps._id}
            placeObject={otherProps}
        />
    )), [props.places])



    return (
        <Canvas>


            <Camera position={[0, 0, 20]} />

            {props.places.map(({ ...otherProps }) => (
                <RadarDot
                    key={otherProps._id}
                    placeObject={otherProps}
                />
            ))}


        </Canvas >
    )
}

export default RadarView