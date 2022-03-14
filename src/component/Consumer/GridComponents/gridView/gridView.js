import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import { Polyhedron, Plane, RoundedBox, OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

import useStore from '../../useState/index'

// import CameraMain from './camera'
import PlaceMesh from './placeMesh'

import hexSlotFunction from '../functions/hexSlots'
import { VariantContext } from '@material-ui/pickers/wrappers/Wrapper';


extend({ OrbitControls })
extend({ MapControls })

const _hexArray = hexSlotFunction()

const HexHighlight = (props) => {
    // works
    const color1 = new THREE.Color("rgb(225,109,245)")
    const color2 = new THREE.Color("rgb(78,248,231)")

    const [size, setSize] = useState(2.7)
    const highlightRef = useRef()


    const w = 2 * size
    const h = Math.sqrt(3) * size


    const [_color, setColor] = useState(color1)
    const points = [

        new THREE.Vector3(w * -0.25, h * 0.5, 0),
        new THREE.Vector3(w * 0.25, h * 0.5, 0),
        new THREE.Vector3(w * 0.5, 0, 0),
        new THREE.Vector3(w * 0.25, h * -0.5, 0),
        new THREE.Vector3(w * -0.25, h * -0.5, 0),
        new THREE.Vector3(w * -0.5, 0, 0),
        new THREE.Vector3(w * -0.25, h * 0.5, 0),

    ]

    var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    return (
        <line
            geometry={geometry}>
            <lineBasicMaterial attach="material" color="black" linewidth="4" />
        </line> 
    )

}

function CameraMain(props) {
    const cam = useRef()
    const posCoords = useRef()
    const group = useRef()

    const sampleBox = useRef()
    // const [y] = Scroll([-100, 100], { domTarget: window });
  
    const camPos = useStore(state => state.camPosition)

    const setCamPos = useStore((state) => state.setCamPosition)
    const setGridView = useStore((state) => state.setGridView)
    const centerPlace = useStore((state) => state.centerPlace)
    const gridView = useStore((state) => state.gridView)
    const setMaxViewable = useStore((state) => state.setMaxViewable)
    const setMaxViewableDepth = useStore((state) => state.setMaxViewableDepth)
    const previewMode = useStore((state) => state.previewMode)


    const [vec] = useState(() => new THREE.Vector3())
    const set = useThree((state) => state.set);
    const { setDefaultCamera } = useThree()

    useEffect(() => void set({ camera: cam.current }), []);


    useEffect(() => {
        console.log(" read cam pos in camera " + camPos)
        // if (previewMode) {
        //     let x, y, z
        //     x = camPos[0]
        // }


        const previewMarginX = 2
        const previewMarginY = 2
        let x, y, z
        x = previewMode ? camPos[0] * previewMarginX : camPos[0] 
        y = previewMode ? camPos[1] * previewMarginY : camPos[1]
        z = camPos[2] 
        posCoords.current = [x,y,z]
    }, [camPos])


    useFrame(() => {
        if (group.current && posCoords.current) {
            group.current.position.lerp(vec.set(posCoords.current[0], posCoords.current[1], 5), 0.05)

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
        <group ref={group}>
            {/* <a.perspectiveCamera ref={cam} {...props} position-y={y.to((y) => (y / 500))} /> */}

            <HexHighlight position={[0,0,-10]}/>

            <OrthographicCamera ref={cam} zoom={20} {...props} />

            {/* <perspectiveCamera ref={cam} zoom={20} {...props} /> */}


        </group>

    )
}


const GridView = (props) => {

    const camera = useRef()
    const hexGrp = useRef()
    const scrollRef = useRef()
    var raycaster = new THREE.Raycaster();
    const [center2dVec] = useState(() => new THREE.Vector2(0, 0))
    const gridView = useStore((state) => state.gridView)
    const cameraPos = useStore((state) => state.camPosition)
    const setCamPos = useStore((state) => state.setCamPosition)
    const setCenterPlace = useStore((state) => state.setCenterPlace)

    const multiDict = useStore((state) => state.multiDict)
    const setMultiDict = useStore((state) => state.setMultiDict)
    const setOrderedPlacesDict = useStore((state) => state.setOrderedPlacesDict)
    const orderedPlaces = useStore((state) => state.orderedPlaces)
    const setOrderedPlaces = useStore((state) => state.setOrderedPlaces)
    const placeCoordDict = useStore((state) => state.placeCoordDict)
    const setPlaceCoordDict = useStore((state) => state.setPlaceCoordDict)
    const centerPlace = useStore((state) => state.centerPlace)
    const depth1Places = useStore((state) => state.depth1Places)
    const setDepth1Places = useStore((state) => state.setDepth1Places)
    const centerHexPosition = useStore((state) => state.centerHexPosition)
    const setCenterHexPosition = useStore((state) => state.setCenterHexPosition)

    const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition)
    const setDisplacedCenterHexPosition = useStore((state) => state.setDisplacedCenterHexPosition)


    const places = useStore((state) => state.places)
    const filteredPlaces = useState([])


    const [deltaX, setDeltaX] = useState(0)
    const [deltaY, setDeltaY] = useState(0)
    const [shifting, setShifting] = useState(false)

    const [tempCenter, setTempCenter] = useState(null)

    const [camVec] = useState(() => new THREE.Vector3())



    const shiftCamera = (hexIndex) => {
        let cubeVector = _hexArray[hexIndex].coordinate
        let newCoordinateX = cubeVector[0] + displacedCenterHexPosition[0]
        let newCoordinateY = cubeVector[1] + displacedCenterHexPosition[1]
        let newCoordinateZ = cubeVector[2] + displacedCenterHexPosition[2]
        let newCoordinateKey = newCoordinateX + "-" + newCoordinateY + "-" + newCoordinateZ

        let placeShiftedTowards = placeCoordDict[newCoordinateKey]

        if (placeShiftedTowards) {

            setTempCenter(placeShiftedTowards)
            console.log("position exists " + newCoordinateKey + " name " + placeShiftedTowards.company_name)
            // let obj = multiDict[placeShiftedTowards._id]

            // change to placeShiftedTowards.posVector
            if (placeShiftedTowards.posVector) {
                setCamPos(placeShiftedTowards.posVector)
                setCenterPlace(placeShiftedTowards)
                setDisplacedCenterHexPosition([newCoordinateX, newCoordinateY, newCoordinateZ])
                console.log("position exists " + newCoordinateKey + " name " + placeShiftedTowards.company_name)

            } else {
                console.log("shift camera place not in multDct")
            }

        } else {
            console.log("place in position does not exist")
            if (tempCenter) {
                console.log(tempCenter.company_name)
            }
        }
        // setShifting(false)
    }

    const shiftDelta = () => {
        // console.log("shift delta " + deltaX + "  " + deltaY)
        if (deltaX == 0 && deltaY == 0) {
            return
        }
        // setShifting(true)
        var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI

        setDeltaX(0)
        setDeltaY(0)

        if (angle < 0) {
            // console.log("neg angle " + angle)
            angle = 360 + angle
        }

        angle = angle + 90

        if (angle > 360) {
            angle = angle - 360
        }

        for (let i = 1; i < 7; i++) {
            let hexItem = _hexArray[i]
            if ((hexItem.rangeMax < hexItem.rangeMin &&
                (angle >= hexItem.rangeMin || angle < hexItem.rangeMax)) ||
                (angle >= hexItem.rangeMin && angle < hexItem.rangeMax)) {

                console.log(angle + " shift " + i)
                shiftCamera(i)
                break
            }
        }

    }



    const handleScroll = (e) => {
        console.log(e.deltaX + " e.delta " + e.deltaY)

        setDeltaX(deltaX + e.deltaX)
        setDeltaY(deltaY + e.deltaY)
  
    }



    useEffect(() => {
            // set preview

        let threshold = 150
        if ((Math.abs(deltaX) + Math.abs(deltaY)) > threshold) {
            shiftDelta()
        }

        let timer_setDelta = setTimeout(() => {
            // console.log('stop delta!');
            setDeltaX(0)
            setDeltaY(0)
            console.log(deltaX + " stopped x " + deltaY + " stopped y ")

        }, 500);
        // this will clear Timeout when component unmount like in willComponentUnmount
        return () => {
            clearTimeout(timer_setDelta);
        };
    }, [deltaX, deltaY]);



    const boxesLimited = useMemo(() => {
        console.log(orderedPlaces)

        let postBusinessAdjustedPlaces = []
        orderedPlaces.forEach(element => {
            if (element.business) {
                element.default_image_url = element.business[0].default_image_url
                element.company_name = element.business[0].company_name
            }
            postBusinessAdjustedPlaces.push(element)
        })

        return (
            postBusinessAdjustedPlaces.map(({ ...otherProps }, index) => (
                <PlaceMesh
                    _id={otherProps._id}
                    key={otherProps._id}
                    placeObject={otherProps}
                    position={otherProps.posVector}
                    color={otherProps.icon_color}
                    // placeObject={otherProps.business[0]}
                    // hover={hoverPlace}
                    // hovering={setPreview}
                    // click={handleClick}
                    // selectPlace={props.selectPlace}
                />))
        )
    }, [orderedPlaces])


    // <color attach="background" args={["black"]} />

    return (
        <>
        <div style={{width:'100%', height:'100%'}} onWheel={handleScroll}>
            <Canvas 
            color attach="background" args={["transparent"]} >
            {/* mode="concurrent" */}
                {/* camera={{ position: [0, 0, 20], near: 10, far: 60 }}>  */}
                <CameraMain
                    ref={camera}
                    position={[0, 0, 20]} />

                {/* <NewControls /> */}

                {boxesLimited}

                {/* <SingleDetailView /> */}

                <ambientLight intensity={2.0} />

            </Canvas >
        </div>
        </>

    )
}

export default GridView





    // console.log("loading gridThreeJS-------")
    // const setPreview = (hovering) => {
    //     // console.log("setPreview" + hovering)
    //     props.hovering(hovering)
    // }


    // const handleClick = (_place) => {
    //     // ReCenter(_place)
    //     // props.moveCamera(_place)
    // }


    // const hoverPlace = (place) => {
    //     // adjustZ(place)
    //     // setDepth(place)

    //     if (place) {
    //         console.log(place.company_name)
    //         props.selectPlace(place)

    //         // adjustZ(place)
    //     }

    // }