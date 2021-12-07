
import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import { Polyhedron, Plane, RoundedBox, OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

import useStore from '../useState/index'



extend({ OrbitControls })
extend({ MapControls })





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


            // if (obj.posVector[2] < -2) {
            //     setColor("blue")
            // } else if (obj.posVector[2] < -1)
            //     setColor("magenta")
            // else if (obj.posVector[2] < 0) {
            //     setColor("yellow")
            // } else {
            //     setColor("red")
            // }
        }

    }, [multiDict])

    useEffect(() => {
        if (centerPlace) {
            if (centerPlace._id === props.placeObject._id) {
                setColor('red')
            } else {
                setColor('purple')
            }
        }
    }, [centerPlace])

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

const BackgroundRadar = () => {
    const sdv = useRef()
    const selectedPlace = useStore((state) => state.centerPlace)

    useEffect(() => {


    }, [selectedPlace])

    useFrame(() => {
        if (sdv.current) {
            const camPos = useStore.getState().camPosition
            sdv.current.position.set(camPos["x"], camPos["y"], camPos["z"] - 20)
        }

    })

    return (
        <mesh
            ref={sdv}
            position={[0, 0, -100]}>
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color='blue' />
        </mesh>
    )

}



function Camera(props) {
    const cam = useRef()
    const camCoords = useRef()
    const group = useRef()

    const centerPlace = useStore((state) => state.centerPlace)
    const multiDict = useStore((state) => state.multiDict)

    // const [y] = Scroll([-100, 100], { domTarget: window });
    const setCamPos = useStore((state) => state.setCamPosition)
    const camPos = useStore(state => state.camPosition)
    // const setGridView = useStore((state) => state.setGridView)
    // const centerPlace = useStore((state) => state.centerPlace)
    // const gridView = useStore((state) => state.gridView)

    const [vec] = useState(() => new THREE.Vector3())
    

    const set = useThree((state) => state.set);
    const { setDefaultCamera } = useThree()

    var _camPos = null
    useEffect(() => void set({ camera: cam.current }), []);

    useFrame(() => {
        // if (cam.current && camCoords.current) {
        //     cam.current.position.lerp(vec.set(camCoords.current[0], camCoords.current[1], 20), 0.05)
        // }
        if (group.current && camCoords.current) {
            group.current.position.lerp(vec.set(camCoords.current[0], camCoords.current[1], 20), 0.05)
        }
    })



    useEffect(() => {
        camCoords.current = [camPos[0], camPos[1], 20]

    }, [camPos])



    return (
        <group ref={group}>
            {/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}
            {/* <perspectiveCamera ref={cam} {...props} /> */}
            {/* <OrthographicCamera ref={cam} position={[0, 0, -10]} {...props} /> */}
            <RoundedBox args={[1, 1, 1]} radius={0.05} >
                <meshPhongMaterial attach="material" color="#f3f3f3" />
            </RoundedBox>
            <OrthographicCamera ref={cam} zoom={7} {...props} />



        </group>

    )

    //zoom 12 shows depth 1
    //zoom 7 shows depth 2
}





const RadarView = () => {

    const cam = useRef()
    const camCoords = useRef()
    const gridView = useStore((state) => state.gridView)
    const cameraPos = useStore((state) => state.camPosition)
    const centerPlace = useStore((state) => state.centerPlace)
    const multiDict = useStore((state) => state.multiDict)
    const orderedPlaces = useStore((state) => state.orderedPlaces)





    const dotsLimited = useMemo(() => {
        console.log(orderedPlaces)

        return (
            orderedPlaces.map(({ ...otherProps }, index) => (
                <RadarDot
                    key={otherProps._id}
                    placeObject={otherProps}
                />))
        )
    }, [orderedPlaces])




    return (
        <Canvas >
            {/* camera={{ position: [0, 0, 20], zoom: 50 }}> */}
            {/* <color attach="background" args={"black"} /> */}
            <color attach="background" args={["blue"]} />
            <Camera position={[0, 0, 20]} />

            {/* <BackgroundRadar> */}

            {/* {props.places.map(({ ...otherProps }) => (
            <RadarDot
                key={otherProps._id}
                placeObject={otherProps}
            />
        ))} */}

            {dotsLimited}


            {/* </BackgroundRadar> */}

        </Canvas >
    )
}

export default RadarView