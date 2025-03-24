import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

//Variables
const up = document.querySelector('#up');
const number = document.querySelector('#number');
const down = document.querySelector('#down');
const card = document.querySelector('#card')
const button = document.querySelector('#button')
const time = document.querySelector('#time')
const height = document.querySelector('#heightInput')
const heightValue = document.querySelector('#heightValue')
const width = document.querySelector('#widthInput')
const widthValue = document.querySelector('#widthValue')
const cardSymbols = ['♦', '♥', '♠', '♣']
const cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']

let countdownTimer = 10;
let countdownInterval;

//funciones

const randomCards = (arr) => {
  const randomIndex = Math.floor(Math.random()*arr.length)
  return arr[randomIndex]
}
const colorPalos = (palo) => {
  return (palo === '♦' || palo === '♥') ? "text-danger" : "text-dark";
}
const as = (cardNumbers, cardSymbols) => {
  if (cardNumbers === 'A') {
    return randomCards(cardSymbols);  
  }
  return cardNumbers
}

const createCard = () => {
  const rndmSymbols = randomCards(cardSymbols);
  const rndmNumbers = randomCards(cardNumbers);
  const colorValue = colorPalos(rndmSymbols);
  const numberValue = as(rndmNumbers, cardSymbols);

  if (cardSymbols.includes(numberValue)) {
    up.innerHTML = numberValue;  
    number.innerHTML = numberValue;  
    down.innerHTML = numberValue;  
  } else {
    up.innerHTML = rndmSymbols; 
    down.innerHTML = rndmSymbols;
    number.innerHTML = numberValue;  
  }

  up.className = colorValue;
  number.className = colorValue;
  down.className = colorValue;
}

const updateCountdown = () => {
  time.innerHTML = `La carta se genera en ${countdownTimer}s`;

  if (countdownTimer <= 0) {
    createCard(); 
    countdownTimer = 10; 
  } else {
    countdownTimer--;
  }
};

const startCountdown = () => {
  countdownInterval = setInterval(updateCountdown, 1000);
};

const adjustCardFontSize = () => {
  const cardHeight = card.offsetHeight; 
  const cardWidth = card.offsetWidth;    

  const fontSize = Math.min(cardHeight, cardWidth) * 0.12;  

  up.style.fontSize = `${fontSize}px`;
  number.style.fontSize = `${fontSize*2}px`;
  down.style.fontSize = `${fontSize}px`;

};

//eventos

button.addEventListener("click", () => {
  createCard();
});

height.addEventListener('input', () => {
  const newHeight = height.value;
  //heightValue.textContent = `${newHeight}px`;
  card.style.height = `${newHeight}px`; 
  adjustCardFontSize()
});

width.addEventListener('input', () => {
  const newWidth = width.value;
  //widthValue.textContent = `${newWidth}px`;
  card.style.width = `${newWidth}px`; 
  adjustCardFontSize()
});

window.onload = function() {
  startCountdown(); 
};