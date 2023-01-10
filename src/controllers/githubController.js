import api from "@utils/api";
import { GITHUB_API_BASE_URL } from "@constants/github";

export default class GithubApiController {
  constructor() {}
  GET(url) {
    return api.get(url, {
      headers: {
        Authorization: process.env.GITHUB_AUTH_TOKEN,
      },
    });
  }
  getUser(username) {
    return this.GET(`${GITHUB_API_BASE_URL}/users/${username}`).catch(
      (error) => {
        if (error === "Not Found") {
          return null;
        }
      }
    );
  }
  getRepos(user) {
    return this.GET(user.repos_url);
  }
}
