import api from "@utils/api";
import { GITHUB_API_BASE_URL } from "@constants/github";

export default class GithubApiController {
  constructor() {}
  getUser(username) {
    return api.get(`${GITHUB_API_BASE_URL}/users/${username}`);
  }
}
