import API from "@/scripts/common/API";
import UI from "@/scripts/UI";
import DataModel from "@/scripts/DataModel";

export default class SearchController {
  constructor() {
    this.githubAPI = new API("https://api.github.com", {
      403: "API 호출 횟수가 너무 많아요:( 잠시만 기다려주세요!",
      404: "유저 정보를 찾을 수 없어요!",
    });

    this.ui = new UI();
    this.dataModel = new DataModel();
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById("search__input").addEventListener("keydown", (e) => {
      this.handleOnKeyDown(e);
    });
  }

  async handleOnKeyDown({ code, target }) {
    if (code === "Enter") {
      const userInfo = await this.getUserInfo(target.value);
      if (userInfo) {
        this.addTargetUserInfoToModel(userInfo);
        this.ui.drawUserInfo();
      } else return;

      const userRepos = await this.getUserRepository(target.value);
      if (userRepos) {
        this.addTargetUserRepositoriesToModel(userRepos);
        this.ui.drawUserRepository();
      } else return;

      target.value = "";
    }
  }

  async getUserInfo(username) {
    const { status, data } = await this.githubAPI.get(`/users/${username}`);
    // 상수 처리하기!
    if (status === 200) {
      return data;
    }
  }

  async getUserRepository(username) {
    const { status = 0, data } = await this.githubAPI.get(`/users/${username}/repos`, {
      sort: "created",
      per_page: 5,
    });
    if (status === 200) {
      return data;
    }
  }

  addTargetUserInfoToModel(userInfo) {
    const targetUserInfo = {
      target_user_info: {
        username: userInfo.login,
        avatar_url: userInfo.avatar_url,
        html_url: userInfo.html_url,
        followers: userInfo.followers,
        following: userInfo.following,
        public_repos: userInfo.public_repos,
        public_gists: userInfo.public_gists,
        company: userInfo.company,
        blog: userInfo.blog,
        location: userInfo.location,
        created_at: userInfo.created_at,
      },
    };
    this.dataModel.setData(targetUserInfo);
  }

  addTargetUserRepositoriesToModel(userRepos) {
    const repoInfoList = userRepos.map((repo) => {
      return {
        name: repo.name,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        watchers: repo.watchers,
        forks: repo.forks,
      };
    });
    const targetUserRepos = {
      target_user_repos: repoInfoList,
    };
    this.dataModel.setData(targetUserRepos);
  }
}
