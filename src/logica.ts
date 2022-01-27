export function hechoEnNorteAmerica(vin: String){
    const regionUS = ["1", "4", "5"];
    const mexCode = Array.from('ABCDEFGHIJKLMNOPQRSTUVW');
    if(regionUS.includes(vin.substring(0, 1))){
        return true;
    }
    
    if(vin.substring(0, 1) === "2"){
        // Es canadiense
        return true;
    }
    
    if(vin.substring(0, 1) === "3" && 
        mexCode.includes(vin.substring(1, 2))){
            // Codigo mexicano es 3
            // con una segunda letra de la A a la W
            return true;
        }
    
    return false;
}

export function esNumerico(value: String){
    return Number.isInteger(value);
}

export function getAño(vin: String){
    //Posición 10
    const encodingAño = vin.substring(10, 11);
    const posSiete = vin.substring(7,8);

    if(esNumerico(posSiete)){
        if(esNumerico(encodingAño)){
            // Del 2001 en adelante tienen un número en esta posición
            return 2000 + Number.parseInt(encodingAño);
        } else {
            // ASCII, A mayuscula tiene un codigo de 65;
            return 1980 + (encodingAño.charCodeAt(0) - 65);
        }
    } else {
        return 2010 + (encodingAño.charCodeAt(0) - 65);
    }
}

export function cumpleAntiguedadNecesaria(añoVehiculo: Number){
    let añoActual =  new Date().getFullYear();
    return añoVehiculo <= añoActual - 5;
}

export function esValido(vin: String){
    if(vin.length !== 17){
        return false;
    }
}