/* eslint-disable max-classes-per-file */
import { CANNOT_CONSTRUCT_ABSTRACT_CLASS, CANNOT_USE_ABSTRACT_METHOD } from '@constant/message';

export class AbstractError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DirectlyConstructedAbstractError extends AbstractError {
  constructor() {
    super(CANNOT_CONSTRUCT_ABSTRACT_CLASS);
  }
}

export class AbstractMethodNotImplementedError extends AbstractError {
  constructor(methodName) {
    super(`${CANNOT_USE_ABSTRACT_METHOD}: ${methodName}`);
  }
}
