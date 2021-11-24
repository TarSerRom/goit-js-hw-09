
const body = document.querySelector("body");
const startBtn = document.querySelector("[data-start]");
const stoptBtn = document.querySelector("[data-stop]");

startBtn.addEventListener('click', onStartClick);
stoptBtn.addEventListener('click', onStopClick);

function newBodyStyle() {
   body.style.backgroundColor = getRandomHexColor();
};

let timerId = null;

function onStartClick() {
    
    timerId = setInterval(newBodyStyle, 1000);

    if (startBtn) {
        startBtn.disabled = true;
        stoptBtn.disabled = false;
        console.log('clicked on');
}
}
function onStopClick() {
    
    clearInterval(timerId);

    if (stoptBtn) {
        stoptBtn.disabled = true;
        startBtn.disabled = false;
        console.log('clicked off');
    }
    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

