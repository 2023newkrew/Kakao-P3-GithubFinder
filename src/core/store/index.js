const createStore = (initialValue) => {
  let currentValue = initialValue;

  const callbacks = [];

  const subscribe = (callback) => {
    callbacks.push(callback);
    callback(currentValue);
  };

  const unsubscribe = (callback) => {
    callbacks.splice(callbacks.indexOf(callback), 1);
  };

  const publish = (value) => {
    const previousValue = currentValue;
    currentValue = value;
    callbacks.forEach((callback) => callback(currentValue, previousValue));
  };

  return {subscribe, unsubscribe, publish};
};

export default createStore;
