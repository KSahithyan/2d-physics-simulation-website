import { IBodyDefinition } from 'matter-js';

export class MBody {
    type: 'circle' | 'rectangle';
    body: IBodyDefinition;
    
    constructor(type: 'circle' | 'rectangle') {
        this.type = type;
    }
}