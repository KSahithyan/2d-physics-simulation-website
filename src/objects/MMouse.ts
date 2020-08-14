import { Point } from "../types";
import { MBody } from "./MBody";
import { Body } from 'matter-js';
export class MMouse {
    /**
     * Position of the mouse pointer
     */
    position: Point;
    elementRect;
    /**
     * Indicates if the mouse is pressed
     */
    isMouseDown: boolean;
    bodyClicked: MBody | any;

    /**
     * Create a MMouse Object
     * @param element Element to add Mouse Events
     */
    constructor(element: HTMLElement) {
        this.onMouseMove = this.onMouseMove.bind(this);
        
        element.addEventListener('mousemove', (event) => {this.onMouseMove(event)});
        element.addEventListener('mousedown', (event) => { this.isMouseDown = true; this.onMouseDown(event)});
        element.addEventListener('mouseup', (event: MouseEvent) => {
            this.isMouseDown = false;
            this.bodyClicked = undefined;
            this.onMouseUp(event);
        })
    }
    
    onMouseMove(event: MouseEvent) {
        //@ts-ignore
        this.elementRect = event.target.getBoundingClientRect();
        this.position = {
            x: event.clientX - this.elementRect.left,
            y: event.clientY - this.elementRect.top
        }

        if (this.isMouseDown) {
            Body.setPosition(this.bodyClicked.body, this.position);
        }
    }

    onMouseDown(event: MouseEvent) {
        console.log(event.x);
    }

    onMouseUp(event: MouseEvent) {
        console.log('aaa');
    }
}