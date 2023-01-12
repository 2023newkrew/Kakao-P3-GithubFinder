/* eslint-disable max-classes-per-file */
import { FetchError } from '../error/fetch-error';

class _Client {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(path, init = null) {
    const response = await fetch(`${this.#baseUrl}${path}`, init);

    if (response.status !== 200) throw new FetchError(response);

    return response.json();
  }
}

export default class Client {
  static of(baseUrl) {
    return new _Client(baseUrl);
  }
}
