import React from "react";
import styled from "styled-components";
import * as THREE from 'three';

const ProceedButton = styled.button`
  outline: none;
  border: none;
  background-color: #27b927;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 2em;
  margin-top: 3em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 350ms ease-in-out;
  &:hover {
    background-color: transparent;
    border: 2px solid #27b927;
  }
`;

export function IntroButton() {

  const [proceed, setProceedClicked] = React.useState(false);

  const MoveCamera = () => {
    var camera = new THREE.PerspectiveCamera(0, 0, .1, 1);
    proceed = !proceed; 

    if(proceed)
    {
      camera.position.x = 10; 
      console.log('Test');
      
    }
    // useFrame(({ clock, camera }) => {
    //   camera.position.z = 10 + Math.sin(clock.getElapsedTime()) * 2
    // })
    // return null
  }

  return (
      <ProceedButton onClick='{MoveCamera}'>Proceed to Launch</ProceedButton>
  );
}