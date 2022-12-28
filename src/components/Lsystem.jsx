import React, { Component } from 'react';

import { parse as LParser } from '../lsystem';
import { LevolveSystems } from '../L';
import Turtle from './turtle.jsx';
import LSystemInput from './lsystemInput.jsx';

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, CameraShake } from "@react-three/drei";
import * as three from "three";

class LSystem extends Component {

   constructor(props) {
      super(props);
      this.state = {
         LSystemString: this.props.lsystemstring,
         currentDepth: this.props.depth,
         lstring: null,
         error: <div></div>
      };
      this.handleNewLSystem = this.handleNewLSystem.bind(this);
      this.handleNewInput = this.handleNewInput.bind(this);
   }

   componentDidMount() {
      var LSystemString = this.state.LSystemString;
      var result = LParser(LSystemString);
      LevolveSystems(result, this.state.currentDepth);
      this.setState({
         lstring: result[0].lstring
      });
   }

   handleNewLSystem(newLsystem, depth) {
      var LSystemString = newLsystem;
      try {
         var result = LParser(LSystemString);
      } catch (e) {
         this.setState({
            error: (<small style={{ color: "red" }}>Parsing error:<br /> {"" + e}</small>)
         });
         return;
      }
      LevolveSystems(result, depth);
      this.setState({
         lstring: result[0].lstring,
         currentDepth: depth,
         error: ""
      });

   }

   handleNewInput(val) {
      this.setState({
         currentText: val.target.value
      });
   }

   render() {
      if (this.state.lstring == null) {
         return "<p>Loading...</p>";
      }
      return (
         <div>

            <div
               style={{
                  height: "100vh",
                  width: "100vw",
               }}
            >
               <Canvas
                  concurrent
                  camera={{
                     near: 0.1,
                     far: 1000,
                     zoom: 1,
                     position: [4, 4, 4],
                  }}
                  onCreated={({ gl }) => {
                     gl.setClearColor("#000000");
                  }}
               >
                  <OrbitControls autoRotate={true} autoRotateSpeed={1} />
                  <Suspense fallback={null}>
                     <gridHelper />
                     <pointLight intensity={1.0} position={[10, 1, 5]} />
                     <pointLight intensity={0.7} position={[-10, -1, 5]} />
                     <Turtle lstring={this.state.lstring} />
                  </Suspense>
               </Canvas>
            </div>

            {this.state.error}
            <LSystemInput
               depth={this.props.depth}
               lsystemstring={this.state.LSystemString}
               onHandleNewLSystem={this.handleNewLSystem} />
            <br />
            <a style={{ color: "white" }} href="https://github.com/Ricardicus/lsystem">Link to source code</a><br /><br /><br />
         </div>);
   }

}

export default LSystem;
