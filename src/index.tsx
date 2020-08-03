import { Engine, World } from 'matter-js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CanvasRenderer, RectangleBody } from "./objects/index";
// import * as css from './style/main.css';
const css = require('./style/main.css');

class App extends Component {
    engine: Engine;
    bodies: any[];
    selectedObj: any;
    renderer: any;

    constructor(props: any) {
        super(props);
        this.engine = Engine.create();
        // this.canvasRef = React.createRef();
        this.bodies = [
            new RectangleBody(100,100,80,80)
        ];
        this.selectedObj; // holds the selected object and show properties
        
        //TODO: create tools array;

        for (let body of this.bodies) {   
            World.add(this.engine.world, body.body);
        }
        this.runEngine = this.runEngine.bind(this);
        // World.add(this.engine.world, Bodies.rectangle(100,100,40,40));
        
    }

    runEngine() {
        Engine.run(this.engine);
    }
    
    render() {
        // TODO: Render tools
        return (            
            <div className="container">
                {/* <Sketch setup={this.setup} draw={this.draw.bind(this)} /> */}
                <div id="tools"></div>
                <CanvasRenderer bodies={this.bodies} id="render-canvas" timing={10} />
                {/* <div id="render-canvas" ref={this.canvasRef}></div> */}
                <div id="properties">
                    <button id="run-button" onClick={this.runEngine}>Run</button>
                    <h2 className="section-heading">Properties</h2>
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))