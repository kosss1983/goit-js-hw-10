import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const optionsIziToast = {
  icon: '',
  messageColor: 'white',
  backgroundColor: '',
  position: 'topRight',
  message: '',
};
const form = document.querySelector('form');
const generatePromise = () => {
  return new Promise((resolve, reject) => {
    const state = form.state.value;
    const delay = form.delay.value;

    setTimeout(() => {
      if (state === 'fulfilled') {
        optionsIziToast.backgroundColor = 'green';
        optionsIziToast.message = `✅ Fulfilled promise in ${delay}ms`;
        resolve();
      } else {
        optionsIziToast.backgroundColor = 'red';
        optionsIziToast.message = `❌ Rejected promise in ${delay}ms`;
        reject();
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  generatePromise()
    .then(() => iziToast.success(optionsIziToast))
    .catch(() => iziToast.error(optionsIziToast));
});
