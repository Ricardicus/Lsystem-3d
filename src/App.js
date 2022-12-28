import './App.css';

import LSystem from './components/Lsystem';
function App() {
   var LSystemString = `A(g=0) -> 
mov(100/(g+1)+random(-5,5),4/(g+1))
[penUp(0,7)rot(random(-35,-25), random(-30,30))A(g=g+1)] 
[penUp(0,10)rot(random(-5,5), random(-5,5))A(g=g+1)] 
[penUp(0,7)rot(random(25,35), random(-30,30))A(g=g+1)]
`;

   return (
      <div className="App">
         <header className="App-header">
	    <LSystem lsystemstring={LSystemString} lstring={LSystemString} depth={7} />
         </header>
      </div>
   );
}

export default App;
