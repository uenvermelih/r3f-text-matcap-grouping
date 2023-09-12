import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"


export default function Experience() {

    const donutsGroup = useRef()

    const [torusGeometry, setTorusGeometry] = useState()

    const [matcapTexture1] = useMatcapTexture("F75F0B_461604_9A3004_FB9D2F", 256)
    const [matcapTexture2] = useMatcapTexture("C8D1DC_575B62_818892_6E747B", 256)


    const tempArray = [...Array(70)]

    useFrame((state, delta) => {

        for(const donut of donutsGroup.current.children) {
            donut.rotation.y += delta * 1
        }

    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />

        <Center>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >

                Hello R3F

                <meshMatcapMaterial matcap={matcapTexture1} />
            </Text3D>

        </Center>


        <group ref={ donutsGroup }>

            {tempArray.map((value, index) =>

                <mesh
                    key={index}
                    geometry={torusGeometry}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}

                    scale={0.2 + Math.random() * 0.2}

                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                >

                    <meshMatcapMaterial matcap={matcapTexture2} />
                </mesh>

            )}

        </group>
    </>
}