export default class API {
  constructor(rootEndpoint) {
    this.rootEndpoint = rootEndpoint;
  }
  async get(path) {
    try {
      const response = await fetch(`${this.rootEndpoint}${path}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}
