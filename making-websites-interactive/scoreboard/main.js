const homeScoreEl = document.getElementById("home-score");
const homeFoulEl = document.getElementById("home-foul");
const guestScoreEl = document.getElementById("guest-score");
const guestFoulEl = document.getElementById("guest-foul");
const gamePeriodEl = document.getElementById("game-period");
const timerMinutesEl = document.getElementById("minutes");
const timerSecondsEl = document.getElementById("seconds");

let homeScore = 0;
let guestScore = 0;
let homeFoul = 0;
let guestFoul = 0;
let period = 0;
let minute = 48;
let second = 0;
let cron = 0;
let timeRunning = false;


function addTo(team, type, number){
    if(timeRunning){
        switch(team){
            case("home"):
                switch(type){
                    case "score":
                        homeScore += number;
                        checkLeader(homeScore, guestScore);
                        homeScoreEl.textContent = homeScore;
                        break;
                    case "foul":
                        homeFoul += number
                        homeFoulEl.textContent = homeFoul;
                        break;
                }
                break;
            case("guest"):
                switch(type){
                    case "score":
                        guestScore += number;
                        checkLeader(homeScore, guestScore);
                        guestScoreEl.textContent = guestScore;
                        break;
                    case "foul":
                        guestFoul += number
                        guestFoulEl.textContent = guestFoul;
                        break;
                }
                break;
            default:
                "";
                break;
        }
    }
}

function checkLeader (home, guest){
    const leader = home > guest ? "home" : 
        guest > home ? "guest" :
        "none";
    switch(leader){
        case "home":
            homeScoreEl.style.border = "solid 2.5px #B8DBD9";
            guestScoreEl.style.border = "none";
            break;
        case "guest":
            homeScoreEl.style.border = "none";
            guestScoreEl.style.border = "solid 2.5px #B8DBD9";
            break;
        case "none":
            homeScoreEl.style.border = "none";
            guestScoreEl.style.border = "none";
            break;
    }
}

document.getElementById('start-timer').addEventListener("click", startCountdown);
document.getElementById('new-game').addEventListener("click", reset);

function reset(){
    homeScore = 0;
    guestScore = 0;
    homeFoul = 0;
    guestFoul = 0;
    period = 0;
    minute = 48;
    second = 0;
    timeRunning = false;
    homeScoreEl.textContent = homeScore;
    homeFoulEl.textContent = homeFoul;
    guestScoreEl.textContent = guestScore;
    guestFoulEl.textContent = guestFoul;
    homeScoreEl.style.border = "none";
    guestScoreEl.style.border = "none";
    gamePeriodEl.textContent = period;
    timerMinutesEl.textContent = returnData(minute);
    timerSecondsEl.textContent = returnData(second);
}

function startCountdown(){
    if(timeRunning == false){
        timeRunning = true;
        cron = setInterval(()=>{timeRunning ? countdown() : clearInterval(cron);}, 1000)
    }
}

function countdown(){
    if(minute === 48){
        minute--;
        second = 60;
        period++;
        gamePeriodEl.textContent = period;
    }
    if(second === 0){
        if(minute === 0){
            clearInterval(cron);
            return;
        }
        minute--;
        second = 60
    }
    if(minute % 12 == 0 && second == 1){
        period++;
        gamePeriodEl.textContent = period;
    }
    second--;
    timerMinutesEl.textContent = returnData(minute);
    timerSecondsEl.textContent = returnData(second);
}

function returnData(input){
    return input >= 10 ? input : `0${input}`;
}