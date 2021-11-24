import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputField= document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');

let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    finalDate: "",
    restDate: "",
    calcTime: "",
  
  onClose(selectedDates) {
      options.finalDate = selectedDates[0].getTime();
      options.restDate = options.finalDate - options.defaultDate;

      if (options.finalDate < options.defaultDate) {
          startBtn.disabled = true;
          window.alert("Please choose a date in the future");
      }
      else {
          startBtn.disabled = false;
      }
    },
    onStartClick() {
      timer = setInterval(() => {
          startBtn.disabled = true;
        const callTime = Date.now();
        options.restDate = options.finalDate - callTime;

        options.calcTime = convertMs(options.restDate);

        updateClockFace(options.calcTime);
        
        if (options.restDate <= 0) {
          clearInterval(timer);
          timerClear();
          startBtn.disabled = true;
        }       
        }, 1000)
        
    }
};

startBtn.addEventListener('click', options.onStartClick);

flatpickr(inputField, options);

function timerClear () {
      daysCount.textContent = "00";
      hoursCount.textContent = "00";
      minutesCount.textContent = "00";
      secondsCount.textContent = "00";
}

function updateClockFace(time) {
      daysCount.textContent = time.days;
      hoursCount.textContent = time.hours;
      minutesCount.textContent = time.minutes;
      secondsCount.textContent = time.seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of tim
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}