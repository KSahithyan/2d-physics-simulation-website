import {Bodies} from "matter-js";
import { MBody } from './MBody';

export class MRectangleBody extends MBody {
    w: number;
    h: number;
    constructor(x: number,y: number,w: number,h: number) {
        super('rectangle');
        this.body = Bodies.rectangle(x,y,w,h);
        this.w = w;
        this.h = h;
    }
}