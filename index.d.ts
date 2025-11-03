declare function degToRad(deg:number):number;
declare function radToDeg(rad:number):number
declare class Complex {
    real: number;
    imag: number;
    sign: "+" | "-" | "";
    
    constructor(comStr: string);

    static add(comarr: Complex[]): Complex;
    static subtract(comarr: Complex[]): Complex;
    static multiply(comarr: Complex[]): Complex;
    static divide(comarr: Complex[]): Complex;

    toString(): string;
    abs():number;
    toPolar():Polar;
}
declare class Polar{
    r:number;
    theta:number;
    constructor(r:number, theta:number);
    addTheta(add:number):void;  
    subtractTheta(subtract:number):void;
    addR(add:number):void;
    subtractR(subtract:number):void;
    toComplex(polar:Polar):Complex;     
}