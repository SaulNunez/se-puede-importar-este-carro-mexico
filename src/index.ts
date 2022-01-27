import { 
    cumpleAntiguedadNecesaria,
    esValido, 
    getAño, 
    hechoEnNorteAmerica as hechoEnZonaNafta 
} from "./logica";

const vinInput = document.getElementById('vinInput');
const divPuedeImportar = document.getElementById('puedeImportar');
const divFalloAño = document.getElementById('falloAño');
const divOtroLugar = document.getElementById('otroLugar');

const terminoEntrada = () => {
    const vin = vinInput.innerHTML;
    const esVinValido  = esValido(vin);

    if(esVinValido){
        vinInput.classList.remove('is-invalid');
        vinInput.classList.add('is-valid');
    } else {
        vinInput.classList.remove('is-valid');
        vinInput.classList.add('is-invalid');
    }

    if(esVinValido){
        const hechoEnNorteAmerica = hechoEnZonaNafta(vin);
        const año = getAño(vin);
        const tieneAntiguedadNecesaria = cumpleAntiguedadNecesaria(año);

        divFalloAño.hidden = tieneAntiguedadNecesaria;

        divOtroLugar.hidden = hechoEnNorteAmerica;

        divPuedeImportar.hidden = !(tieneAntiguedadNecesaria && hechoEnNorteAmerica);
    }
};