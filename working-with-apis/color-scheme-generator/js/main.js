const copiedMsg = document.querySelector('#copied-msg');

document.addEventListener('click', (e)=>{
    if(e.target.dataset.getClrs === 'get-clrs'){
        resetMsg();
        getClrs();
    }

    if(e.target.dataset.clr){
        copyHex(e.target.dataset.clr);
    }
})

async function getClrs() {
    const hexClr = document.querySelector('#clr-select').value.replace('#','');
    const mode = document.querySelector('#clr-type').value;
    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${hexClr}&mode=${mode}&count=5`);
    const data = await res.json();
    setClrsHTML(data.colors);
}

function setClrsHTML(colors) {
    let clrsHTML = colors.map(clr => `
    <div class='clr'>
        <div id="clr-sample" style='background-color: ${clr.hex.value}' data-clr='${clr.hex.value}'></div>
        <p data-clr='${clr.hex.value}'>${clr.hex.value}</p>
    </div>
    `).join('');
    document.querySelector('.colors').innerHTML = clrsHTML;
}

function copyHex(hex) {
    resetMsg();
    navigator.clipboard.writeText(hex);
    copiedMsg.textContent = `${hex} copied to clipboard!`;
}

function resetMsg(){
    copiedMsg.textContent = '';
}

getClrs();