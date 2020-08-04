import React, { Component, createRef } from 'react';
import { Engine } from 'matter-js';
import { MBody } from './index';
import { MRectangleBody } from './index';
import { MCircleBody } from './MCircleBody';

const { PI } = Math;

interface PropTypes {
    bodies: MBody[],
    id: string,
    timing: number,
    isPaused: boolean,
    engine: Engine
}

export class CanvasRenderer extends Component<PropTypes> {
    private canvasRef = createRef<HTMLCanvasElement>()
    private parentRef = createRef<HTMLDivElement>()
    ctx: CanvasRenderingContext2D;
    runner;

    constructor(props: PropTypes) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    renderCanvas() {
        let { clientHeight, clientWidth } = this.parentRef.current
        this.canvasRef.current.width = clientWidth;
        this.canvasRef.current.height = clientHeight;
        for (let body of this.props.bodies) {            
            let {x,y} = body.body.position;
            
            if (body.type == 'rectangle') {
                let newBody = body as MRectangleBody;
                this.ctx.fillRect(x,y,newBody.w, newBody.h);
            }
            if (body.type == 'circle') {
                let newBody = body as MCircleBody;
                this.ctx.beginPath();
                this.ctx.fillStyle = '#000000';
                this.ctx.arc(x,y,newBody.r,0,2 * PI);
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
    }
    
    onClick(event: MouseEvent) {
        console.log(event);
        // TODO find a way to select bodies in this canvas
    }
    
    componentDidUpdate() {
        this.runner = setInterval(() => {
            if (!this.props.isPaused) {
                this.renderCanvas()
                Engine.update(this.props.engine)
            }
        }, this.props.timing);
    }
    
    componentDidMount() {
        this.canvasRef.current.addEventListener('click', this.onClick);
        this.ctx = this.canvasRef.current.getContext('2d');
        this.renderCanvas()
    }
    
    render() {
        if (this.runner) {
            window.clearInterval(this.runner);
        }
        return (
            <div ref={this.parentRef}>
                <canvas className="render-canvas" ref={this.canvasRef}></canvas>
            </div>
        )
    }
}