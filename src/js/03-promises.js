import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';


const form = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

form.addEventListener('submit', onSubmitcreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitcreatePromises(event) {
  event.preventDefault();
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let index = 1; index <= amount; index += 1) {

    if (index !== 1) {
      delay += step;
    }
    createPromise(index, delay).then(fulfilled).catch(rejected).finally();
  }
}

function fulfilled({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function rejected({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

