import React, { Component, createRef } from 'react';
import { Engine } from 'matter-js';
import { MCircleBody, MRectangleBody, MBody } from './../objects/index';

const { PI } = Math;

interface PropTypes {
    id: string,
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
            <div ref={this.parentRef}>
                <canvas className="render-canvas" ref={this.canvasRef}></canvas>
            </div>
        )
    }
}