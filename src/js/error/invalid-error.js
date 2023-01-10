/* eslint-disable max-classes-per-file */
import { INVALID_TYPE, INVALID_VIEW_MODEL } from '../constant/message';

export class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidTypeError extends InvalidError {
  constructor(target, type) {
    super(`${INVALID_TYPE}: ${target} is not ${type}`);
  }
}

export class InvalidViewModelError extends InvalidError {
  constructor(viewModelName) {
    super(`${INVALID_VIEW_MODEL}: ${viewModelName}`);
  }
}
