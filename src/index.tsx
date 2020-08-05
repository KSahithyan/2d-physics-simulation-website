import { Engine, World, Body } from 'matter-js';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { CanvasRenderer, MCircleBody, MBody, InputComponent } from "./objects/index";
import { ControlButton, ToolButton } from "./types";
import { capitalize } from './utils';
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
        this.extractProperties = this.extractProperties.bind(this);
        this.getChange = this.getChange.bind(this);
        
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
                { icon: 'pause', onClickListener: this.pauseEngine },
                { icon: 'refresh', onClickListener: () => {console.log('ccc')} }
            ]
        }

        for (let body of this.state.bodies) {   
            World.add(this.state.engine.world, body.body);
        }

        Body.setVelocity(this.state.bodies[1].body, {x:0,y:-10})
    }

    // TODO Move to PropertiesContainer component
    extractProperties(obj) {
        let entries = Object.entries(obj);
        let n = []
        for (let [key, val] of entries) {
            //if (val == null) {return n;}
          if (typeof val == 'string') { n.push([key,val]) }
          else if (val instanceof Array) {
             n.push([key, val.length]);
          }
          else if (typeof val == 'number') {
            n.push([key,val]);
            // console.log('N', val);
          }
          else if (typeof val == 'object') {
            if (val != null) {
                n.push([key, this.extractProperties(val)]);
                // console.log(val, this.extractProperties(val), key);
            }
          }
        }
    
        // console.log(r);
        return n;
      }

    runEngine() {
        this.setState(state => ({ isPaused: false }));
    }

    pauseEngine() {
        this.setState(state => ({ isPaused: true }))
    }

    getChange(...a) {
        console.log('change', a);
        console.log(a[0].target.value);
    }

    componentDidMount() {
        this.setState(state => ({ selectedObj: state.engine.world }))
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
                    
                    {/* TODO Move to PropertiesContainer component */}
                    <div id="properties">
                        {this.extractProperties(selectedObj).map(entry => {
                            return (
                                entry[1] instanceof Array ?
                                entry[1].map(a => <InputComponent key={a[0]} label={a[0]} value={a[1]} onChangeListener={this.getChange}></InputComponent>) : <InputComponent key={entry[0]} label={capitalize(entry[0])} value={entry[1]} onChangeListener={this.getChange}></InputComponent>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))