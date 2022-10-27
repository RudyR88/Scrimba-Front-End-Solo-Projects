let count = 0;
let savedValues = [];

const countedEl = document.getElementById('counted');

function renderCount() {
    countedEl.textContent = count;
}

document.getElementsByClassName('increment-btn')[0].addEventListener('click', ()=>{
    count++;
    renderCount();
})

document.getElementsByClassName('save-btn')[0].addEventListener('click', ()=>{
    if(count != 0){
        savedValues.push(count);
        countedEl.textContent = 0;
        count = 0;
        document.getElementById('saved-entrys').textContent = savedValues.join(" - ");
    }
})

renderCount()