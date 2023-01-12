export default function debounce(callback, delay = 500) {
  let timeoutID;

  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, args), delay);
  };
}
