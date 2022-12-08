import React, {useRef, useState, useEffect, useMemo} from 'react';
import {Canvas, useFrame, useThree, extend} from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import { Polyhedron, Plane, RoundedBox, OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

import useStore from '../useState/index'

import './styles.css'


extend({ OrbitControls })
extend({ MapControls })

// pointy hex
// const points = [
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(0, h * 0.5, 0),
//     new THREE.Vector3(w * 0.5, h * 0.25, 0),
//     new THREE.Vector3(w * 0.5, h * -0.25, 0),
//     new THREE.Vector3(0, h * -0.5, 0),
//     new THREE.Vector3(w * -0.5, h * -0.25, 0),
//     new THREE.Vector3(w * -0.5, h * 0.25, 0)
// ]


const pointsPoity =        [
    new THREE.Vector3(-0, 4.67915522605119, -1.4574704987822955),
    new THREE.Vector3(4.052267294011048, 2.3395776130255945, -1.4574704987822955),
    new THREE.Vector3(4.052267294011048, -2.339577613025594, -1.4574704987822955),
    new THREE.Vector3(5.7303124702972e-16, -4.67915522605119, -1.4574704987822955),
    new THREE.Vector3(-4.052267294011049, -2.339577613025593, -1.4574704987822955),
    new THREE.Vector3(-4.052267294011048, 2.3395776130255945, -1.4574704987822955)
]

const RadarDot = (props) => {

    const [color, setColor] = useState('purple')
    const [color2, setColor2] = useState('red')
    const multiDict = useStore((state) => state.multiDict)
    const centerPlace = useStore((state) => state.centerPlace)
    const coords = useRef()
    const mesh = useRef()

    const [geo, setGeo] = useState()
    const [vec] = useState(() => new THREE.Vector3())

    // useEffect(() => {
        // console.log("- - multi effect - - ")
        // let obj = multiDict[props.placeObject._id]
        // if (obj) {
        //     coords.current = obj.posVector

            // console.log(obj.cubeCoor + " " + props.placeObject.company_name)

            // if (obj.posVector[2] < -2) {
            //     setColor("blue")
            // } else if (obj.posVector[2] < -1)
            //     setColor("magenta")
            // else if (obj.posVector[2] < 0) {
            //     setColor("yellow")
            // } else {
            //     setColor("red")
            // }
    //     }

    // }, [multiDict])

    useEffect(() => {
        coords.current = props.position
        let _color = props.color
        setColor(_color)
        if (_color = "red") {

        }
    
    }, [props.position])

    // useEffect(() => {
    //     if (centerPlace) {
    //         if (centerPlace._id === props.placeObject._id) {
    //             setColor('red')
    //         } else {
    //             setColor('purple')
    //         }
    //     }
    // }, [centerPlace])

    useFrame(() => {

        if (mesh.current) {
            if (coords.current) {
                mesh.current.position.lerp(vec.set(coords.current[0], coords.current[1], 0), 0.05)
            }
        }
    })

    return (
        <group 
            ref={mesh}
            position={[0, 0, 0]}>
            <mesh>
                 <circleGeometry args={[1, 32]} attach="geometry" />
                <meshBasicMaterial attach="material" color={color} />
            </mesh>

        {/* <line
            geometry={geometry}>
            <lineBasicMaterial attach="material" color="black" linewidth="4" />
        </line>  */}
   
        </group>

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
        console.log("move grid cam")
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
    const cameraPos = useStore((state) => state.camPosition)
    const centerPlace = useStore((state) => state.centerPlace)
    const multiDict = useStore((state) => state.multiDict)
    const orderedPlaces = useStore((state) => state.orderedPlaces)





    const dotsLimited = useMemo(() => {
        // console.log(orderedPlaces)

        return (
            orderedPlaces.map(({ ...otherProps }, index) => (
                <RadarDot
                    key={otherProps._id}
                    placeObject={otherProps}
                    color={otherProps.icon_color}
                    position={otherProps.posVector}
                />))
        )
    }, [orderedPlaces])




    return (
        <div className="radar-container">
        <Canvas>
            {/* camera={{ position: [0, 0, 20], zoom: 50 }}> */}

            <color attach="background" args={["black"]} />
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
        </div>

    )
}

export default RadarView
