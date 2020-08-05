import { Body } from 'matter-js';

export class MBody {
    type: 'circle' | 'rectangle';
    body: Body;
    
    constructor(type: 'circle' | 'rectangle') {
        this.type = type;
    }
}