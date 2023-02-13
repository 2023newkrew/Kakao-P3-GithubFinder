import {
  AbstractMethodNotImplementedError,
  DirectlyConstructedAbstractError,
} from '@error/abstract-error';

export default class Binder {
  constructor() {
    if (this.constructor === Binder) {
      throw new DirectlyConstructedAbstractError();
    }
  }

  bindEvents() {
    throw new AbstractMethodNotImplementedError('bindEvents');
  }
}
