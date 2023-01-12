export default class Store {
  constructor(initialState) {
    this._state = initialState;
    this.subsrcibers = [];
  }

  get state() {
    return this._state;
  }

  setState(state) {
    this._state = state;
    this._notify();
  }

  _notify() {
    this.subsrcibers.forEach((callback) => callback());
  }

  subscribe(callback) {
    this.subsrcibers.push(callback);
  }
}
