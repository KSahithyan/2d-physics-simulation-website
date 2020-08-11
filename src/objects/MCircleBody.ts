import { MBody } from "./MBody";
import { Bodies, IBodyDefinition } from "matter-js";
import { distance } from "../utils";
const { PI } = Math

export class MCircleBody extends MBody {
    r: number;
    constructor(x: number,y: number,r: number, options?: IBodyDefinition) {
        super('circle');
        this.body = Bodies.circle(x,y,r, options);
        this.r = r;
    }

    show(ctx: CanvasRenderingContext2D, id: number) {
        let {x,y} = this.body.position
        
        ctx.beginPath();
        ctx.fillStyle = id == this.body.id ? "#0000FF" : this.fillColor.toHexCode();
        ctx.arc(x,y,this.r,0,2 * PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x + this.r, y);
        ctx.strokeStyle = "#FF0000"
        ctx.stroke();
        ctx.closePath();
    }

    isClickedOn(x,y): boolean {
        let pos = this.body.position
        let dist = distance({x,y},{x: pos.x, y: pos.y});
        return dist < this.r;
    }
}