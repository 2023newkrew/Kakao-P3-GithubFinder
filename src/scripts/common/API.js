import UI from "@/scripts/UI";
import { httpStatusCodes, httpStatusErrorMessages } from "@/scripts/common/constants";

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

      if (response.status >= httpStatusCodes.BAD_REQUEST) {
        throw new Error(this.setErrorMessage(response.status));
      }

      return { status: response.status, data: await response.json() };
    } catch (error) {
      this.ui.alertError(error.message);
      return {};
    }
  }

  setErrorMessage(status) {
    return (
      this.errorMessage[status] ??
      httpStatusErrorMessages[status] ??
      httpStatusErrorMessages.default
    );
  }
}
