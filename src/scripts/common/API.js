export default class API {
  constructor(rootEndpoint) {
    this.rootEndpoint = rootEndpoint;
  }
  async get(path, params) {
    try {
      const paramsStr = new URLSearchParams(params).toString();
      const response = await fetch(`${this.rootEndpoint}${path}?${paramsStr}`);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
