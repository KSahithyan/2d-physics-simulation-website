import { Body, Engine, World } from 'matter-js';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { CanvasRenderer, PropertiesContainer } from './components/index';
import { MBody, MCircleBody, MRectangleBody } from "./objects/index";
import { ControlButton, ToolButton } from "./types";

const css = require('./style/main.css');

interface StateTypes {
    engine: Engine,
    selectedObj?: Object,
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
        this.getBodies = this.getBodies.bind(this);
        this.getSelectedObj = this.getSelectedObj.bind(this);
        this.isPaused = this.isPaused.bind(this);

        this.state = {
            engine: Engine.create(),
            isPaused: true,
            bodies: [
                new MCircleBody(650, 100, 20, { restitution: 1, friction: 0 }),
                new MCircleBody(650, 340, 40, { restitution: 1, friction: 0 }),
                new MRectangleBody(650, 770, 1320, 20, { isStatic: true, friction: 0 })
            ],
            toolButtons: [
                { icon: 'add', onClickListener: () => { console.log('aa') } }
            ],
            controlButtons: [
                { icon: 'play', onClickListener: this.runEngine },
                { icon: 'pause', onClickListener: this.pauseEngine }
            ]
        }

        for (let body of this.state.bodies) {
            World.add(this.state.engine.world, body.body);
        }
        console.log(this.state.engine.world);

        Body.setVelocity(this.state.bodies[1].body, { x: 0, y: -10 })
    }

    runEngine() {
        console.log('s');
        this.setState(state => ({ isPaused: false }));
    }

    pauseEngine() {
        this.setState(state => ({ isPaused: true }))
    }

    isPaused = () => this.state.isPaused
    getBodies = () => this.state.bodies
    getSelectedObj = () => {
        if (typeof this.state.selectedObj != 'object') return;
        let dupObj: Object = Object.assign({}, this.state.selectedObj);
        if (!dupObj) return {};
        if (dupObj.hasOwnProperty('parent')) delete dupObj['parent'];

        return dupObj;
    }

    componentDidMount() {
        this.setState(state => ({ selectedObj: state.bodies[0].body }))
        // this.setState(state => ({ selectedObj: state.engine.world }))

        setInterval(() => {
            // this.setState(state => ({ isPaused: state.isPaused }))
            this.forceUpdate();
        }, 10)
    }

    render() {
        let { engine, controlButtons, toolButtons, selectedObj } = this.state;
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
                <CanvasRenderer getBodies={this.getBodies} getSelectedObj={this.getSelectedObj} timing={10} engine={engine} isPaused={this.isPaused} />
                <div id="side-bar">
                    <div id="control-buttons-container">
                        {controlButtons.map(controlButton =>
                            (<button className="control-button" onClick={controlButton.onClickListener} key={controlButton.icon}>
                                <img src={`${ICON_PATH + controlButton.icon}.svg`} className="icon" />
                            </button>))
                        }
                    </div>
                    <h2 className="section-heading">Properties</h2>

                    <PropertiesContainer getSelectedObj={this.getSelectedObj} timing={10} isPaused={this.isPaused} />
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))