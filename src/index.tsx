import { Engine, World, Body, Render } from 'matter-js';
import React, { Component, createRef } from 'react';
import ReactDOM from "react-dom";
import { CanvasRenderer, MCircleBody, MBody, InputComponent } from "./objects/index";
import { ControlButton, ToolButton } from "./types";
import { capitalize } from './utils';
import { PropertiesContainer } from './components/PropertiesContainer';
const css = require('./style/main.css');

interface StateTypes {
    engine: Engine,
    selectedObj?: any,
    bodies: MBody[],
    isPaused: boolean,
    controlButtons: ControlButton[],
    toolButtons: ToolButton[]
}

const ICON_PATH = './src/icons/'

class App extends Component<any, StateTypes> {
    bodies: any[];
    renderer: any;
    constructor(props: any) {
        super(props);
        this.runEngine = this.runEngine.bind(this);
        this.pauseEngine = this.pauseEngine.bind(this);
        
        this.state = {
            engine: Engine.create(),
            isPaused: true,
            bodies: [
                new MCircleBody(600,100, 20, {restitution: 1}),
                new MCircleBody(600,300,40)
            ],
            toolButtons: [
                { icon: 'add', onClickListener: () => {console.log('aa')} }
            ],
            controlButtons: [
                { icon: 'play', onClickListener: this.runEngine },
                { icon: 'pause', onClickListener: this.pauseEngine }
            ]
        }

        for (let body of this.state.bodies) {   
            World.add(this.state.engine.world, body.body);
        }

        Body.setVelocity(this.state.bodies[1].body, {x:0,y:-10})
    }

    runEngine() {
        this.setState(state => ({ isPaused: false }));
    }

    pauseEngine() {
        this.setState(state => ({ isPaused: true }))
    }

    componentDidMount() {
        this.setState(state => ({ selectedObj: state.bodies[0].body }))
        // this.setState(state => ({ selectedObj: state.engine.world }))
    }
    
    render() {
        let {engine, bodies, isPaused, controlButtons, toolButtons, selectedObj} = this.state;
        if (selectedObj == undefined) selectedObj = {}
        return (
            <div className="container">
                <div id="tools-button-container">
                    {toolButtons.map(toolButton =>
                        (<button className="control-button" onClick={toolButton.onClickListener} key={toolButton.icon}>
                            <img src={`${ICON_PATH + toolButton.icon}.svg`} className="icon" />
                        </button>))
                    }
                </div>
                <CanvasRenderer bodies={bodies} id="render-canvas" timing={10} engine={engine} isPaused={isPaused} />
                <div id="side-bar">
                    <div id="control-buttons-container">
                        {controlButtons.map(controlButton =>
                            (<button className="control-button" onClick={controlButton.onClickListener} key={controlButton.icon}>
                                <img src={`${ICON_PATH + controlButton.icon}.svg`} className="icon" />
                            </button>))
                        }
                    </div>
                    <h2 className="section-heading">Properties</h2>

                    <PropertiesContainer selectedObj={selectedObj} />
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))