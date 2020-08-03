import React, { Component, createRef } from 'react';

interface PropTypes {
    bodies: any[],
    id: string
}

export class CanvasRenderer extends Component<PropTypes> {
    private canvasRef = createRef<HTMLCanvasElement>()
    constructor(props: PropTypes) {
        super(props);
    }

    componentDidMount() {
        console.log(this.canvasRef);
        let ctx = this.canvasRef.current.getContext('2d');
        for (let body of this.props.bodies) {            
            let {x,y} = body.body.position
            console.log(x,y);
            ctx.fillStyle = 'red';
            ctx.fillRect(x,y,100,100);
        }
    }

    render() {
        return (
            <canvas className="render-canvas" ref={this.canvasRef}>
            </canvas>
        )
    }
}