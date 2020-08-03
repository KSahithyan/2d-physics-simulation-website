import React from 'react';
import ReactDOM from 'react-dom';
import css from './style/main.css';
import { World, Engine, Render, Bodies } from 'matter-js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.engine = Engine.create();
        this.canvasRef = React.createRef()
        
        //TODO: create tools array;

        World.add(this.engine.world, Bodies.rectangle(100,100,40,40));
        
    }

    componentDidMount() {
        this.renderer = Render.create({
            engine: this.engine,
            element: this.canvasRef.current
        })
        Render.run(this.renderer);
        // Engine.run(this.engine);
    }
    
    render() {

        // TODO: Render tools
        return (
            <div className="container">
                {/* <Sketch setup={this.setup} draw={this.draw.bind(this)} /> */}
                <div id="tools"></div>
                <div id="render-canvas" ref={this.canvasRef}></div>
                <div id="properties">
                    <h2 className="section-heading">Properties</h2>
                </div>
            </div>
        )
    }  
} 
ReactDOM.render(<App />, document.getElementById('root'))