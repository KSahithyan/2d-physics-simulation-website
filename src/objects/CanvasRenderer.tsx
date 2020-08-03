import React, { Component, createRef } from 'react';

interface PropTypes {
    bodies: any[],
    id: string,
    timing: number
}

export class CanvasRenderer extends Component<PropTypes> {
    private canvasRef = createRef<HTMLCanvasElement>()
    private parentRef = createRef<HTMLDivElement>()
    ctx;

    constructor(props: PropTypes) {
        super(props);
    }

    renderCanvas() {
        let { clientHeight, clientWidth } = this.parentRef.current
        this.canvasRef.current.width = clientWidth;
        this.canvasRef.current.height = clientHeight;
        // console.log(this.canvasRef.current.width, this.canvasRef.current.height, this.parentRef.current.clientWidth, this.parentRef.current.clientHeight);
        for (let body of this.props.bodies) {            
            let {x,y} = body.body.position;
            this.ctx.fillRect(x,y,100,100);
        }
    }

    onClick() {
        // TODO add onclick listener
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext('2d');
        setInterval(() => {
            this.renderCanvas()
        }, this.props.timing);
    }

    render() {
        return (
            <div ref={this.parentRef}>
                <canvas className="render-canvas" ref={this.canvasRef}></canvas>
            </div>
        )
    }
}