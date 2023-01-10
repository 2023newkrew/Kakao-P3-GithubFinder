export default class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subsrcibers = [];
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  notify() {
    this.subsrcibers.forEach((callback) => callback());
  }

  subscribe(callback) {
    this.subsrcibers.push(callback);
  }
}
