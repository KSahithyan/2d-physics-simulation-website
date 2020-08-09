import { Engine } from 'matter-js';
import React, { Component, createRef } from 'react';
import { MBody, MRectangleBody } from './../objects/index';

interface PropTypes {
    timing: number,
    engine: Engine,
    getBodies: Function,
    getSelectedObj: Function,
    isPaused: Function
}

export class CanvasRenderer extends Component<PropTypes> {
    private canvasRef = createRef<HTMLCanvasElement>()
    private parentRef = createRef<HTMLDivElement>()
    ctx: CanvasRenderingContext2D;

    constructor(props: PropTypes) {
        super(props);
        this.onClick = this.onClick.bind(this);
        console.log(this.props);
    }
    
    renderCanvas() {
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
        console.log(event);
        // TODO find a way to select bodies in this canvas
        for (let body of this.props.getBodies()) {
            let b = body as MBody
            let r = b.isClickedOn(event.x, event.y);
            let pos = body.body.position
            let mouse = {x: event.x,y:event.y};
            let addDetails = new Object()
            if (b.type == 'rectangle') {
                let rectbody = body as MRectangleBody
                //@ts-ignore
                addDetails.w = rectbody.w
                //@ts-ignore
                addDetails.h = rectbody.h
            }
            // console.log(pos, mouse, addDetails, r);
        }
    }
    
    componentDidMount() {
        this.canvasRef.current.addEventListener('mousemove', this.onClick);
        this.ctx = this.canvasRef.current.getContext('2d');
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