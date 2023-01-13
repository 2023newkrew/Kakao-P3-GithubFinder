import api from "@utils/api";
import { GITHUB_API_BASE_URL } from "@constants/github";

export default class GithubApiController {
  constructor() {}
  fetchData(url) {
    return api.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`,
      },
    });
  }
  getUser(username) {
    return this.fetchData(`${GITHUB_API_BASE_URL}/users/${username}`).catch(
      (error) => {
        if (error === "Not Found") {
          return null;
        }
      }
    );
  }
  getRepos(user) {
    return this.fetchData(user.reposUrl);
  }
}
