import API from "@/scripts/common/API";

export default class SearchController {
  constructor() {
    this.githubAPI = new API("https://api.github.com");
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
        this.drawUserInfo(userInfo);
      }
    }
  }
  async getUserInfo(username) {
    const res = await this.githubAPI.get(`/users/${username}`);
    return res;
  }

  //UI class로 이동 예정
  drawUserInfo(userInfo) {
    const userImageEl = document.getElementById("profile-view__image");
    userImageEl.setAttribute("src", userInfo.avatar_url);
  }
}
