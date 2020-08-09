import { Body } from 'matter-js';
import { Color } from './index';

export abstract class MBody {
    type: 'circle' | 'rectangle';
    body: Body;
    fillColor: Color;
    abstract show(ctx: CanvasRenderingContext2D, id: number): void;
    abstract isClickedOn(x: number,y: number): boolean;
    
    constructor(type: 'circle' | 'rectangle') {
        this.type = type;
        this.fillColor = new Color(0,0,0);
    }
}