import { Body } from 'matter-js';

export abstract class MBody {
    type: 'circle' | 'rectangle';
    body: Body;
    abstract show(ctx: CanvasRenderingContext2D, id: number): void;
    abstract isClickedOn(x: number,y: number): boolean;
    
    constructor(type: 'circle' | 'rectangle') {
        this.type = type;
    }
}