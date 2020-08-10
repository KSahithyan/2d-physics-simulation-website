import { Engine } from 'matter-js';
import React, { Component, createRef } from 'react';
import { MBody, MRectangleBody } from './../objects/index';
import { Point } from '../types';

interface PropTypes {
    timing: number,
    engine: Engine,
    getBodies: Function,
    getSelectedObj: Function,
    setSelectedObj: Function,
    isPaused: Function
}

export class CanvasRenderer extends Component<PropTypes> {
    private canvasRef = createRef<HTMLCanvasElement>()
    private parentRef = createRef<HTMLDivElement>()
    ctx: CanvasRenderingContext2D;
    mouse: Point = {
        x: 0,
        y: 0
    };

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
        // store mouse position;
        // @ts-ignore
        let rect = event.target.getBoundingClientRect();
        this.mouse = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
        
        for (let body of this.props.getBodies()) {
            let b = body as MBody
            let r = b.isClickedOn(this.mouse.x, this.mouse.y);

            if (r) {
                this.props.setSelectedObj(body.body);
            }
        }
    }
    
    componentDidMount() {
        this.canvasRef.current.addEventListener('click', this.onClick);
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