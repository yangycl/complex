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
}