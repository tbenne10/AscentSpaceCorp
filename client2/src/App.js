import './App.css';
import Globe from './components/Globe';
import styled from "styled-components";
import { useRef, useState, useEffect, Suspense, useCallback} from 'react';
import { ThemeProvider } from "styled-components";
import { OrbitControls, Stars, Loader, Text, Html, useGLTF, useTexture, Shadow, meshBounds, useAnimations, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { IntroText } from './components/Text/IntroText';
import { GlobalStyles } from './fonts/GlobalStyles';
import {APITest2} from './components/Utilities/APITest2';
import * as THREE from 'three';
// We take the "a" element from /three here because we want to animate threejs objects
import { a } from "@react-spring/three"
import axios from 'axios';

function App() {

  const deg2rad = degrees => degrees * (Math.PI / 180);

  function Rocket({ ...props }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/rocket.gltf')
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      group.current.rotation.x = Math.PI / 7.25 + Math.cos(t / 4) / 8
      group.current.rotation.y = Math.sin(t / 4) / 8
      group.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
      group.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    })
    const { actions } = useAnimations(animations, group)
    return (
      <group ref={group} {...props} dispose={null} scale={.015} position={props.position}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="648d44d75b514670a133ce6e37da93c6fbx" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_2">
                <group name="RootNode">
                  <group name="Object_4">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_6" position={[11.77, 51.4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_8" position={[5.22, 89.68, 2.62]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_10" position={[-97.65, 51.4, 35.25]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_12" position={[-97.65, 51.4, -35.25]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_14" position={[-97.65, 16.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_16" position={[-97.65, 86.65, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Sphere001" position={[11.77, 51.4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Sphere004" position={[5.22, 89.68, 2.62]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Plane004" position={[-97.65, 51.4, 35.25]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Plane005" position={[-97.65, 51.4, -35.25]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Plane006" position={[-97.65, 16.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Plane007" position={[-97.65, 86.65, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.rocket_mtl} skeleton={nodes.Object_7.skeleton} />
                    <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.character_mtl} skeleton={nodes.Object_9.skeleton} />
                    <skinnedMesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.fire_mtl} skeleton={nodes.Object_11.skeleton} />
                    <skinnedMesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.fire_mtl} skeleton={nodes.Object_13.skeleton} />
                    <skinnedMesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.fire_mtl} skeleton={nodes.Object_15.skeleton} />
                    <skinnedMesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.fire_mtl} skeleton={nodes.Object_17.skeleton} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    )
  }

  function Caption({ children }) {
    const { width } = useThree((state) => state.viewport)
    return (
      <Text
        position={[10, 0, -5]}
        lineHeight={0.8}
        font="/SpaceMission.otf"
        fontSize={width / 12}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle">
        {children}
      </Text>
    )
  }

  const vec = new THREE.Vector3()

  const cameraPositionVector3 = new THREE.Vector3(0, 0, 0);

  // const moveCameraPosition = poiLocation => {
  //   const speed = 0.1;

  //   let curPosX = cameraPositionVector3.x;
  //   let curPosY = cameraPositionVector3.y;
  //   let curPosZ = cameraPositionVector3.z;

  //   let finalPosX = poiLocation[0];
  //   let finalPosY = poiLocation[1];
  //   let finalPosZ = poiLocation[2];

  //   TODO: figure out float parsing. 
  //   if(cameraPositionVector3.x !== finalPosX)
  //   {
  //     cameraPositionVector3.x = curPosX > finalPosX
  //       ? curPosX - speed : curPosX + speed;
  //   }

  //   if(cameraPositionVector3.y !== finalPosY)
  //   {
  //     cameraPositionVector3.y = curPosY > finalPosY 
  //     ? curPosY - speed : curPosY + speed;
  //   }

  //   if(cameraPositionVector3.z !== finalPosZ)
  //   {
  //     cameraPositionVector3.z = curPosZ > finalPosZ
  //     ? curPosZ - speed : curPosZ + speed;
  //   }

  //   return cameraPositionVector3;
  // };

  const moveCameraPosition = poiLocation => {
    const speed = 0.25;
    let nextPosX = poiLocation[0];
    let nextPosY = poiLocation[1];
    let nextPosZ = poiLocation[2];
  
    if (
      !(
        cameraPositionVector3.x - speed <= nextPosX &&
        cameraPositionVector3.x + speed >= nextPosX
      )
    ) {
        nextPosX = cameraPositionVector3.x +=
        nextPosX > cameraPositionVector3.x ? speed : -speed;
    }
  
    if (
      !(
        cameraPositionVector3.y - speed <= nextPosY &&
        cameraPositionVector3.y + speed >= nextPosY
      )
    ) {
        nextPosY = cameraPositionVector3.y +=
        nextPosY > cameraPositionVector3.y ? speed : -speed;
    }
  
    if (
      !(
        cameraPositionVector3.z - speed <= nextPosZ &&
        cameraPositionVector3.z + speed >= nextPosZ
      )
    ) {
      nextPosZ = cameraPositionVector3.z +=
        nextPosZ > cameraPositionVector3.z ? speed * 2 : -speed * 2;
    }
  
    cameraPositionVector3.x = nextPosX;
    cameraPositionVector3.y = nextPosY;
    cameraPositionVector3.z = nextPosZ;
  
    return cameraPositionVector3;
  };
  

  const goToLocation = poiLocation =>
  {
    let finalPosX = poiLocation[0];
    let finalPosY = poiLocation[1];
    let finalPosZ = poiLocation[2];

    cameraPositionVector3.x = finalPosX; 
    cameraPositionVector3.y = finalPosY; 
    cameraPositionVector3.z = finalPosZ; 

    return cameraPositionVector3;
  }


  function ProceedButton({ time, camera, ...props }) {
    const [clicked, setClicked] = useState(false)
    const [movedCameraOnce, setMoveCameraOnceComplete] = useState(false)
    const click = e => { 
      var initPos = [0, 0, 5];
      goToLocation(initPos);
      setClicked(true); 
    }

    useFrame(({ camera }) => {
      if (clicked) {
        var cameraPos = [0, 0, 13] //-30, -30, 10
        var res = moveCameraPosition(cameraPos);
        console.log(res);
        camera.position.set(res.x, res.y, res.z);
        camera.fov = 75; 
        if (camera.position.x === cameraPos[0] && camera.position.y === cameraPos[1] && camera.position.z === cameraPos[2]) {
          setClicked(false); 
          setMoveCameraOnceComplete(true); 
        }
      }
      if(movedCameraOnce)
      {
        var cameraPos2 = [-29.5, -2, 1];
        var res2 = moveCameraPosition(cameraPos2);
        camera.position.set(res2.x, res2.y, res2.z);
        if (camera.position.x === cameraPos2[0] && camera.position.y === cameraPos2[1] && camera.position.z === cameraPos2[2]) {
          setMoveCameraOnceComplete(false);
        }
      }
    });

    return (
      <mesh {...props}>
        <Html >
          <div>
            <button onClick={click} hidden={clicked} class="button">Purchase Tickets</button>
          </div>
        </Html>
      </mesh>
    )
  }

  function RapydEntry({ ...props }) {
    const [successMessageDisplayed, setSuccessMessageDisplayed] = useState(false);

    const [walletID, setWalletID] = useState('');
    const [currency, setCurrency] = useState('');
    const [country, setCountry] = useState('');
    const [amount, setAmount] = useState(0);

    const [issuedAccount, setIssuedAccount] = useState('');

    const [total, setTotal] = useState(0);

    const generateAccountClick = e => { 
      let body = {
        country: country,
        currency: currency,
        ewallet: walletID,
        amount: amount, 
      };

      fetch('/CreateVirtualAccount', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result); 
        let accountNum = result.body.body.data.id;
        console.log(`Issuing ID: ${accountNum}`);
        setIssuedAccount(accountNum); 

        //TODO: this is set up to fetch account for later. 
        // fetch('/ListVirtualAccounts', {
        //   method: "POST",
        //   headers: {
        //     'Content-type': 'application/json'
        //   },
        //   body: JSON.stringify(body)
        // })
        // .then((response) => response.json())
        // .then((result) => {
        //    console.log('made it to result');
        //    console.log(result); 
        //    for (let acct of result.body.body.data.bank_accounts){
        //       if(acct.currency.includes(currency)){
        //         console.log(`Issued account: ${acct.issuing_id}`);
        //         setIssuedAccount(acct.issuing_id);
        //       }


        //    }
        // })
      })

    }

    const submitPaymentClick = e => { 
      let body = {
        currency: currency,
        amount: amount, 
        issued_bank_account: issuedAccount
      };

      fetch('/BankTransfer', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((response) => response.json())
      .then((result) => {
         console.log(result); 
         setTotal(Number(total) + Number(amount)); 
         if(Number(total) >= 1000)
          setSuccessMessageDisplayed(true); 
      })
    }

    return (
      <mesh {...props}>
        <Html >
          <div>
            <p class="formtext">Enter a wallet ID to create an account number: </p>
            <input class="input" onInput={e => setWalletID(e.target.value)}/>
            <p class="formtext">Enter your currency code: </p> 
            <input class="input" onInput={e => setCurrency(e.target.value)}/>
            <p class="formtext">Enter your country code: </p> 
            <input class="input" onInput={e => setCountry(e.target.value)}/>
            <button class="button2" onClick={generateAccountClick}>Generate/View Account</button>
            <p class="largetext">{total}/1,000$ </p> 
            <p class="formtext">Enter an amount to add: </p> 
            <input class="input" pattern="[0-9]*" onInput={e => setAmount(e.target.value)}/>
            <button class="button2" onClick={submitPaymentClick}>Post Payment</button>
            { successMessageDisplayed ? <p class="largetext">It's Space Time :) </p>  : null }
          </div>
        </Html>
      </mesh>
    )
  }

  const CanvasContainer = styled.div`
    width: 100%; 
    height: 100%
  `;

  const camera = useRef();
  const cameraConfig = {ref:camera, fov: 75, position: cameraPositionVector3};

  return (
      <CanvasContainer>
        <Canvas concurrent>
          <perspectiveCamera {...cameraConfig}> 
              <Suspense fallback={null}>
                <pointLight color="#f6f3ea" position={[5, -1, 5]} intensity={1.6} />
                <Stars
                  radius={400}
                  depth={60}
                  count={20000}
                  factor={7}
                  saturation={0}
                  fade={true}
                  speed = {10}
                />
                <Globe position={[-2, 0, 0]}/>
                <Caption>{`ASCENT\nSPACE CORP\nTourism Program`}</Caption>

                <ProceedButton position={[5, -1, -2]} />
                <RapydEntry position={[-30, 0, -2]}/>
                <Suspense fallback={null}>
                  <ambientLight />
                  <PresentationControls
                    global
                    config={{ mass: 20, tension: 30 }}
                    snap={{ mass: 4, tension: 100 }}

                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
                      <Rocket position={[-38, -10, -9]}/>
                  </PresentationControls>
                  {/* <OrbitControls enableRotate={true} /> debug*/}
                </Suspense>
              
              </Suspense>
            </perspectiveCamera>
        </Canvas>
        <Loader />
        <APITest2 />
      </CanvasContainer>
  );
}

export default App;
