import {
  AbstractMethodNotImplementedError,
  DirectlyConstructedAbstractError,
} from '../error/abstract-error';

export default class View {
  constructor() {
    if (this.constructor === View) {
      throw new DirectlyConstructedAbstractError();
    }
  }

  render() {
    throw new AbstractMethodNotImplementedError('render');
  }
}
