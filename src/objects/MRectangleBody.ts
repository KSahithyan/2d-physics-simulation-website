import { Bodies, IBodyDefinition } from "matter-js";
import { MBody } from './MBody';
import { isInRange } from './../utils';

export class MRectangleBody extends MBody {
    w: number;
    h: number;
    constructor(x: number,y: number,w: number,h: number, options?: IBodyDefinition) {
        super('rectangle');
        this.body = Bodies.rectangle(x,y,w,h, options);
        this.w = w;
        this.h = h;
    }

    show(ctx: CanvasRenderingContext2D, id: number) {
        let {x,y} = this.body.position;
        ctx.fillStyle = id == this.body.id ? "#0000FF" : "#000000";
        // because Matter.js calculates the central point's x,y
        // ctx.fillRect(x - this.w/2, y - this.h/2, this.w * 2, this.h * 2);
        // ctx.fillRect(x,y,this.w, this.h);
        ctx.fillRect(x-this.w/2,y - this.h/2,this.w, this.h);
    }
}