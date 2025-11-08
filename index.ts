function degToRad(deg:number):number{
    return deg * Math.PI /180;
}
function radToDeg(rad:number):number{
    return rad * 180 / Math.PI;
}
class Complex{
    real:number;
    imag:number;
    sign:"+"|'-'|"";
    constructor(comStr:string){
        let index = Math.max(comStr.lastIndexOf("+"),comStr.lastIndexOf("-"));
        if(index === -1){
            this.real = comStr.includes("i") ? 0 : Number(comStr);
            
            switch(comStr){
                case "i" : this.imag = 1; break;
                case"-i" : this.imag = -1; break;
                default : this.imag = comStr.includes("i") ? Number(comStr.replace("i","")) : 0; break;
            }
        }else{
            let imag:number = Number(comStr.slice(index).replace("i",""));
            let real:number = Number(comStr.slice(0, index));
            this.real = real
            this.imag = imag;

        }
        switch(comStr.charAt(index)){
            case "+":this.sign = "+"; break;
            case "-":this.sign = "-"; break;
            default:this.sign = ""; break;
        }
    }
    static add(comarr:Complex[]):Complex{
        let i = 0;
        let real:number = comarr[i].real;
        let imag:number = comarr[i].imag;
        let sign:string = imag >= 0 ? "+" : "";
        for(i = 1;i<comarr.length;i++){
            real += comarr[i].real;
            imag += comarr[i].imag;
        }
        return new Complex(`${real}${sign}${imag}i`);
    }
    static subtract(comarr:Complex[]):Complex{
        let i = 0;
        let real:number = comarr[i].real;
        let imag:number = comarr[i].imag;
        
        for(i = 1;i<comarr.length;i++){
            real -= comarr[i].real;
            imag -= comarr[i].imag;
        }
        let sign:string = imag >= 0 ? "+" : "";
        return new Complex(`${real}${sign}${imag}i`);

    }
    static multiply(comarr:Complex[]){
        //z1 = a+bi
        //z2 = c+di
        let a = comarr[0].real;
        let b = comarr[0].imag;
        let c = comarr[1].real;
        let d = comarr[1].imag;
        let newreal = a*c - b*d;
        let newimag = a*d + b*c;
        let newsign = newimag < 0 ? "-" : "+";
        newimag = Math.abs(newimag);
        return new Complex(`${newreal}${newsign}${newimag}i`);
    }
    static divide(comarr:Complex[]):Complex{
        let a = comarr[0].real;
        let b = comarr[0].imag;
        let c = comarr[1].real;
        let d = comarr[1].imag;
        let denom:number = c**2+d**2;
        let real:number = (a*c+b*d)/denom;
        let imag:number = (b*c-a*d)/denom;
        let sign:"+"|"-" = imag>=0 ?"+" :"-";
        imag = Math.abs(imag);
        return new Complex(`${real}${sign}${imag}i`);
    }
    toString():string{
        let real:number|"" = this.real || "";
        let imag:number|"" = this.imag || "";
        let sign = this.sign;
        switch(imag){
            case "" : break;
            default : imag = Math.abs(imag)
        }
        return `${real}${!real||!imag ? '' : sign}${imag}${imag !== "" ?"i":""}`;
    }
    abs():number{
        return Math.sqrt(this.real**2+this.imag**2);
    }
    toPolar():Polar{
        let r = this.abs();
        let rad = Math.atan2(this.imag,this.real);
        let theta = radToDeg(rad);
        return new Polar(r,theta)
    }
    scale(factor:number):void{
        this.real *= factor;
        this.imag *= factor;
    }
}//todo:
console.log("test!!");
var test = new Complex("3-2i");
console.log(test.toString());
var test2 = new Complex("2+8i");
var test3 = Complex.divide([test,test2]);
console.log(test3.toString());
var test4 = new Complex("3+4i");
console.log(test4.abs())

class Polar{
    r:number;
    theta:number;
    constructor(r:number, theta:number){
        this.r = r;
        this.theta = theta % 360;
    }
    addTheta(add:number):void{
        this.theta += add; 
    }
    subtractTheta(subtract:number):void{
        this.theta -= subtract; 
    }
    addR(add:number):void{
        this.r += add;
    }
    subtractR(subtract:number):void{
        this.r -= subtract;
    }
    toComplex():Complex{
        let r = this.r;
        let theta = this.theta;
        let rad = degToRad(theta);
        let real:number = r * Math.cos(rad);
        let imag:number = r * Math.sin(rad);
        let sing:"+"|'-' = imag >= 0 ? "+" : "-";
        imag = Math.abs(imag);
        return new Complex(`${real}${sing}${imag}i`)

    }
}
console.log("test!");
let p = new Polar(2, 45);
console.log(p.toComplex().toString());  // 應該是 "1.414+1.414i"

let p2 = new Polar(2, 135);  // 第二象限
console.log(p2.toComplex().toString());  // 應該是 "-1.414+1.414i"