import { PROGRESS_MAX_TO_ZERO_DELAY } from '../constant/progress';
import typeCheck from './type-check';

export default class ProgressBar {
  static #progressBar = document.querySelector('.header__search-progress-bar');

  static finishProgress() {
    setTimeout(() => {
      this.setProgress(0);
    }, PROGRESS_MAX_TO_ZERO_DELAY);
  }

  static setProgress(progress, _ = typeCheck(progress, 'function', 'number')) {
    const isFunction = typeof progress === 'function';

    const progressValue = isFunction ? progress(this.getProgress()) : progress;

    this.#progressBar.style.width = `${progressValue}%`;
  }

  static getProgress() {
    return parseFloat(this.#progressBar.style.width);
  }
}
