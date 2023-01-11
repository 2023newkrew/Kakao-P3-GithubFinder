/* eslint-disable max-classes-per-file */
class _Client {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(path, init = null) {
    const response = await fetch(`${this.#baseUrl}${path}`, init);
    return response.json();
  }
}

export default class Client {
  static of(baseUrl) {
    return new _Client(baseUrl);
  }
}
