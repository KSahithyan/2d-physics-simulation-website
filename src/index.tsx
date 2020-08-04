import { Engine, World, IEngineDefinition } from 'matter-js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CanvasRenderer, MRectangleBody, Tool, MCircleBody } from "./objects/index";
const css = require('./style/main.css');

interface StateTypes {
    engine: Engine,
    selectedObj: null,
    isPaused: boolean
}

class App extends Component<any, StateTypes> {
    bodies: any[];
    renderer: any;

    constructor(props: any) {
        super(props);
        this.bodies = [
            new MCircleBody(600,300,80),
            new MCircleBody(600,100, 20)
        ];
        // TODO add tools array
        this.state = {
            engine: Engine.create(),
            selectedObj: null,
            isPaused: true
        }

        for (let body of this.bodies) {   
            World.add(this.state.engine.world, body.body);
        }
        this.runEngine = this.runEngine.bind(this);
        this.pauseEngine = this.pauseEngine.bind(this);
        // World.add(this.engine.world, Bodies.rectangle(100,100,40,40));
        
    }

    runEngine() {
        this.setState(state => ({isPaused: false}));
    }

    pauseEngine() {
        this.setState(state => ({ isPaused: true }))
    }
    
    render() {
        // TODO: Render tools
        return (
            <div className="container">
                <div id="tools"></div>
                <CanvasRenderer bodies={this.bodies} id="render-canvas" timing={10} engine={this.state.engine} isPaused={this.state.isPaused} />
                <div id="properties">
                    <div id="control-buttons-container">
                        <button id="run-button" className="control-button" onClick={this.runEngine}>Run</button>
                        <button id="run-button" className="control-button" onClick={this.pauseEngine}>Pause</button>
                    </div>
                    <h2 className="section-heading">Properties</h2>

                    <div id="properties-container">

                    </div>
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))