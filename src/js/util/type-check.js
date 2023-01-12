/* eslint-disable valid-typeof */
import { InvalidTypeError } from '@error/invalid-error';

const typeCheck = (target, ...types) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const type of types) {
    if (typeof type === 'string') {
      if (typeof target === type) return target;
    } else if (target instanceof type) {
      return target;
    }
  }

  throw new InvalidTypeError(target, types);
};

export default typeCheck;
