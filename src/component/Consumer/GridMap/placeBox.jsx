import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Suspense, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import useStore from './useState'
// import { useSpring, a } from 'react-spring/three'

import { AssignMolecularDict, _createXYZ, AssignHex, OrderDistance } from './functions/gridFunctions'



const HexTile = (props) => {
    // works
    const color1 = new THREE.Color("rgb(225,109,245)")
    const color2 = new THREE.Color("rgb(78,248,231)")

    const geo = new THREE.PlaneGeometry();
    const hex = new THREE.PlaneGeometry();
    const plane = new THREE.PlaneBufferGeometry(3, 3, 3)
    const hexShape = new THREE.Shape()
    // const h = 3
    const multiDictSub = useStore(state => state.multiDict)

    const hexRef = useRef()

    const size = 2.25
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

    ]

    var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

    useEffect(() => {
        // console.log("- - multi effect - - ")
        let obj = multiDictSub[props._id]
        if (obj) {

            // let gradient = obj.posVector[2] * -0.1
            // let _color = color1.lerp(color2, gradient)
            // setColor(_color)

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

    }, [multiDictSub])

    useFrame(() => {
        if (hexRef.current) {
            // console.log(JSON.stringify(hexRef.current.material))
        }
    })

    return (
        <mesh
            ref={hexRef}
            geometry={geomShape}>
            <meshBasicMaterial attach="material" color={_color} side="THREE.DoubleSide" />
        </mesh>
    );
};


// const OrbitIcons = (props) => {

//     const satellite = useRef()
//     const pivot = useRef()
//     const loader = new THREE.TextureLoader();
//     const texture = loader.load(eater);

//     useFrame(() => {
//         if (pivot.current) {
//             pivot.current.rotation.y = pivot.current.rotation.y += 0.1
//             // pivot.current.rotation.x = pivot.current.rotation.x += 0.1

//         }
//     })



//     return (
//         <group
//             ref={pivot}
//             lookAt={[0, 0, 1]}
//             position={[0, 0, 2]}>
//             <mesh
//                 position={[0, 0, 2]}
//                 ref={satellite}>
//                 <planeBufferGeometry attach="geometry" args={[2, 2]} />

//                 <sphereBufferGeometry args={[0.75, 32, 32]} attach="geometry" />
//                 {/* <meshBasicMaterial color={0xfff1ef} attach="material" /> */}
//                 {texture && <meshBasicMaterial attach="material" map={texture} />}
//             </mesh>
//         </group>

//     );

// }



const Box = ((props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    const meshGroup = useRef()
    const hexBackground = useRef()
    const connector = useRef()
    const textRef = useRef()
    const coords = useRef([0, 0, 0])
    const rotation = useRef([0, 0])
    const mapPoint = useRef([0, 0])

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [startPos, setStartPos] = useState([-50, 50, 0])
    const [tileColor, setTileColor] = useState("red")
    // const [vecCenter] = useState(() => new THREE.Vector3())

    const [opts, setOpts] = useState({
        font: "Roboto",
        fontSize: 0.5,
        color: "black",
        maxWidth: 1,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: "center",
        materialType: "MeshPhongMaterial"
    });

    const multiDictSub = useStore(state => state.multiDict)
    const centerHexPosition = useStore((state) => state.centerHexPosition)

    const orderedPlaceDict = useStore((state) => state.orderedPlaces)
    const mapPosDict = useStore(state => state.mapPosDict)
    const maxViewable = useStore((state) => state.maxViewable)
    const maxViewableDepth = useStore((state) => state.maxViewableDepth)

    const [vec] = useState(() => new THREE.Vector3())

    const loader = new THREE.TextureLoader();
    const texture = loader.load(props.placeObject.default_image_url);

    useFrame(() => {
        if (meshGroup.current) {
            mesh.current.rotation.y = mesh.current.rotation.y += 0.01
            if (coords.current) {
                meshGroup.current.position.lerp(vec.set(coords.current[0], coords.current[1], coords.current[2]), 0.05)
                // meshGroup.current.lookAt([0.1, 0, 1])
                // meshGroup.current.rotateX(THREE.Math.degToRad(30))
                // meshGroup.current.rotation.x = THREE.Math.degToRad(rotation.current[0])
                // meshGroup.current.rotation.y = THREE.Math.degToRad(rotation.current[1])
                if (textRef.current) {
                    if (coords.current[2] < -2) {
                        textRef.current.visible = false
                    } else {
                        textRef.current.visible = true
                    }
                }
            }
        }
    })


    useEffect(() => {
        // console.log("- - multi effect - - ")
        let obj = multiDictSub[props.placeObject._id]
        if (obj) {
            coords.current = obj.posVector
            rotation.current = [obj.xRotation, obj.yRotation]
        }

    }, [multiDictSub])


    useEffect(() => {
        let mapPos = mapPosDict[props.placeObject._id]
        if (mapPos) {
            mapPoint.current = mapPos.pos
        }

    }, [mapPosDict])

    useEffect(() => {
        let order = orderedPlaceDict[props.placeObject._id]
        let maxView = maxViewable
        // console.log("ordered place dict change " + order)
        if (meshGroup.current) {
            if (order > maxView) {
                meshGroup.current.visible = false
            } else {
                meshGroup.current.visible = true
            }
        }

    }, [orderedPlaceDict, maxViewable])


    const handleHover = (place) => {
        // props.hovering(true)
        props.hover(place)
        setHover(true)
    }


    const handleLeave = (left_hover) => {
        // props.hovering(left_hover)
        props.hover(null)
        // setHover(left_hover)
    }
    const handleClick = (place) => {

        props.click(place)
    }


    useEffect(() => {
        const tempCenter = centerHexPosition
        const index = useStore.getState().centerHexPosition

        const newCorner = [tempCenter[0] + 50, tempCenter[1] - 50, 0]
        setStartPos(newCorner)
    }, [])


    return (
        <group
            // {...props}
            userData={props.placeObject}
            ref={meshGroup}
            position={startPos}
            onClick={() => handleClick(props.placeObject)}
            onPointerOver={() => handleHover(props.placeObject)}
            onPointerOut={() => handleLeave(false)}>

            {/* {hovered && <OrbitIcons />} */}
            {/* <OrbitIcons >
            </OrbitIcons> */}

            {/* <ConnectorLine
                ref={connector}>
            </ConnectorLine> */}

            <HexTile
                ref={hexBackground}
                color={tileColor}
                _id={props.placeObject._id}
                position={[0, 0, -10]}>
                {/* <meshBasicMaterial attach="material" color="purple" side="THREE.DoubleSide" /> */}
            </HexTile>

            {/* <Text position={[0, -4.2, 0]} children={props.placeObject.company_name} /> */}

            <mesh
                scale={active ? [2, 2, 2] : [1, 1, 1]}
                position={[0, 0, 2]}
                ref={mesh}>
                <boxBufferGeometry args={[3, 3, 3]} />
                {texture && <meshBasicMaterial attach="material" map={texture} />}
            </mesh>


            {/* <Label
                ref={textRef}
                id={props.placeObject._id}
                name={props.placeObject.company_name}>
            </Label> */}
            {/* 
            <SpecialLabel /> */}

            <text
                ref={textRef}
                position={[0, 0, 5]}
                rotation={[0, 0, 0]}
                {...opts}
                text={props.placeObject.company_name}
                // font={fonts[opts.font]}
                anchorX="center"
                anchorY="top"
            >
                {opts.materialType === "MeshPhongMaterial" ? (
                    <meshPhongMaterial attach="material" color={opts.color} />
                ) : null}
            </text>


        </group>
    )
})


export default Box