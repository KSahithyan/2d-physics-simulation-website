import { Bodies, IBodyDefinition } from "matter-js";
import { MBody } from './MBody';

export class MRectangleBody extends MBody {
    w: number;
    h: number;
    constructor(x: number,y: number,w: number,h: number, options?: IBodyDefinition) {
        super('rectangle');
        this.body = Bodies.rectangle(x,y,w,h, options);
        this.w = w;
        this.h = h;
    }
}