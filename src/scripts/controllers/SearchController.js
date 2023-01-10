import API from "@/scripts/common/API";
import UI from "@/scripts/UI";

export default class SearchController {
  constructor() {
    this.githubAPI = new API("https://api.github.com");
    this.ui = new UI();
    this.bindEvents();
  }

  bindEvents() {
    document
      .getElementById("search__input")
      .addEventListener("keydown", (e) => {
        this.handleOnKeyDown(e);
      });
  }

  async handleOnKeyDown({ code, target }) {
    if (code === "Enter") {
      const userInfo = await this.getUserInfo(target.value);
      if (userInfo) {
        this.ui.drawUserInfo(userInfo);
      }

      const userRepos = await this.getUserRepository(target.value);
      if (userRepos) {
        console.log(userRepos);
        this.ui.drawUserRepository(userRepos);
      }
    }
  }
  async getUserInfo(username) {
    const res = await this.githubAPI.get(`/users/${username}`);
    return res;
  }

  async getUserRepository(username) {
    const res = await this.githubAPI.get(`/users/${username}/repos`, {
      sort: "created",
      per_page: 5,
    });
    return res;
  }
}
