import {
  AbstractMethodNotImplementedError,
  DirectlyConstructedAbstractError,
} from '../error/abstract-error';

export default class Model {
  constructor() {
    if (new.target === Model) {
      throw new DirectlyConstructedAbstractError();
    }
  }

  getData() {
    throw new AbstractMethodNotImplementedError('getData');
  }

  setData() {
    throw new AbstractMethodNotImplementedError('setData');
  }
}
