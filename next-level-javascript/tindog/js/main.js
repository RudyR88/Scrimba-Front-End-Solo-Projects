import { dogs } from './data.js';
import { Dog } from './Dog.js';

const dogProfile = document.querySelector('#dogProfile');
const endMessage = document.querySelector('.endMessage');

let dogsObject = dogs;
let isWaiting = false;

document.addEventListener('click', (e)=>{
    if(e.target.dataset.decision === "nope"){
        swipe("nope");
    }

    if(e.target.dataset.decision === "like"){
        swipe("like");
    }
})

function getNewDog () {
    const nextDogData = dogsObject.shift();
    return nextDogData ? new Dog(nextDogData) : {};
}

function render () {
    dogProfile.innerHTML = dog.getProfileHtml();
}

function renderEndMessage(){
    dogProfile.style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    endMessage.style.display = 'flex';
    endMessage.innerHTML = `<h2>No new matches!</h2>`;
}

function reset(){
    setTimeout(()=>{
        renderEndMessage();
        setTimeout(()=>{
            window.location.reload();
        }, 1500);
    }, 1500);
}

function swipe (descision) {
    if(!isWaiting){
        dog.hasBeenSwiped = true;
        descision === "like" ? dog.hasBeenLiked = true : dog.hasBeenLiked = false;
        render()

        if(dog.hasBeenSwiped){
            isWaiting = true;
            if(dogsObject.length > 0){
                setTimeout(()=>{
                    dog = getNewDog();
                    render();
                    document.getElementById("btn-nope").blur();
                    document.getElementById("btn-like").blur();
                    isWaiting = false;
                }, 1500);
            }
            else {
                reset();
            }
        }
    }
}

let dog = getNewDog();
render();