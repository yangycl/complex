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
            this.imag = Math.abs(imag);

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
        return `${real}${!real||!imag ? '' : sign}${imag}${imag !== "" ?"i":""}`;
    }
}//todo:
console.log("test!!");
var test = new Complex("3-2i");
console.log(test.toString());
var test2 = new Complex("2+8i");
var test3 = Complex.divide([test,test2]);
console.log(test3.toString());
