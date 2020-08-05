import { MBody } from "./MBody";
import { Bodies, IBodyDefinition } from "matter-js";

export class MCircleBody extends MBody {
    r: number;
    constructor(x: number,y: number,r: number, options?: IBodyDefinition) {
        super('circle');
        this.body = Bodies.circle(x,y,r, options);
        this.r = r;
    }
}