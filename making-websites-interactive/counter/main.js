const countedEl = document.getElementById('counted');

let count = 0;
let savedValues = [];

function renderCount() {
    countedEl.textContent = count;
}

function renderSavedEntrys(){
    document.getElementById('saved-entrys').textContent = savedValues.join(" - ");
}

document.getElementsByClassName('increment-btn')[0].addEventListener('click', ()=>{
    count++;
    renderCount();
});

document.getElementsByClassName('save-btn')[0].addEventListener('click', ()=>{
    if(count != 0){
        savedValues.push(count);
        countedEl.textContent = 0;
        count = 0;
        renderSavedEntrys();
    }
});

document.getElementsByClassName('reset-btn')[0].addEventListener("click", ()=>{
    count = 0;
    savedValues = [];
    renderCount();
    renderSavedEntrys();
});

renderCount();