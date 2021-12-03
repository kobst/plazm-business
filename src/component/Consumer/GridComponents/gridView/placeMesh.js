
import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, useMemo, Children } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader, applyProps, stateContext } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls, MapControls, MOUSE } from 'three/examples/jsm/controls/OrbitControls'
import { Polyhedron, Plane, RoundedBox, OrthographicCamera } from '@react-three/drei';

import { useSelector } from "react-redux";

import useStore from '../useState/index'

import { Text } from "troika-three-text";
import { useSpring, a } from '@react-spring/three'

import fonts from "./fonts";



extend({ OrbitControls })
extend({ MapControls })
extend({ Text });







const PreviewCard = (props) => {

    const hexRef = useRef()
    const multiDictSub = useStore(state => state.multiDict)
    const centerPlace = useStore(state => state.centerPlace)
    //use spring
    const [active, setActive] = useState(false);

    const { _color, pos, rotation, scale, ...propsSpring } = useSpring({
        _color: active ? 'pink' : 'purple',
        pos: active ? [0, 0, 2] : [0, 0, 0],
        scale: active ? [3.5, 3.5, 3.5] : [0, 0, 0],
        config: { mass: 10, tension: 500, friction: 200, duration: 2000 }
    })


    useEffect(()=>{
        if (props.previewActive){
            setActive(true)
        } else {
            setActive(false)
        }

    }, [props.previewActive])




    // {props.placeObject.itemObjects[0].content}
    return (
        <a.group
            // onClick={e => setActive(!active)}
            // rotation={rotationS}

            scale={scale}
            ref={hexRef}>

            {/* <mesh
                position={[0, 0, 2]}>

                <sphereBufferGeometry args={[0.75, 32, 32]} attach="geometry" />
                {/* <meshBasicMaterial color={0xfff1ef} attach="material" /> */}
                {/* <meshBasicMaterial attach="material" color={'red'} />
            </mesh> */} 


                       
            <mesh
                position={[0, 0, 0]}>
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


}


const HexTile = (props) => {
    // works
    const color1 = new THREE.Color("rgb(225,109,245)")
    const color2 = new THREE.Color("rgb(78,248,231)")

    const multiDictSub = useStore(state => state.multiDict)

    const hexRef = useRef()

    const xOffset = 0.5
    const yOffset = 0.5

    const size = 2.5
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

    const loader = new THREE.TextureLoader();
    const texture = loader.load(props.placeImage);
    texture.offset.set(xOffset, yOffset);
    texture.repeat.set(0.25, 0.25);

     // const texture2 = loader.load(props.listImage);
    // texture2.offset.set(xOffset, yOffset)
    // texture2.repeat.set(0.25, 0.25);

    var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

    var geomShape2 = new THREE.ShapeBufferGeometry(new THREE.Shape(points));

    geomShape2 = geomShape2.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI))

    var targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromEuler(new THREE.Euler(0, 2 * Math.PI, 0));

    //use spring
    const [active, setActive] = useState(true);


    const { color, pos, rotation, scale, ...propsSpring } = useSpring({
        color: active ? 'hotpink' : 'white',
        pos: active ? [0, 0, 2] : [0, 0, 0],
        rotation: active ? [0, 0, 0] : [0, THREE.Math.degToRad(180), 0],
        // loop: { reverse: true },
        // loop: true,
        // reset: true,
        // reverse: true,
        // 'material-opacity': hovered ? 0.6 : 0.25,
        scale: active ? [1.5, 1.5, 1.5] : [0.5, 0.5, 0.5],
        onRest: () => console.log("rest"),
        config: { mass: 10, tension: 500, friction: 200, precision: 0.00001 }
    })

    const { rotationS } = useSpring({
        rotationS: active ? [0, 0, 0] : [0, THREE.Math.degToRad(180), 0],
        config: { mass: 10, tension: 500, friction: 200, precision: 0.00001 }

    })

    useFrame(() => {
        if (hexRef.current) {
            // if (!active) {
            let ran = Math.floor(Math.random() * 40)
            if (ran == 3) {
                setActive(!active)
            }
            // hexRef.current.rotation.y = hexRef.current.rotation.y += 0.01
        }

    })

    return (
        <a.group
            // onClick={e => setActive(!active)}
            // rotation={rotationS}
            // rotation={rotation}
            // scale={5}
            ref={hexRef}>
            <mesh
                geometry={geomShape}>
                {texture && <meshBasicMaterial attach="material" map={texture} side="THREE.DoubleSide" />}
            </mesh>

            {/* <mesh
                geometry={geomShape2}>
                {texture2 && <meshBasicMaterial attach="material" map={texture2} side="THREE.DoubleSide" />}
            </mesh> */}

        </a.group>

    );
};





const Label = ((props) => {

    const textRef = useRef()
    const pivotRef = useRef()
    const coords = useRef([0, 0, 0])

    const multiDictSub = useStore(state => state.multiDict)

    const [opts, setOpts] = useState({
        font: "Roboto",
        fontSize: 1,
        color: "black",
        maxWidth: 1,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: "center",
        materialType: "MeshPhongMaterial"
    });




    useFrame(() => {
        if (coords.current && textRef.current) {
            console.log(coords.current[2])

            if (coords.current[2] < -5) {
                console.log(coords.current[2])
                textRef.current.visible = false
            } else {
                textRef.current.visible = true

            }
        }
    })

    useEffect(() => {
        // console.log("- - multi effect - - ")
        let obj = multiDictSub[props._id]
        if (obj) {
            coords.current = obj.posVector
        }
    }, [multiDictSub])


    return (
        <group
            ref={pivotRef}>
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
                {opts.materialType === "MeshPhongMaterial" ? (
                    <meshPhongMaterial attach="material" color={opts.color} />
                ) : null}
            </text>
        </group>

    )

})



const PlaceMesh = ((props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    const meshGroup = useRef()
    const hexBackground = useRef()

    const plane = useRef()
    const connector = useRef()
    const textRef = useRef()
    const coords = useRef([0, 0, 0])
    const cubes = useRef([])
    const rotation = useRef([0, 0])
    const mapPoint = useRef([0, 0])


    const [preview, setPreview] = useState(false)
    const [depth1, setDepth1] = useState(false)
    const [outerDepth, setOuterDepth] = useState(true)

    const [hovered, setHover] = useState(false)
    const [previewActive, setPreviewActive] = useState(false)
    const [startPos, setStartPos] = useState([-50, 50, 0])
    const [tileColor, setTileColor] = useState("red")
    // const [vecCenter] = useState(() => new THREE.Vector3())

    const [opts, setOpts] = useState({
        font: "Roboto",
        fontSize: 1.0,
        color: "white",
        maxWidth: 1,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: "center",
        materialType: "MeshPhongMaterial"
    });

    const multiDictSub = useStore(state => state.multiDict)
    const centerHexPosition = useStore((state) => state.centerHexPosition)
    const displacedCenterHexPosition = useStore((state) => state.displacedCenterHexPosition)

    const placeCoordDict = useStore((state) => state.placeCoordDict)

    const orderedPlaceDict = useStore((state) => state.orderedPlacesDict)
    const mapPosDict = useStore(state => state.mapPosDict)
    const maxViewable = useStore((state) => state.maxViewable)
    const maxViewableDepth = useStore((state) => state.maxViewableDepth)

    const centerPlace = useStore((state) => state.centerPlace)

    const [vec] = useState(() => new THREE.Vector3())

    const loader = new THREE.TextureLoader();
    const texture = loader.load(props.placeObject.default_image_url);
    

    const { scaleText, ...propsSpring } = useSpring({
        // color: active ? 'hotpink' : 'white',
        // pos: active ? [0, 0, 2] : [0, 0, 0],
        // rotation: active ? [0, 0, 0] : [0, THREE.Math.degToRad(180), 0],
        scaleText: preview ? [2, 2, 2] : [1, 1, 1],
        onRest: () => console.log("rest"),
        config: { mass: 10, tension: 500, friction: 200, precision: 0.00001 }
    })

    useFrame(() => {

        if (meshGroup.current) {
            if (coords.current) {
                meshGroup.current.position.lerp(vec.set(coords.current[0], coords.current[1], coords.current[2]), 0.05)
                // meshGroup.current.lookAt([0.1, 0, 1])
                // meshGroup.current.rotateX(THREE.Math.degToRad(30))
                // meshGroup.current.rotation.x = THREE.Math.degToRad(rotation.current[0])
                // meshGroup.current.rotation.y = THREE.Math.degToRad(rotation.current[1])
                // if (textRef.current) {
                //     if (coords.current[2] < -2) {
                //         textRef.current.visible = false
                //     } else {
                //         textRef.current.visible = true
                //     }
                // }
                //     }
                // }
            } if (mesh.current) {

                mesh.current.rotation.y = mesh.current.rotation.y += 0.01

            }


        }
    })


    useEffect(() => {

        let obj = multiDictSub[props._id]
        if (obj) {
            coords.current = obj.posVector
            cubes.current = obj.cubeCoor
            rotation.current = [obj.xRotation, obj.yRotation]
            let depth = Math.max(Math.abs(cubes.current[0]), Math.abs(cubes.current[1]), Math.abs(cubes.current[2]))

            if (depth === 1) {
                // console.log(props.placeObject.company_name)
                setPreview(false)
                setDepth1(true)
                setOuterDepth(false)
            } if (depth > 1) {
                setPreview(false)
                setDepth1(false)
                setOuterDepth(true)
            }
        }
        // console.log("coor coord" + coords.current)

    }, [multiDictSub])


    useEffect(() => {
        let mapPos = mapPosDict[props._id]
        if (mapPos) {
            mapPoint.current = mapPos.pos
        }

    }, [mapPosDict])


    useEffect(() => {

        console.log("new center place " + centerPlace)
        
        if (centerPlace) {
            if (centerPlace._id === props._id) {

                console.log("set preview " + props.placeObject.company_name)
                setPreviewActive(true)
                setOuterDepth(false)
                setDepth1(false)

            } else {

                setPreviewActive(false)
            }
        }
    }, [centerPlace])



    // console.log(props.placeObject.default_image_url)
    // just use multiDict, and max Viewable
    //if distance (current cubeCoor - centerHexCubeCoor) < maxViewableDepth -> visible
    // useEffect(() => {
    //     let order = orderedPlaceDict[props.placeObject._id]
    //     let maxView = maxViewable
    //     // console.log("ordered place dict change " + order)
    //     if (meshGroup.current) {
    //         if (order > maxView) {
    //             meshGroup.current.visible = false
    //         } else {
    //             meshGroup.current.visible = true
    //         }
    //     }

    // }, [orderedPlaceDict, maxViewable])


    const handleHover = (place) => {
        // props.hovering(true)
        // if (meshGroup.current) {
        //     meshGroup.current.scale.set(1.25, 1.25, 1.25)
        // }
        // props.hover(place)
        // setHover(true)
    }


    const handleLeave = (left_hover) => {
        // props.hovering(left_hover)
        // if (meshGroup.current) {
        //     meshGroup.current.scale.set(1, 1, 1)
        // }
        // // props.hover(null)
        // setHover(false)

        // setHover(left_hover)
    }
    const handleClick = (place) => {

        // props.click(place)
    }




    return (
        <group
            // {...props}
            userData={props.placeObject}
            ref={meshGroup}
            position={[0,0,0]}
            scale={(1, 1, 1)}
            onClick={() => handleClick(props.placeObject)}
            onPointerOver={() => handleHover(props.placeObject)}
            onPointerOut={() => handleLeave(false)}>

            {/* {hovered && depth1 && <OrbitIcons />} */}
            {/* <OrbitIcons >
            </OrbitIcons> */}

            {/* <ConnectorLine
                ref={connector}>
            </ConnectorLine> */}

            {/* {preview && <a.text
                ref={textRef}
                position={[0, 0, 0]}
                scale={scaleText}
                {...opts}
                text={props.placeObject.itemObjects[0].content}
                font={fonts[opts.font]}
                anchorX="center"
                anchorY="top"
            >
                {opts.materialType === "MeshPhongMaterial" ? (
                    <meshPhongMaterial attach="material" color={"white"} />
                ) : null}
            </a.text>} */}

             <PreviewCard position={[0, 0, 10]} previewActive={previewActive}/>

            <HexTile
                innerRef={hexBackground}
                color={tileColor}
                position={[0, 0, 0]}
                // listImage={props.placeObject.listImage}
                placeImage={props.placeObject.default_image_url}
                _id={props._id}>
            </HexTile>

            {/* {depth1 && <text
                ref={textRef}
                position={[0, 0, 2]}
                rotation={[0, 0, 0]}
                {...opts}
                text={props.placeObject.company_name}
                font={fonts[opts.font]}
                anchorX="center"
                anchorY="top"
            >
                {opts.materialType === "MeshPhongMaterial" ? (
                    <meshPhongMaterial attach="material" color={"white"} />
                ) : null}
            </text>} */}


            {/* {(outerDepth || depth1) && <SphereIcon
                position={[0, 0, 0]}
                listImage={props.placeObject.listImage}
                placeImage={props.placeObject.default_image_url}
                _id={props.placeObject._id}>
            </SphereIcon>} */}

     
{/*             
            <mesh
                scale={active ? [1, 1, 1] : [1, 1, 1]}
                position={[0, 0, 2]}
                ref={mesh}>
                <boxBufferGeometry args={[1, 1, 1]} />

                <meshBasicMaterial attachArray="material" map={texture} />
                <meshBasicMaterial attachArray="material" map={texture} />
                <meshBasicMaterial attachArray="material" map={texture} />
                <meshBasicMaterial attachArray="material" map={texture} />
                <meshBasicMaterial attachArray="material" map={texture} />
                <meshBasicMaterial attachArray="material" map={texture} />
            </mesh> */}




            {/* <Label
                ref={textRef}
                id={props.placeObject._id}
                name={props.placeObject.company_name}>
            </Label> */}
            {/* 
            <SpecialLabel /> */}



        </group >
    )
})


export default PlaceMesh