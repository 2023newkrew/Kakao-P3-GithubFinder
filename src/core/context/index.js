const createContext = (element, key, value) => {
  element.addEventListener(`context-${key}`, (event) => {
    event.detail.resolve(value);
    event.stopImmediatePropagation();
  });
};

const useContext = (element, key) => {
  let result = null;
  const resolve = (value) => {
    result = value;
  };

  element.dispatchEvent(new CustomEvent(`context-${key}`, {
    detail: {resolve},
    bubbles: true,
  }));

  return result;
};

export {createContext, useContext};
