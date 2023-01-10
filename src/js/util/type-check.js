/* eslint-disable valid-typeof */
import { InvalidTypeError } from '../error/invalid-error';

const typeCheck = (target, type) => {
  if (typeof type === 'string') {
    if (typeof target !== type) {
      throw new InvalidTypeError(target, type);
    }
  } else if (!(target instanceof type)) {
    throw new InvalidTypeError(target, type);
  }
  return target;
};

export default typeCheck;
