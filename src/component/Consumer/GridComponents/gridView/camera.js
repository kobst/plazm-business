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


function CameraMain(props) {
    const cam = useRef()
    // const posCoords = useRef([0, 0, 20])
    const camCoords = useRef()
 
    // const [y] = Scroll([-100, 100], { domTarget: window });
    const setCamPos = useStore((state) => state.setCamPosition)
    const camPos = useStore(state => state.camPosition)


    const setGridView = useStore((state) => state.setGridView)
    const centerPlace = useStore((state) => state.centerPlace)
    const gridView = useStore((state) => state.gridView)
    const setMaxViewable = useStore((state) => state.setMaxViewable)
    const setMaxViewableDepth = useStore((state) => state.setMaxViewableDepth)


    const [vec] = useState(() => new THREE.Vector3())
    

    const set = useThree((state) => state.set);
    const { setDefaultCamera } = useThree()

    useEffect(() => void set({ camera: cam.current }), []);


    // useEffect(() => {
    //     console.log(" read cam pos in camera " + camPos)
    //     posCoords.current = camPos
    // }, [camPos])

    useEffect(() => {
        camCoords.current = [camPos[0], camPos[1], 20]

    }, [camPos])


    useFrame(() => {
        if (cam.current && camCoords.current) {
            cam.current.position.lerp(vec.set(camCoords.current[0], camCoords.current[1], 20), 0.05)

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
    })



    return (
        <group>
            {/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}
            {/* <perspectiveCamera ref={cam} zoom={20} {...props} /> */}
            <OrthographicCamera ref={cam} zoom={10} {...props} />

        </group>

    )
}


//not in use
// export default CameraMain