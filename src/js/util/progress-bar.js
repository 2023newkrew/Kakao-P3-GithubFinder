import { PROGRESS_MAX_TO_ZERO_DELAY } from '../constant/progress';
import { InvalidTypeError } from '../error/invalid-error';

export default class ProgressBar {
  static #progressBar = document.querySelector('.header__search-progress-bar');

  static finishProgress() {
    setTimeout(() => {
      this.setProgress(0);
    }, PROGRESS_MAX_TO_ZERO_DELAY);
  }

  static setProgress(progress) {
    let progressValue;

    if (typeof progress === 'function') {
      progressValue = progress(this.getProgress());
    } else if (typeof progress === 'number') {
      progressValue = progress;
    } else {
      throw new InvalidTypeError(progress, 'function or number');
    }

    this.#progressBar.style.width = `${progressValue}%`;
  }

  static getProgress() {
    return parseFloat(this.#progressBar.style.width);
  }
}
