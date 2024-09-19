import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
// initialize options for izitoast
const optionsiziToast = {
  messageColor: 'white',
  backgroundColor: 'red',
  position: 'topRight',
  message: 'Please choose a date in the future',
};
// initialize options for flatpickr
const optionsFlatPickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = checkSelectedDate(selectedDates[0]);
    if (userSelectedDate) {
      enableStartButton();
    } else {
      disableStartButton();
      showError();
    }
  },
};
const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

const checkSelectedDate = date => {
  const parseDate = Date.parse(date);
  return parseDate - Date.now() > 0 ? parseDate : false;
};
const enableStartButton = () => {
  startBtn.disabled = false;
};
const disableStartButton = () => {
  startBtn.disabled = true;
};
const disableInput = () => {
  dateTimePicker.disabled = true;
};
const enableInput = () => {
  dateTimePicker.disabled = false;
};
const showError = () => {
  iziToast.error(optionsiziToast);
};
const convertMs = ms => {
  // Number of milliseconds per unit of time
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};
const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
const runTimer = () => {
  disableStartButton();

  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = userSelectedDate - currentDate;

    if (deltaTime < 0) {
      clearInterval(intervalId);
      enableInput();
    } else {
      disableInput();
      const convertDate = convertMs(deltaTime);
      updateTimer(convertDate);
    }
  }, 1000);
};

const updateTimer = convertDate => {
  const { days, hours, minutes, seconds } = convertDate;

  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;
};

flatpickr(dateTimePicker, optionsFlatPickr);
startBtn.addEventListener('click', runTimer);
