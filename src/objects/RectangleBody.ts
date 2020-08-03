import {Bodies, IBodyDefinition} from "matter-js";

export class RectangleBody {
    body: IBodyDefinition;
    
    constructor(x: number,y: number,w: number,h: number) {
        this.body = Bodies.rectangle(x,y,w,h);
        console.log(this.body);
    }
}