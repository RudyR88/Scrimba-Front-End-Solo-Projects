import {characters, normalChars} from './data.js';

const password1El = document.querySelector('#password1');
const password2El = document.querySelector('#password2');

document.querySelector('#generate-btn').addEventListener('click', generatePassword);

function generatePassword(event){
    event.preventDefault();
    const specialCharactersBool = document.querySelector('#special-chars').checked;
    const passwordLength = document.querySelector('#password-length').value;
    if(passwordLength < 15 || passwordLength > 100){
        document.querySelector('.error').textContent = "Please enter a valid password length (15-100)";
        resetPasswordEls();
        return "";
    }
    document.querySelector('.error').textContent = "";
        switch(specialCharactersBool){
            case true:
                password1El.textContent = getRandomPassword(passwordLength, characters);
                password2El.textContent = getRandomPassword(passwordLength, characters);
                break;
            case false:
                password1El.textContent = getRandomPassword(passwordLength, normalChars);
                password2El.textContent = getRandomPassword(passwordLength, normalChars);
                break;
        }
}

function resetPasswordEls(){
    password1El.textContent = "";
    password2El.textContent = "";
}

function getRandomPassword(length, data){
    let password = "";
    for(let i=0; i<length; i++){
        let randomIndex = Math.ceil(Math.random() * data.length-1);
        password+=data[randomIndex];
    }
    return password;
}