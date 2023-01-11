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
      } else return;

      const userRepos = await this.getUserRepository(target.value);
      if (userRepos) {
        this.ui.drawUserRepository(userRepos);
      } else return;

      target.value = "";
    }
  }

  async getUserInfo(username) {
    const { status, data } = await this.githubAPI.get(`/users/${username}`);
    // 상수 처리하기!
    if (status === 404) {
      this.ui.alertError("유저 정보를 찾을 수 없어요!");
      return;
    } else if (status === 200) {
      return data;
    }
  }

  async getUserRepository(username) {
    const { status = 0, data } = await this.githubAPI.get(
      `/users/${username}/repos`,
      {
        sort: "created",
        per_page: 5,
      }
    );
    if (status === 404) {
      this.ui.alertError("유저 정보를 찾을 수 없어요!");
      return;
    } else if (status === 200) {
      return data;
    }
  }
}
