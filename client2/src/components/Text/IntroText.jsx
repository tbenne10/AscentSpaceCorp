import React from "react";
import styled from "styled-components";
import { Canvas, useFrame } from '@react-three/fiber';
import { Camera } from "three";
import { useRef, useState} from 'react';
import { OrbitControls, Stars} from '@react-three/drei';
import { Suspense } from "react";
import * as THREE from 'three';


const IntroContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;
  z-index: 99;
`;

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 800;
  font-size: 80px;
  font-family: 'Space Mission' !important;
`;

const Subtitle = styled.h4`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 10px;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-top: 3em;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  max-width: 30%;
  text-align: center;
`;

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

export function IntroText() {

  const [proceed, setProceedClicked] = React.useState(false);

  const MoveCamera = () => {
    var camera = new THREE.PerspectiveCamera(0, 0, .1, 1);
    proceed = !proceed; 

    if(proceed)
    {
      camera.position.x = 10; 
      
    }
    // useFrame(({ clock, camera }) => {
    //   camera.position.z = 10 + Math.sin(clock.getElapsedTime()) * 2
    // })
    // return null
  }

  return (
    <IntroContainer>
      <Title>Think Beyond</Title>
      <Subtitle>ASCENT Corp Space Exploration</Subtitle>
      <Paragraph>
        The stars are no longer the limit with a journey through space, personalized for you.
      </Paragraph>
      <ProceedButton onClick='{MoveCamera}'>Proceed to Launch</ProceedButton>
    </IntroContainer>
  );
}