import { Body, Engine, World, MouseConstraint } from 'matter-js';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { CanvasRenderer, PropertiesContainer } from './components/index';
import { MBody, MCircleBody, MRectangleBody } from "./objects/index";
import { ControlButton, ToolButton, PopOption } from "./types";
import { Popover, Button } from 'antd';

const css = require('./style/main.css');

interface StateTypes {
    engine: Engine,
    selectedObj?: Object,
    bodies: MBody[],
    isPaused: boolean,
    controlButtons: ControlButton[],
    toolButtons: ToolButton[]
}

const getIconPath = (iconName: string): string => `icons/${iconName}.svg`;

class App extends Component<any, StateTypes> {
    bodies: any[];
    renderer: any;
    isLive: boolean;
    constructor(props: any) {
        super(props);
        this.runEngine = this.runEngine.bind(this);
        this.pauseEngine = this.pauseEngine.bind(this);
        this.getBodies = this.getBodies.bind(this);
        this.getSelectedObj = this.getSelectedObj.bind(this);
        this.isPaused = this.isPaused.bind(this);
        this.setSelectedObj = this.setSelectedObj.bind(this);

        this.state = {
            engine: Engine.create(),
            isPaused: true,
            bodies: [
                new MCircleBody(650, 100, 20, { restitution: 1, friction: 0 }),
                new MCircleBody(650, 340, 40, { restitution: 1, friction: 0 }),
                new MRectangleBody(650, 770, 1320, 20, { isStatic: true, friction: .2 })
            ],
            toolButtons: [
                {
                    icon: 'shapes', popOptions: [
                        {
                            label: "Rectangle", onClickListener: () => {
                                console.log('// testing Rectangle label press, rectable');
                            }
                        },
                        {
                            label: "Circle", onClickListener: () => {
                                console.log('// testing Circle label press');
                            }
                        }
                    ]
                }
            ],
            controlButtons: [
                { icon: 'play', onClickListener: this.runEngine },
                { icon: 'pause', onClickListener: this.pauseEngine }
            ]
        }

        World.add(this.state.engine.world, this.state.bodies.map(body => body.body));

        Body.setVelocity(this.state.bodies[1].body, { x: 0, y: -10 })
    }

    runEngine = () => { this.setState({ isPaused: false }) }
    pauseEngine = () => { this.setState({ isPaused: true }) }
    isPaused = () => this.state.isPaused
    getBodies = () => this.state.bodies
    getSelectedObj = () => {
        if (typeof this.state.selectedObj != 'object') return;
        let dupObj: Object = Object.assign({}, this.state.selectedObj);
        if (!dupObj) return {};
        if (dupObj.hasOwnProperty('parent')) delete dupObj['parent'];

        return dupObj;
    }
    setSelectedObj = (obj: Object) => {
        // console.log(obj);
        this.setState({ selectedObj: obj });
    }

    componentDidMount() {
        let screenWidth = document.body.getClientRects()[0].width;
        if (screenWidth < 1000) alert("This website is still not designed for small screens. Check back again later");
        this.isLive = true;
        // this.setState(state => ({ selectedObj: state.bodies[0].body }));
        this.setState(state => ({ selectedObj: state.engine.world }))

        setInterval(() => {
            if (this.isLive) {
                this.forceUpdate();
            }
        }, 10)
    }

    componentWillUnmount() {
        this.isLive = false;
    }

    // TODO: Migrate this into a component
    /**
     * Generate Popup Content for Popover's content prop
     */
    generateContent(contentData: PopOption[]) {
        let content = contentData.map(popItem => {
            return (
                <Button onClick={popItem.onClickListener}>
                    {popItem.label}
                </Button>
            )
        })

        return <div className="flex--column">{content}</div>
    }

    render() {
        let { engine, controlButtons, toolButtons, selectedObj } = this.state;
        if (selectedObj == undefined) selectedObj = {}
        return (
            <div className="container">
                <div id="tools-button-container">
                    {toolButtons.map(toolButton => (
                        <Popover content={this.generateContent(toolButton.popOptions)} trigger="hover" placement="right">
                            <Button>
                                Add
                                {/* <img src={getIconPath(toolButton.icon)} className="icon" /> */}
                            </Button>
                        </Popover>
                    ))}
                </div>
                {/* <div id="tools-button-container">
                    {toolButtons.map(toolButton => {
                        return (
                        <PopupComponent>
                            <Trigger>
                                <img src={getIconPath(toolButton.icon)} className="icon" />
                            </Trigger>
                            <PopContent>
                                {toolButton.popOptions.map(value => {
                                    return (
                                        <div>{value.label}</div>
                                    )
                                })}
                            </PopContent>
                        </PopupComponent>)
                    })}
                </div> */}
                <CanvasRenderer getBodies={this.getBodies} getSelectedObj={this.getSelectedObj} setSelectedObj={this.setSelectedObj} timing={10} engine={engine} isPaused={this.isPaused} />
                <div id="side-bar">
                    <div id="control-buttons-container">
                        {controlButtons.map(controlButton =>
                            (<button className="control-button" onClick={controlButton.onClickListener} key={controlButton.icon}>
                                <img src={getIconPath(controlButton.icon)} className="icon" />
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