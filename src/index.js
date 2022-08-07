function hechoEnNorteAmerica(vin){
    const regionUS = ["1", "4", "5"];
    const mexCode = 'ABCDEFGHIJKLMNOPQRSTUVW'.split('');
    if(regionUS.indexOf(vin.substring(0, 1)) !== -1){
        return true;
    }
    
    if(vin.substring(0, 1) === "2"){
        // Es canadiense
        return true;
    }
    
    if(vin.substring(0, 1) === "3" && 
        mexCode.indexOf(vin.substring(1, 2)) !== -1){
            // Codigo mexicano es 3
            // con una segunda letra de la A a la W
            return true;
        }
    
    return false;
}

function esNumerico(value){
    return /^\d+$/.test(value);
}

function getAño(vin){
    //Posición 10
    const encodingAño = vin.substring(9, 10);
    const posSiete = vin.substring(6,7);

    if(esNumerico(posSiete)){
        if(esNumerico(encodingAño)){
            // Del 2001 en adelante tienen un número en esta posición
            return 2000 + parseInt(encodingAño);
        } else {
            // ASCII, A mayuscula tiene un codigo de 65;
            return 1980 + (encodingAño.charCodeAt(0) - 65);
        }
    } else {
        return 2010 + (encodingAño.charCodeAt(0) - 65);
    }
}

function cumpleAntiguedadNecesaria(añoVehiculo){
    let añoActual =  new Date().getFullYear();
    return añoVehiculo <= añoActual - 5;
}

function esValido(vin){
    return vin.length === 17;
}

const vinInput = document.getElementById('vinInput');
const divPuedeImportar = document.getElementById('puedeImportar');
const divFalloAño = document.getElementById('falloAño');
const divOtroLugar = document.getElementById('otroLugar');
const spanAñoAuto = document.getElementById('añoRegistro');

function terminoEntrada() {
    const vin = vinInput.value;
    const esVinValido  = esValido(vin);

    if(esVinValido){
        vinInput.classList.remove('is-invalid');
        vinInput.classList.add('is-valid');
    } else {
        vinInput.classList.remove('is-valid');
        vinInput.classList.add('is-invalid');
    }

    if(esVinValido){
        const enZonaNafta = hechoEnNorteAmerica(vin);
        const año = getAño(vin);
        const tieneAntiguedadNecesaria = cumpleAntiguedadNecesaria(año);

        divFalloAño.hidden = tieneAntiguedadNecesaria;

        divOtroLugar.hidden = enZonaNafta;

        divPuedeImportar.hidden = !(tieneAntiguedadNecesaria && enZonaNafta);

        spanAñoAuto.innerText = año.toString();
    }
}
