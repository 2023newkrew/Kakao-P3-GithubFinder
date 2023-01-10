export default class Client {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  static of(baseUrl) {
    return new Client(baseUrl);
  }

  async get(path, body = {}) {
    const response = await fetch(`${this.#baseUrl}${path}`, body);
    return response.json();
  }
}
