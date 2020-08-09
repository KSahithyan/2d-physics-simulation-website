export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r?: number,g?: number,b?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toHexCode() {
        return '#' + [this.r, this.g, this.b].map(a => a.toString(16).padStart(2,'0')).join('');
    }

    fromHexCode(hexCode: string) {
        hexCode = hexCode.slice(1)

        console.log(hexCode.match(/(\d{2})/));
    }
}