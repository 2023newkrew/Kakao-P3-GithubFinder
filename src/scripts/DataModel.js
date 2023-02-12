export default class DataModel {
  static #instance;
  #data;
  constructor() {
    if (DataModel.#instance) {
      return DataModel.#instance;
    }
    DataModel.#instance = this;
    this.#data = {};
  }

  setData(newData) {
    this.#data = { ...this.#data, ...newData };
  }

  getData(dataKey) {
    return this.#data[dataKey];
  }
}
