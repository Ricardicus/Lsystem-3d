import React, { Component } from 'react';

import { Lexecute } from '../L';
import { Stack } from '../stack.js';

import { Suspense, useRef, useLayoutEffect, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as three from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js"

var cylinderMesh = function(pointX, pointY) {
   // edge from X to Y
   var direction = new three.Vector3().subVectors(pointY, pointX);
   var arrow = new three.ArrowHelper(direction, pointX);

   // cylinder: radiusAtTop, radiusAtBottom, 
   //     height, radiusSegments, heightSegments
   var edgeGeometry = new three.CylinderGeometry(2, 2, direction.length(), 6, 4);

   var edge = new three.Mesh(edgeGeometry,
      new three.MeshBasicMaterial({ color: 0x0000ff }));
   edge.rotation = arrow.rotation.clone();
   edge.position = new three.Vector3().addVectors(pointX, direction.multiplyScalar(0.5));
   return edge;
}

function Cylinder3d({ pointX, pointY, width }) {
   // This reference gives us direct access to the three.Mesh object
   var a = new three.Vector3(pointX[0], pointX[1], pointX[2]);
   var b = new three.Vector3(pointY[0], pointY[1], pointY[2]);

   var direction = new three.Vector3().subVectors(b, a);

   const ref = useRef();
   // Hold state for hovered and clicked events
   const [hovered, hover] = useState(false);
   const [clicked, click] = useState(false);

   // Subscribe this component to the render-loop, rotate the mesh every frame
   useFrame((state, delta) => {
      //ref.current.rotation = arrow.rotation.clone();var cylinderMesh = function( pointX, pointY )
      {
      }
      //ref.current.position = new three.Vector3().addVectors(pointX, direction.multiplyScalar(0.5));

      //ref.current.rotation.y += 1;
   });

   var position = new three.Vector3().addVectors(a, direction.multiplyScalar(0.5));

   useLayoutEffect(() => {
      if (ref.current) {
         var arrow = new three.ArrowHelper(direction.clone().normalize(), a);
         var rot = new three.Euler().setFromQuaternion(arrow.quaternion);

         ref.current.rotation.copy(rot);
         ref.current.position.x = (b.x + a.x) / 2;
         ref.current.position.y = (b.y + a.y) / 2;
         ref.current.position.z = (b.z + a.z) / 2;
         //ref.current.position = new three.Vector3().addVectors( a, direction.multiplyScalar(0.5));
      }
   }, [pointX, pointY, width, direction])

   // Return the view, these are regular Threejs elements expressed in JSX
   var m = (
      <mesh
         ref={ref}
         position={position}
         scale={clicked ? 1.5 : 1}
         onClick={(event) => click(!clicked)}
         onPointerOver={(event) => hover(true)}
         onPointerOut={(event) => hover(false)}
      >
         <cylinderGeometry args={[width, width, direction.length() * 2, 10]} />
         <meshStandardMaterial
            color={hovered ? "hotpink" : "white"}
         />
      </mesh>
   );
   return m;
}

const Cylinders = ({ points }) => {
   console.log("cylinders..");
   /*var pointsSeen = [];
   for ( var i = 0; i < points.length; i++ ) {
      var addThis = true;
      for ( var q = 0; q < pointsSeen.length; q++ ) {
         var pi = points[i];
         var pq = pointsSeen[q];
         if ( pi.X[0] == pq.X[0] && pi.X[1] && pq.X[1] && pi.X[2] == pq.X[2] && 
               pi.Y[0] == pq.Y[0] && pi.Y[1] && pq.Y[1] && pi.Y[2] == pq.Y[2] ) {
            addThis = false;
            break;
         }
      }
      if ( addThis ) {
         pointsSeen.push(points[i]);
      }
   }*/
   return (<>
      {points.map(point => ( //<>
         <Cylinder3d key={point.key} pointX={point.X} pointY={point.Y} width={point.width} />
         // <Cube position={[1,0,0]} /></>
      ))}
   </>)
};

const Cube = ({ position }) => {
   const cube = useRef();

   useFrame(() => {
      //cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;
   });

   return (
      <mesh ref={cube} position={position}>
         <boxBufferGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color="#FFFFFF" />
      </mesh>
   );
};


class Turtle extends Component {

   constructor(props) {
      super(props);

      this.start = true;
      this.stack = new Stack();
      this.handles = {
         pop: () => { this.pop(); },
         push: () => { this.push(); },
         rotate: (args) => { this.rotate(args); },
         move: (args) => { this.move(args); },
         penUp: (args) => { this.penUp(args); },
         penDown: (args) => { this.penDown(args); },
         context: (args) => { return this.contextFunc(args); }
      };
      this.ctx = false;
      this.pitch = 0;
      this.yaw = 0;
      this.lstringExe = "";
      this.generatePointsThread = null;
      this.ticks = 0;

      this.penDown = true;
      this.widthFactor = 0.01;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.maxOmega = 0;
      this.moveFactor = 0.00001 * window.innerHeight;
      if (this.generatePointsThread != null) {
         clearTimeout(this.generatePointsThread);
      }
      this.maxX = 0;
      this.maxY = 0;
      this.maxZ = 0;
      this.generatePoints = this.generatePoints.bind(this);
      this.generatePoints(props.lstring);
      this.state = {
         isFetching: false,
         latest: null,
         points: this.points,
      };


   }

   generatePoints(lstring) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.maxX = 0;
      this.maxY = 0;
      this.maxZ = 0;
      this.pitch = 0;
      this.yaw = 0;
      this.points = [];
      this.penDown = true;
      Lexecute({ lstring: lstring }, this.handles);
      this.ticks = (this.ticks + 1) % (360 * 1000);
      //this.generatePoints();
      //this.generatePointsThread = setTimeout(this.generatePoints, 1000);
   }

   componentDidMount() {
      console.log("turtle mounted");
   }

   shouldComponentUpdate(nextProps) {
      // Check state points and see if they match # mov instructions
      this.generatePoints(nextProps.lstring);
      if (this.points.length != this.renderedPoints.length) {
         return true;
      } else {
         for (var i = 0; i < this.points.length; i++) {
            var a = this.points[i].X;
            var b = this.renderedPoints[i].X;
            if (a[0] != b[0] || a[1] != b[1] || a[2] != b[2]) {
               return true;
            }
         }
      }
      return false;
   }

   componentDidUpdate(props) {
      this.setState({ points: this.points });
   }

   render() {
      this.renderedPoints = [...this.state.points];
      console.log("turtle render ", this.state.points.length, " points");
      return (<>
         <Cylinders key="points" points={this.state.points} />
      </>
      );
   }

   penUp(args) {
      if (args.length == 0) {
         this.penDown = false;
      } else if ( args.length == 1 ) {
         if ( parseInt(args[0]) == 0 ) {
            this.penDown = false;
         }
      } else {
         if ( parseInt(args[0]) == parseInt(args[1]) ) {
            this.penDown = false;
         }
      }
   }

   penDown(args) {
      this.penDown = true;
   }

   push() {
      this.stack.push({ x: this.x, y: this.y, z: this.z, pitch: this.pitch, yaw: this.yaw, penDown: this.penDown });
   };

   pop() {
      var st = this.stack.pop();
      this.x = st.x;
      this.y = st.y;
      this.z = st.z;
      this.pitch = st.pitch;
      this.yaw = st.yaw;
      this.penDown = st.penDown;
   };

   contextFunc(args) {
      return this.ticks;
   }

   rotate(args) {
      this.pitch += args[0];
      if (args.length > 1) {
         this.yaw += args[1];
      }
      if (this.maxOmega < this.pitch) {
         this.maxOmega = this.pitch;
      }
   };
   Norm(arr) {
      let Squares = arr.map((val) => (val * val));
      let Sum = Squares.reduce((acum, val) => (acum + val));

      return Math.sqrt(Sum);
   }

   move(args) {
      var R = this.moveFactor * args[0];
      var dx = R * Math.cos((180 - (this.pitch / 360.0)) * Math.PI * 2);
      var dy = R * Math.sin((this.yaw / 360.0) * Math.PI * 2);
      var dz = R * (Math.sin((this.pitch / 360.0) * Math.PI * 2));
      var newX = this.x + dy;
      var newY = this.y + dx;
      var newZ = this.z + dz;
      if ( this.penDown ) {
         //      console.log("newX", newX, "newY", newY, "newZ", newZ, "pitch", this.pitch, "yaw", this.yaw);
         var point = { key: "point-" + (this.points.length + 1), X: [this.x, this.y, this.z], Y: [newX, newY, newZ], width: args[1] * this.widthFactor };
         this.points.push(point);
      }
      this.x = newX;
      this.y = newY;
      this.z = newZ;

      if (this.maxX < Math.abs(this.x)) {
         this.maxX = Math.abs(this.x);
      }
      if (this.maxY < Math.abs(this.y)) {
         this.maxY = Math.abs(this.y);
      }
      if (this.maxZ < Math.abs(this.z)) {
         this.maxZ = Math.abs(this.z);
      }

   };

}
export default Turtle;
