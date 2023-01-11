import UI from "@/scripts/UI";

export default class API {
  constructor(rootEndpoint) {
    this.ui = new UI();
    this.rootEndpoint = rootEndpoint;
  }
  async get(path, params) {
    try {
      const paramsStr = new URLSearchParams(params).toString();
      const response = await fetch(`${this.rootEndpoint}${path}?${paramsStr}`);

      return { status: response.status, data: await response.json() };
    } catch (error) {
      this.ui.alertError("통신에 문제가 생겼습니다!");
      return {};
    }
  }
}
