import { MBody } from "./MBody";
import { Bodies, IBodyDefinition } from "matter-js";
import { isInRange, distance } from "../utils";
const { PI } = Math

export class MCircleBody extends MBody {
    r: number;
    constructor(x: number,y: number,r: number, options?: IBodyDefinition) {
        super('circle');
        this.body = Bodies.circle(x,y,r, options);
        this.r = r;
    }

    show(ctx: CanvasRenderingContext2D, id: number) {
        // let newBody = body as MCircleBody;
        let {x,y} = this.body.position
        ctx.beginPath();
        ctx.fillStyle = id == this.body.id ? "#0000FF" : this.fillColor.toHexCode();
        ctx.arc(x,y,this.r,0,2 * PI);
        ctx.fill();
        ctx.stroke();
    }

    isClickedOn(x,y): boolean {
        return false;
    }
}