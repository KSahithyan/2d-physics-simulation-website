import { Engine } from 'matter-js';
import React, { Component, createRef } from 'react';
import { MBody, MMouse } from './../objects/index';

interface PropTypes {
    timing: number,
    engine: Engine,
    getBodies: Function,
    getSelectedObj: Function,
    setSelectedObj: Function,
    isPaused: Function
}

export class CanvasRenderer extends Component<PropTypes> {
    canvasRef = createRef<HTMLCanvasElement>()
    private parentRef = createRef<HTMLDivElement>()
    ctx: CanvasRenderingContext2D;
    canvasMouse: MMouse;

    constructor(props: PropTypes) {
        super(props);
        this.onClick = this.onClick.bind(this);
        // console.log(this.props);
    }
    
    renderCanvas() {
        // console.log(this.canvasMouse);
        if (!this.props.isPaused()) {
            Engine.update(this.props.engine);
        }
        let { clientHeight, clientWidth } = this.parentRef.current
        this.canvasRef.current.width = clientWidth;
        this.canvasRef.current.height = clientHeight;
        let bodies = this.props.getBodies();
        for (let body of bodies) {
            // console.log(this.props.getSelectedObj().id);
            (body as MBody).show(this.ctx, this.props.getSelectedObj().id);
        }
    }
    
    onClick(event: MouseEvent) {
        // store mouse position;
        // @ts-ignore
        let rect = event.target.getBoundingClientRect();
        
        for (let body of this.props.getBodies()) {
            let b = body as MBody
            let r = b.isClickedOn(this.canvasMouse.position.x, this.canvasMouse.position.y);
            
            if (r) {
                this.canvasMouse.bodyClicked = b;
                this.props.setSelectedObj(body.body);
            }
        }
    }

    componentDidMount() {
        // this.canvasRef.current.addEventListener('click', this.onClick);
        // this.canvasRef.current.addEventListener('mousedown', this.OnMouseDown);
        // this.canvasRef.current.addEventListener('mousemove', this.onMouseMove);
        // this.canvasRef.current.addEventListener('mouseup', this.OnMouseUp);
        this.ctx = this.canvasRef.current.getContext('2d');
        this.canvasMouse = new MMouse(this.canvasRef.current);
        this.canvasMouse.onMouseDown = this.onClick;
        // this.canvasMouse = Mouse.create(this.canvasRef.current);
        // this.canvasMouse.pixelRatio = 1;
        // let mouseConstraint = MouseConstraint.create(this.props.engine, { mouse: this.canvasMouse})
        // World.add(this.props.engine.world, mouseConstraint);
        // this.forceUpdate();
    }
    
    componentDidUpdate() {
        this.renderCanvas()
    }

    render() {
        return (
            <div ref={this.parentRef} className="render-canvas-container">
                <canvas className="render-canvas" ref={this.canvasRef}></canvas>
            </div>
        )
    }
}