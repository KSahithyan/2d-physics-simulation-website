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

        ctx.beginPath();
        ctx.fillStyle = id == this.body.id ? "#0000FF" : this.fillColor.toHexCode();
        // because Matter.js calculates the central point's x,y
        ctx.fillRect(x-this.w/2,y - this.h/2,this.w, this.h);
        ctx.closePath();
    }

    isClickedOn(x: number,y: number):boolean {
        let pos = this.body.position;

        let xRange = [pos.x - this.w/2, pos.x + this.w/2];
        let yRange = [pos.y - this.h/2, pos.y + this.h/2];

        let inXRange = isInRange(x, xRange[0], xRange[1]);
        let inYRange = isInRange(y, yRange[0], yRange[1]);

        return inXRange && inYRange;
    }
}