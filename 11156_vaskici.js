const computerGame = document.querySelectorAll(".computer");
const playerGame = document.querySelectorAll(".player");
const btn = document.querySelector("button");
const points = document.querySelectorAll("h1");
const btnEnd = document.querySelectorAll("button")[1]
const title = document.getElementById("draw");
const historyBox = document.getElementById("history")


let array = ["rock", "paper", "scissors"];
let pointsPl = 0;
let pointsComp = 0;
let selectedItemPl;
let selectedItemComp;
let playerChoose = false;
let counter = 0;
let selectedHistory = [];

playerGame.forEach((x, ind1) => x.onclick = () => {
    selectedItemPl = ind1;
    playerChoose = true;
    //console.log("pasirinko zaidejas", ind1)
    unselectedAll(playerGame, selectedItemPl);
})

btn.onclick = () => {
    if (playerChoose) {
        //computer random pasirenka nuo 0 iki 2
        let random = Math.floor(Math.random() * 3)
        selectedItemComp = random;
        //console.log("pasirinko kompas", random)
        // console.log("skaiciuok kas alimejo")
        unselectedAll(computerGame, selectedItemComp);
        whoIsWinner(selectedItemPl, selectedItemComp);
        playerChoose = false;
        timeOut(computerGame);
        timeOut(playerGame);
        historyMatch(selectedItemPl, selectedItemComp)
    } else {
        alert("Player must choose one of the three items")
    }
}


//atsiusiu pasirinktus indeksus ir lyginsiu, zinodama, kokia tvarka yra paveiksliukai
function whoIsWinner(player1, computer) {
    if (player1 === computer) {
        title.innerText = "Draw...";
    } else if (player1 === 0 && computer === 2 || player1 === 1 && computer === 0 || player1 === 2 && computer === 1) {
        pointsPl += 10;
        points[1].innerHTML = `Player score: ${pointsPl}`;
        title.innerText = "You win!";
    } else if (player1 === 2 && computer === 0 || player1 === 0 && computer === 1 || player1 === 1 && computer === 2) {
        pointsComp += 10;
        points[2].innerHTML = `Computer score: ${pointsComp}`
        title.innerText = "Congratulations, computer!";
    }
}

btnEnd.onclick = () => {
    if(pointsPl>pointsComp){
        alert("You win, congratulations");
    } else if (pointsPl < pointsComp){
        alert("You lost...");
    } else {
        alert("Draw, play again!")
    }
    location.reload();
}


function unselectedAll(items, index) {
    items.forEach(x => x.classList.remove('selected'));
    selectOne(items, index)
}

function selectOne(items, index) {
    items[index].classList.add("selected");
}

function timeOut(items) {
    setTimeout(function () {
        items.forEach(x => x.classList.remove('selected'))
    }, 500);
}

function historyMatch(ind1, ind2) {
    counter++;

    selectedHistory.push(array[ind1]);
    selectedHistory.push(array[ind2]);

    let dif = 0;
    if (counter <= 6) {
        dif = 0;
    } else {
        dif = counter - 6;
    }
    historyBox.innerHTML = "";
    for (let i = dif * 2; i < counter * 2; i++) {
        historyBox.innerHTML += `<div class=${selectedHistory[i]}></div>`;
        if (i % 2) {
            historyBox.innerHTML += `<div class="border"></div>`;
        }
    }
}
