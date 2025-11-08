"use strict";
function degToRad(deg) {
    return deg * Math.PI / 180;
}
function radToDeg(rad) {
    return rad * 180 / Math.PI;
}
class Complex {
    constructor(comStr) {
        let index = Math.max(comStr.lastIndexOf("+"), comStr.lastIndexOf("-"));
        if (index === -1) {
            this.real = comStr.includes("i") ? 0 : Number(comStr);
            switch (comStr) {
                case "i":
                    this.imag = 1;
                    break;
                case "-i":
                    this.imag = -1;
                    break;
                default:
                    this.imag = comStr.includes("i") ? Number(comStr.replace("i", "")) : 0;
                    break;
            }
        }
        else {
            let imag = Number(comStr.slice(index).replace("i", ""));
            let real = Number(comStr.slice(0, index));
            this.real = real;
            this.imag = imag;
        }
        switch (comStr.charAt(index)) {
            case "+":
                this.sign = "+";
                break;
            case "-":
                this.sign = "-";
                break;
            default:
                this.sign = "";
                break;
        }
    }
    static add(comarr) {
        let i = 0;
        let real = comarr[i].real;
        let imag = comarr[i].imag;
        let sign = imag >= 0 ? "+" : "";
        for (i = 1; i < comarr.length; i++) {
            real += comarr[i].real;
            imag += comarr[i].imag;
        }
        return new Complex(`${real}${sign}${imag}i`);
    }
    static subtract(comarr) {
        let i = 0;
        let real = comarr[i].real;
        let imag = comarr[i].imag;
        for (i = 1; i < comarr.length; i++) {
            real -= comarr[i].real;
            imag -= comarr[i].imag;
        }
        let sign = imag >= 0 ? "+" : "";
        return new Complex(`${real}${sign}${imag}i`);
    }
    static multiply(comarr) {
        //z1 = a+bi
        //z2 = c+di
        let a = comarr[0].real;
        let b = comarr[0].imag;
        let c = comarr[1].real;
        let d = comarr[1].imag;
        let newreal = a * c - b * d;
        let newimag = a * d + b * c;
        let newsign = newimag < 0 ? "-" : "+";
        newimag = Math.abs(newimag);
        return new Complex(`${newreal}${newsign}${newimag}i`);
    }
    static divide(comarr) {
        let a = comarr[0].real;
        let b = comarr[0].imag;
        let c = comarr[1].real;
        let d = comarr[1].imag;
        let denom = c ** 2 + d ** 2;
        let real = (a * c + b * d) / denom;
        let imag = (b * c - a * d) / denom;
        let sign = imag >= 0 ? "+" : "-";
        imag = Math.abs(imag);
        return new Complex(`${real}${sign}${imag}i`);
    }
    toString() {
        let real = this.real || "";
        let imag = this.imag || "";
        let sign = this.sign;
        switch (imag) {
            case "": break;
            default: imag = Math.abs(imag);
        }
        return `${real}${!real || !imag ? '' : sign}${imag}${imag !== "" ? "i" : ""}`;
    }
    abs() {
        return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }
    toPolar() {
        let r = this.abs();
        let rad = Math.atan2(this.imag, this.real);
        let theta = radToDeg(rad);
        return new Polar(r, theta);
    }
    scale(factor) {
        this.real * factor;
        this.imag * factor;
    }
} //todo:
console.log("test!!");
var test = new Complex("3-2i");
console.log(test.toString());
var test2 = new Complex("2+8i");
var test3 = Complex.divide([test, test2]);
console.log(test3.toString());
var test4 = new Complex("3+4i");
console.log(test4.abs());
class Polar {
    constructor(r, theta) {
        this.r = r;
        this.theta = theta % 360;
    }
    addTheta(add) {
        this.theta += add;
    }
    subtractTheta(subtract) {
        this.theta -= subtract;
    }
    addR(add) {
        this.r += add;
    }
    subtractR(subtract) {
        this.r -= subtract;
    }
    toComplex() {
        let r = this.r;
        let theta = this.theta;
        let rad = degToRad(theta);
        let real = r * Math.cos(rad);
        let imag = r * Math.sin(rad);
        let sing = imag >= 0 ? "+" : "-";
        imag = Math.abs(imag);
        return new Complex(`${real}${sing}${imag}i`);
    }
}
console.log("test!");
let p = new Polar(2, 45);
console.log(p.toComplex().toString()); // 應該是 "1.414+1.414i"
let p2 = new Polar(2, 135); // 第二象限
console.log(p2.toComplex().toString()); // 應該是 "-1.414+1.414i"
