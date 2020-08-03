import {Bodies} from "matter-js";

export class RectangleBody {
    constructor(x,y,w,h) {
        this.body = Bodies.rectangle(x,y,w,h);
        console.log(this.body);
    }
}