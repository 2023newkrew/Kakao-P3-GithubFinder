export default class Store {
  constructor(initialState) {
    this.state = initialState;
    this.subsrcibers = [];
  }

  setState(state) {
    this.state = state;
    this._notify();
  }

  _notify() {
    this.subsrcibers.forEach((callback) => callback());
  }

  subscribe(callback) {
    this.subsrcibers.push(callback);
  }
}
