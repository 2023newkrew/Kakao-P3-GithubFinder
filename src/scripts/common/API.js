import UI from "@/scripts/UI";

export default class API {
  constructor(rootEndpoint, errorMessage) {
    this.ui = new UI();
    this.rootEndpoint = rootEndpoint;
    this.errorMessage = errorMessage;
  }
  async get(path, params) {
    try {
      const paramsStr = new URLSearchParams(params).toString();
      const response = await fetch(`${this.rootEndpoint}${path}?${paramsStr}`);

      if (Object.keys(this.errorMessage).includes(response.status.toString())) {
        throw new Error(this.errorMessage[response.status]);
      }
      return { status: response.status, data: await response.json() };
    } catch (error) {
      this.ui.alertError(error.message);
      return {};
    }
  }
}
