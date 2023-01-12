export default class Alert {
  static #alertContainer = document.querySelector('.alert-container');

  static createTimerAlert(message, { type = 'danger', timeout = 3000 } = {}) {
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
    alert.textContent = message;

    this.#alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, timeout);
  }
}
