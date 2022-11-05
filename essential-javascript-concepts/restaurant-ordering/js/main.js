import { menuArray } from './data.js';

const orderBtn = document.getElementById('order');
const modalEl = document.querySelector('.modal');
const orderEl = document.querySelector('.order');
const orderSumaryEl = document.querySelector('.order-summary');
const completeEl = document.querySelector('.complete');

let order = [];
let total = 0;

document.addEventListener('click', (e)=>{
    if(e.target.dataset.item){
        renderCart();
        setTotal();
        addItem(e.target.dataset.item);
    }

    if(e.target.dataset.remitem){
        renderCart();
        setTotal();
        removeItem(e.target.dataset.remitem);
    }

    if(e.target.id === "order"){
        if(total > 0){
            renderModal()
        }
    }

    if(e.target.id === "pay"){
        e.preventDefault();
        renderComplete();
    }
})

function addItem(id){
    const itemExists = menuArray.filter(item => item.id == id)[0];
    if(itemExists){
        orderBtn.classList.remove('disabled');
        const {name, price} = itemExists;
        const isOrdered = order.find(item => item.id == id) ? true : false;
        if(!isOrdered){
            order.push(
                {
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                }
            )
        }
        else{
            const newOrder = order.map(item => item.id == id ? (
                {...item, quantity: item.quantity+=1}
            ) : item);
            order = newOrder;
        }
    }
    renderSummary();
}

function removeItem(id){
    const isOrdered = order.find(item => item.id == id);
    if(isOrdered){
        const newOrder = order.map(item => item.id == id ? (
            {...item, quantity: item.quantity -= 1}
        ) : item);
        order = newOrder.filter(item => item.quantity >= 1);
        renderSummary();
    }
}

function renderCart(){
    orderSumaryEl.style.display = "block";
    renderSummary()
}

function renderSummary() {
    let orderHTML = "";
    total = 0;
    for (const item of order){
        const {id, name, quantity, price} = item;
        total += quantity * price;
        orderHTML += `
        <div class='order-row flex-between'>
        <div class='order-item flex-between'>
            <h5>${name} ${quantity >= 2 ? 'x'+quantity : ''}</h5>
            <button class='btn-remove remove-text' data-remitem='${id}'>remove</button>
        </div>
        <span class='price'>$${price*quantity}<span>
        </div>
        `
    }
    setTotal()
    orderEl.innerHTML = orderHTML;
}

function setTotal(){
    if(total === 0){
        orderBtn.classList.add('disabled');
    }
    document.querySelector('#total').textContent = `$${total}`;
}

function renderMenu(){
    let menuHTML = "";
    for(const item of menuArray){
        const {name, ingredients, id, price, emoji} = item;
        menuHTML += `
            <div class='menu__row flex-between-start'>
                <div class='item grid-2col'>
                    <span class='item__img'>${emoji}</span>
                    <div class='item__info'>
                        <h2>${name}</h2>
                        <p class='ingredients'>${ingredients.join(", ")}</p>
                        <span class='price'>$${price}</span>
                    </div>
                </div>
                <button class='round-btn btn-add' data-item='${id}'>+</button>
            </div>
        `;
    }
    document.querySelector('.menu').innerHTML = menuHTML;
}

function renderModal(){
    modalEl.style.display = 'block';
}

function renderComplete (){
    const name = document.getElementById('name').value;
    const card = document.getElementById('card').value;
    const cvv = document.getElementById('cvv').value;
    if(name && card && cvv) {
        document.getElementById('msg').textContent = '';
        document.getElementById('pay').textContent = 'Processing...';
        setTimeout(()=>{
            document.getElementById('msg').textContent = '';
            renderMsg(name);
            setTimeout(()=>{reset();},1500)
    },2000)

    }
    else{
        document.getElementById('msg').textContent = 'Please input all fields!';
    }
}

function renderMsg(name){
    document.querySelector('.order-summary').display = 'none';
    orderSumaryEl.style.display = 'none';
    modalEl.style.display = 'none';
    completeEl.style.display = 'block';
    completeEl.innerHTML = `
    <h1>Thanks ${name}! Your order is on its way!</h1>
    `;
}

function reset() {
    order = [];
    total = 0;
    document.getElementById('name').value = '';
    document.getElementById('card').value = '';
    document.getElementById('cvv').value = '';
    document.getElementById('pay').textContent = 'Pay';
    document.querySelector('.complete').style.display = 'none';
}

renderMenu();