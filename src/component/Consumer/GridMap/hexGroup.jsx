import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Suspense, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import useStore from './useState'
// import { useSpring, a } from 'react-spring/three'

import { AssignMolecularDict, _createXYZ, AssignHex, OrderDistance } from './functions/gridFunctions'

import Box from './placeBox'



const HexGroup = (props) => {

    const setMultiDict = useStore((state) => state.setMultiDict)
    const setOrderedPlaces = useStore((state) => state.setOrderedPlaces)

    const multiDict = useStore((state) => state.multiDict)
    const setCenterId = useStore((state) => state.setCenterId)
    const centerId = useStore((state) => state.centerId)
    const setCenterPlace = useStore((state) => state.setCenterPlace)
    const centerPlace = useStore((state) => state.centerPlace)
    const centerHexPosition = useStore((state) => state.centerHexPosition)
    const setCenterHexPosition = useStore((state) => state.setCenterHexPosition)

    const hovering = useStore((state) => state.hovering)
    const setHovering = useStore((state) => state.setHovering)
    const gridView = useStore((state) => state.gridView)

    const hexGroup = useRef()


    var raycaster = new THREE.Raycaster();
    const [center2dVec] = useState(() => new THREE.Vector2(0, 0))

    const zFactor = -1

    // console.log("loading hexGroup: ", props.places.length)

    useFrame(state => {

        // need to disable when the grid is being shifted as the camera moves to clicked place.
        // set a boolean
        raycaster.setFromCamera(center2dVec, state.camera)
        var intersects = raycaster.intersectObjects(state.scene.children, true);
        if (intersects[0]) {
            // console.log(" intersects " + intersects[0].object.parent.userData.company_name)
            let _place = intersects[0].object.parent.userData
            // console.log(" intersects " + JSON.stringify(intersects[0].object.parent.userData.company_name))

            if (_place.company_name) {
                setCenterPlace(_place)
                // props.selectPlace(_place)

            }
            // setCenterPlace(_place)
            // console.log(" intersects " + JSON.stringify(intersects[0].object.parent.position))
            // setCenterHexPosition(intersects[0].object.parent.position)
        }

    })




    useEffect(() => {
        console.log("grid view change")
        if (hexGroup.current) {
            if (gridView) {
                hexGroup.current.visible = true
            }

            if (!gridView) {
                hexGroup.current.visible = false
            }
        }
    }, [gridView])

    useEffect(() => {
        console.log("initial props places")
        ReCenter(null)
    }, [props.places])


    //called to update the grid and re-assign positions of all the places with the 'place' as the new center location
    const ReCenter = (place) => {
        //props.selectPlace(place)
        const tilt = 10
        let _multiDict
        let _vect = [0, 0, 0]
        if (place) {
            console.log("----place---" + place.company_name)
            props.selectPlace(place)
            const index = useStore.getState().multiDict
            const placeObj = index[place._id]

            if (placeObj) {
                _vect = placeObj.posVector
                setCenterHexPosition(_vect)
            }

            _multiDict = AssignMolecularDict(props.places, props.center, place)
            const newMultiDict = {}
            props.places.forEach((element) => {
                let obj = _multiDict[element._id]
                let _cubeCoor = obj.cubeCoor
                let _posVector = obj.posVector
                // let dist = Math.max(Math.abs(cubeCoor[0] - newCenterCoord[0]), Math.abs(cubeCoor[1] - newCenterCoord[1]), Math.abs(cubeCoor[2] - newCenterCoord[2]))
                let dist = Math.max(Math.abs(_cubeCoor[0]), Math.abs(_cubeCoor[1]), Math.abs(_cubeCoor[2]))
                // let dist = Math.max(Math.abs((_cubeCoor && _cubeCoor[0]) - newCenterCoord[0]), Math.abs((_cubeCoor && _cubeCoor[2]) - newCenterCoord[2]))
                let zDepth = dist * zFactor
                let newX = _posVector[0] + _vect[0]
                let newY = _posVector[1] + _vect[1]

                // let newPos = [newX, newY, zDepth]
                let newPos = [newX, newY, zDepth]
                let yRotation = (_cubeCoor[0]) * tilt
                let xRotation = ((_cubeCoor[0] / 2) + (_cubeCoor[2])) * tilt
                let newObj = { cubeCoor: _cubeCoor, posVector: newPos, xRotation: xRotation, yRotation: yRotation }
                newMultiDict[element._id] = newObj
            })
            setMultiDict(newMultiDict)
        } else {
            console.log("----no place")

            if (props.places.length > 0) {
                console.log(props.places.length + " length ---")
                console.log(props.places)
                // _multiDict = AssignMolecularDict(props.places, props.center)
                // setMultiDict(_multiDict)
            }
        }
    }

    useEffect(() => {
        if (centerPlace) {
            console.log("new center " + centerPlace.company_name)
            adjustZ(centerPlace)
        }
        let timer1 = setTimeout(() => ReCenter(centerPlace), 2000);
        // this will clear Timeout when component unmount like in willComponentUnmount
        return () => {
            clearTimeout(timer1);
        };
    }, [centerPlace]);



    const setPreview = (hovering) => {
        props.hovering(hovering)
    }

    const hoverPlace = (place) => {
        // adjustZ(place)
        // setDepth(place)

        if (place) {
            setHovering(true)
            console.log(place.company_name)
            props.selectPlace(place)

            // adjustZ(place)
        }

        // else {
        //     console.log(" else no place hover")
        //     setHovering(false)
        //     if (centerPlace) {
        //         console.log(centerPlace.company_name + " center no ")
        //         ReCenter(centerPlace)
        //     }

    }




    const adjustZ = (place) => {
        const tilt = 10
        console.log(place.company_name)
        const _multiDict = useStore.getState().multiDict
        var newCenterCoord = [0, 0, 0]

        let placeObj = _multiDict[place._id]

        if (placeObj) {
            newCenterCoord = placeObj.cubeCoor
        }

        let newCenter = {}
        newCenter.lat = place.location.coordinates[1]
        newCenter.lng = place.location.coordinates[0]

        let orderedPlaces = OrderDistance(props.places, newCenter)
        let orderDict = {}
        orderedPlaces.forEach((element, index) => {
            orderDict[element._id] = index
        })
        setOrderedPlaces(orderDict)


        const newMultiDict = {}
        for (let key in _multiDict) {
            let obj = _multiDict[key]
            let _cubeCoor = obj.cubeCoor
            let _posVector = obj.posVector
            let dist = Math.max(Math.abs(_cubeCoor[0] - newCenterCoord[0]), Math.abs(_cubeCoor[1] - newCenterCoord[1]), Math.abs(_cubeCoor[2] - newCenterCoord[2]))
            let zDepth = dist * zFactor
            let newPos = [_posVector[0], _posVector[1], zDepth]
            // let newPos = [_posVector[0], _posVector[1], 0]
            let yRotation = (_cubeCoor[0] - newCenterCoord[0]) * tilt
            let xRotation = (((_cubeCoor[0] - newCenterCoord[0]) / 2) + (_cubeCoor[2] - newCenterCoord[2])) * tilt
            // console.log(_cubeCoor)
            // console.log("rotation " + xRotation + " " + yRotation)
            let newObj = { cubeCoor: _cubeCoor, posVector: newPos, xRotation: xRotation, yRotation: yRotation }
            newMultiDict[key] = newObj

        }
        setMultiDict(newMultiDict)
    }


    const handleClick = (_place) => {
        ReCenter(_place)
        props.moveCamera(_place)
    }


    const boxes = useMemo(() => props.places.map(({ ...otherProps }, index) => (

        <Box
            key={otherProps._id} placeObject={otherProps}
            hover={hoverPlace}
            hovering={setPreview}
            click={handleClick}
            selectPlace={props.selectPlace}
        />

    )), [props.places])



    const connectorLines = useMemo(() => {

    })


    return (
        <mesh
            ref={hexGroup}
            position={[0, 0, 0]}>
            {/* {boxes} */}

        </mesh>
    )

}

export default HexGroup


