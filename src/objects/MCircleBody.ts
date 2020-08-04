import { MBody } from "./MBody";
import { Bodies } from "matter-js";

export class MCircleBody extends MBody {
    r: number;
    constructor(x: number,y: number,r: number) {
        super('circle');
        this.body = Bodies.circle(x,y,r);
        this.r = r;
    }
}