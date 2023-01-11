const createStore = (initialValue) => {
  let currentValue = initialValue;

  const callbacks = [];

  const get = () => currentValue;

  const subscribe = (callback) => {
    callbacks.push(callback);
  };

  const unsubscribe = (callback) => {
    callbacks.splice(callbacks.indexOf(callback), 1);
  };

  const publish = (value) => {
    const previousValue = currentValue;
    currentValue = value;
    callbacks.forEach((callback) => callback(currentValue, previousValue));
  };

  return {subscribe, unsubscribe, publish, get};
};

export default createStore;
