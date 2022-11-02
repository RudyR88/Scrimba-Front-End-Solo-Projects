const numberEl = document.querySelector('#number');
const meterFeetEl = document.querySelector('.meter-feet');
const literGallonEl = document.querySelector('.liters-gallons');
const kiloPoundsEl = document.querySelector('.kilo-pounds');
const numberMsg = document.querySelector('.number-error');

function meterFeetConv(number){
    const meterToFeet = number * 3.281;
    const feetToMeter = number / 3.281;
    meterFeetEl.textContent= `
        ${number} meters = ${meterToFeet.toFixed(3)} feet | ${number} feet = ${feetToMeter.toFixed(3)} meters
    `;
}

function litGalConv(number){
    const literToGallon = number * 0.264;
    const gallonToLiter = number / 0.264;
    literGallonEl.textContent= `
        ${number} liters = ${literToGallon.toFixed(3)} gallons | ${number} gallons = ${gallonToLiter.toFixed(3)} liters
    `;
}

function kiloPoundConv(number) {
    const kiloToPound = number * 2.204;
    const poundToKilo = number / 2.204;
    kiloPoundsEl.textContent= `
        ${number} kilos = ${kiloToPound.toFixed(3)} pounds | ${number} pounds = ${poundToKilo.toFixed(3)} kilos
    `;
}

function reset(){
    meterFeetEl.textContent = "";
    literGallonEl.textContent = "";
    kiloPoundsEl.textContent = "";
    numberMsg.textContent = "";
}

function render(){
    reset();
    const numberValue = numberEl.value;
    if(numberValue < 1){
        numberMsg.textContent = "Please input a number greater than 0";
        return "";
    }
    meterFeetConv(numberValue);
    litGalConv(numberValue);
    kiloPoundConv(numberValue);
    numberEl.value = "";
}

document.querySelector('.btn__convert').addEventListener('click', render);

render()