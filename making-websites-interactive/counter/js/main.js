const countedEl = document.querySelector('#counted');

let count = 0;
let savedValues = [];

function renderCount() {
    countedEl.textContent = count;
}

function renderSavedEntrys(){
    document.getElementById('saved-entrys').textContent = savedValues.join(" - ");
}

document.querySelector('.btn__increment').addEventListener('click', ()=>{
    count++;
    renderCount();
});

document.querySelector('.btn__save').addEventListener('click', ()=>{
    if(count != 0){
        savedValues.push(count);
        countedEl.textContent = 0;
        count = 0;
        renderSavedEntrys();
    }
});

document.querySelector('.btn__reset').addEventListener("click", ()=>{
    count = 0;
    savedValues = [];
    renderCount();
    renderSavedEntrys();
});

renderCount();