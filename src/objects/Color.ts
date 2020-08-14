export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r?: number,g?: number,b?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * @param hexCode Hexadecimal code to convert into RGB color
     */
    static fromHexCode(hexCode: string) {
        let RGB = (hexCode.slice(1)).match(/(\w{2})/g).map(v => parseInt(v, 16));
        return new Color(...RGB)
    }

    toHexCode() {
        return '#' + [this.r, this.g, this.b].map(a => a.toString(16).padStart(2,'0')).join('');
    }
}