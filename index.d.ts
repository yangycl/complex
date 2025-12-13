export declare function degToRad(deg:number):number;
export declare function radToDeg(rad:number):number;

export declare class Complex {
    real: number;
    imag: number;
    sign: "+" | "-" | "";
    
    constructor(comStr: string);

    static add(comarr: Complex[]): Complex;
    static subtract(comarr: Complex[]): Complex;
    static multiply(comarr: Complex[]): Complex;
    static divide(comarr: Complex[]): Complex;

    toString(): string;
    abs(): number;
    toPolar(): Polar;
    scale(factor: number): void;
    rotate(theta: number): Complex;
    static rect(
        z: Complex,
        height: number,
        width: number,
        ctx: CanvasRenderingContext2D
    ): void;
    static arc(
        z: Complex,
        r: number,
        ctx: CanvasRenderingContext2D
    ): void;
}

export declare class Polar {
    r: number;
    theta: number;
    constructor(r: number, theta: number);
    addTheta(add: number): void;  
    subtractTheta(subtract: number): void;
    addR(add: number): void;
    subtractR(subtract: number): void;
    toComplex(): Complex;     
}
