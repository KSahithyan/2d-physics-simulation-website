import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import * as css from './style/main.css';
const css = require('./style/main.css');
import { World, Engine, Render, Bodies, IEngineDefinition, IBodyDefinition } from 'matter-js';
import {CanvasRenderer, RectangleBody} from "./objects/index";

class App extends Component {
    engine: IEngineDefinition;
    bodies: any[];
    selectedObj: any;
    renderer: any;

    constructor(props: any) {
        super(props);
        this.engine = Engine.create();
        // this.canvasRef = React.createRef();
        this.bodies = [
            new RectangleBody(400,400,80,80)
        ];
        this.selectedObj; // holds the selected object and show properties
        
        //TODO: create tools array;

        if (this.bodies[0]) {   
            World.add(this.engine.world, this.bodies[0].body);
        }
        World.add(this.engine.world, Bodies.rectangle(100,100,40,40));
        
    }

    componentDidMount() {
        // this.renderer = Render.create({
        //     engine: this.engine,
        //     element: this.canvasRef.current
        // })
        // Render.run(this.renderer);
        // Engine.run(this.engine);
    }
    
    render() {
        // TODO: Render tools
        return (
            <div className="container">
                {/* <Sketch setup={this.setup} draw={this.draw.bind(this)} /> */}
                <div id="tools"></div>
                <CanvasRenderer bodies={this.bodies} id="render-canvas" />
                {/* <div id="render-canvas" ref={this.canvasRef}></div> */}
                <div id="properties">
                    <h2 className="section-heading">Properties</h2>
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))