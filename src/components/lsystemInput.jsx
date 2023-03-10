import React, { Component } from 'react';

class LSystemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentText: this.props.lsystemstring,
			chosenDepth: this.props.depth
		};
      // Some presaved configurations:
      this.presavedConfigs = [{
         lsystem: `A(g=0) -> 
mov(100/(g+1)+random(-5,5),4/(g+1))
[penUp(0,7)rot(random(-35,-25), random(-30,30))A(g=g+1)] 
[penUp(0,10)rot(random(-5,5), random(-5,5))A(g=g+1)] 
[penUp(0,7)rot(random(25,35), random(-30,30))A(g=g+1)]
`,
         depth: 7
      },{
         lsystem: `A(g=0) ->
rot(0.5 + 0.1*(0.5*sin(context(0)*7)),1)
mov(5,1)
A(g=0)
A(g=0)
rot(-22.5)
[
  rot(-22.5)
  A(g=0)
  rot(22.5)
  A(g=0)
  rot(22.5)
  A(g=0)
]
rot(22.5)
[
  rot(22.5)
  A(g=0)
  rot(-22.5)
  A(g=0)
  rot(-22.5)
  A(g=0)
]`,
         depth: 5
      }, {
         lsystem: `A(g=0) -> 
mov(35,2)
[rot(60)A(g=g+1)] 
[rot(-60)A(g=g+1)]`,
         depth: 10
      },
         {
         lsystem: `A() ->
B()
[rot(20, random(-20,20))A()]
B()
[rot(-20, random(-20,20))A()]
rot(20, random(-20,20))
A(),
B() ->
mov(1,2)
B()
B()
`, depth: 6
         },{
         lsystem: `A() ->
B()
rot(-22.5, random(-20,20))
[[A()]rot(22.5, random(-20,20))A()]
rot(22.5, random(-20,20))
B()
[rot(22.5, random(-20,20))B()A()]
rot(-22.5, random(-20,20))
A(),
B() ->
mov(3,2)
B()
B()
`, depth: 4
         },
         {
         lsystem: `A() ->
mov(2,2)
A()
[rot(25.7,random(-20,20))A()]
A()
[rot(-25.7,random(-20,20))A()]
A()`, depth: 5
         },
         {
         lsystem: `A(g=1) ->
A(g=g+1)
mov(1,2)
B(g=g+1)
[rot(25.7, random(-10,10))A(g=g+1)][rot(-25.7,random(-10,10))A(g=g+1)],
B(g=1) ->
B(g=g+1)
[rot(-25.7, random(-10,10))mov(6,1)][rot(25.7, random(-10,10))mov(6,1)]
mov(3,2)
B(g=g+1)`, depth: 5
         },
         {
            lsystem: `A() ->
rot(-30)
B(),
B() ->
C()
rot(120)
C()
rot(120)
C(),
C() ->
C()
mov(2,2)
rot(-60)
C()
rot(120)
C()
rot(-60)
mov(2,2)
C()`, depth: 5
         },
         {
            lsystem:
            `A() ->
rot(45)
B()
rot(-90)
B()
rot(-90)
B()
rot(-90)
B()
rot(-90),
B() ->
mov(3,2)
B()
rot(-90)
B()
rot(90)
B()
rot(90)
B()
B()
rot(-90)
B()
rot(-90)
B()
rot(90)
B()`,
            depth: 4
         },
         {
            lsystem: `A() ->
rot(90)
mov(5,1)
rot(-45)
rot(-45)
B()
mov(5,1)
rot(-45)
rot(-45)
mov(5,1)
rot(-45)
rot(-45)
B()
mov(5,1),
B() ->
B()
mov(5,1)
rot(45)
mov(5,1)
rot(45)
B()
mov(5,1)
rot(-45)
rot(-45)
mov(5,1)
rot(-45)
rot(-45)
B()
mov(5,1)
rot(45)
mov(5,1)
rot(45)
B()`,
               depth: 5
         },{
            lsystem: `A() ->
rot(-90)
mov(5,1)
rot(90)
B()
mov(5,1)
rot(90)
mov(5,1)
rot(90)
B()
mov(5,1),
B() ->
B()
mov(5,1)
rot(-90)
mov(5,1)
rot(90)
mov(5,1)
rot(-90)
B()
mov(5,1)
rot(90)
mov(5,1)
rot(90)
B()
mov(5,1)
rot(-90)
mov(5,1)
rot(90)
mov(5,1)
rot(-90)
B()`, depth: 5},
            {
               lsystem: `A() ->
rot(90)
B()
rot(-90)
B()
rot(-90)
B()
rot(-90)
B(),
B() ->
mov(3,1)
B()
B()
rot(-90)
B()
rot(-90)
B()
rot(-90)
B()
rot(-90)
B()
rot(-90)
B()
rot(90)
B()`,
depth: 5
         },
         {
            lsystem: `A() ->
rot(-30)
B(),
B() ->
D()
mov(1,1)
rot(60)
E()
mov(1,1)
rot(60)
D(),
C() ->
E()
mov(1,1)
rot(-60)
D()
mov(1,1)
rot(-60)
E(),
D() ->
mov(1,1)
C(),
E() ->
mov(1,1)
B()`, depth: 7},{
         lsystem: `A(g=0) -> 
mov(100/(g+1)+random(-5,5),5/(g+1))
[penUp(random(0,6))rot(random(-25,-15), random(-30,30))A(g=g+1)] 
[penUp(random(0,6))rot(random(15,25), random(-30,30))A(g=g+1)]
[penUp(random(0,5))rot(random(-45,45), random(-30,30))A(g=g+1)]

`,
         depth: 8
      },
{
         lsystem: `A(g=0) -> 
mov(100/(g+1)+random(-5,5),4/(g+1))
[penUp(random(0,5))rot(random(-25,-15), random(-30,30))A(g=g+1)] 
[penUp(random(0,5))rot(random(15,25), random(-30,30))A(g=g+1)]
[penUp(random(0,4))rot(random(40, 60), random(-30,30))A(g=g+1)] 
[penUp(random(0,4))rot(random(-60, -40), random(-30,30))A(g=g+1)] 
`,
         depth: 7
      },


      ];

      this.newConfig = this.newConfig.bind(this);
      this.newDepth = this.newDepth.bind(this);
		this.handleNewInput = this.handleNewInput.bind(this);
	}

   newConfig(e) {
      var val = e.target.value;
      var config = this.presavedConfigs[val];
      this.setState({
         chosenDepth: config.depth,
         currentText: config.lsystem
      });
   }

   newDepth(val) {
      this.setState({chosenDepth: val});
   }

	handleNewInput(val) {
		this.setState({
			currentText: val.target.value
		});
	}

	render() {
      var depthNotice = "";

      if ( this.state.chosenDepth > 14 ) {
         depthNotice = <div><small style={{"color":"red", "font-size":"50%"}}>Higher depths take longer time to generate</small><br/></div>
      }
      return (
         <div style={{position:"absolute", top:"0px", paddingLeft: "10px"}}>
            <center>
               <div id="selector-change-div">
				<p>Lindenmayer system:</p>
				<textarea style={{ width: "20%", minWidth:"200px" }}
					rows="12"
					id="LSystemTextArea"
					value={this.state.currentText}
					onChange={this.handleNewInput}
				></textarea><br />
				<small>depth: </small>
				<input type="number" style={{ width: "40px" }} value={this.state.chosenDepth} onChange={
					e => {this.newDepth(e.target.value);}
				}></input>
				{depthNotice}<br/>
         <small style={{"font-size":"50%"}}>Try one of these:</small><br/>
         <select onChange={(e) => {this.newConfig(e);}}>
         <option value={0}>Tree 1</option>
         <option value={13}>Tree 2</option>
         <option value={14}>Tree 3</option>
         <option value={1}>Seaweed</option>
         <option value={2}>Honeycomb</option>
         <option value={3}>Weeds 1</option>
         <option value={4}>Weeds 2</option>
         <option value={5}>Weeds 3</option>
         <option value={6}>Weeds 4</option>
         <option value={7}>Koch triangle</option>
         <option value={8}>Koch Island</option>
         <option value={9}>Sierpi??ski curve</option>
         <option value={10}>Sierpi??ski square curve</option>
         <option value={12}>Sierpi??ski arrowhead curve</option>
         <option value={11}>Rings</option>
         </select>
         <br/>
				<button onClick={() => { this.props.onHandleNewLSystem(this.state.currentText, this.state.chosenDepth);}}>Generate</button>
            <br/>
            <a style={{ color: "white" }} href="https://github.com/Ricardicus/lsystem-3d">Link to source code</a><br />
         </div>

            <button id="selector-change" value="hide" onClick={() => {
               var c = document.getElementById("selector-change"); 
               var d = document.getElementById("selector-change-div");
               if ( c.value == "hide" ) { 
                  c.value = "edit";
                  c.innerHTML = "Edit";
                  d.style.display = "none";
               } else {
                  c.value = "hide";
                  c.innerHTML = "Hide";
                  d.style.display = "inherit";
               }
            }}>Hide</button>

      </center>
			</div>);
	}

}

export default LSystemInput;
