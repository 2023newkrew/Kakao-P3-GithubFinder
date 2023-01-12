import sweetAlert from "../lib/sweetAlert";

import env from "../../env.json";

export default class User {
  constructor() {
    this.userData = null;
    this.userRepository = null;
    this.username = null;
  }

  async fetchUserData(username) {
    this.userData = await (
      await fetch(`https://${env.API_SERVER}/${username}`, {
        headers: {
          Authorization: `${env.API_TOKEN}`,
        },
      })
    ).json();

    // ! 유저의 정보가 확인되지 않았을 경우
    if (this.userData.message === "Not Found") return false;

    this.username = username;

    this.userRepository = await (
      await fetch(`https://${env.API_SERVER}/${username}/repos`, {
        headers: {
          Authorization: `${env.API_TOKEN}`,
        },
      })
    ).json();

    // 최근 업데이트 순 정렬
    this.userRepository.sort((elementA, elementB) => {
      return new Date(elementB.updated_at).getTime() - new Date(elementA.updated_at).getTime();
    });

    return true;
  }

  getUserName() {
    return this.username;
  }

  async getFollowList() {
    const followList = await (await fetch(`${this.userData.followers_url}`)).json();
    return followList;
  }

  async getPublicReposList() {
    const publicReposList = await (await fetch(`${this.userData.repos_url}`)).json();
    return publicReposList;
  }

  async getFollowingList() {
    const following_url = this.userData.following_url.replace("{/other_user}", "");
    const followingList = await (await fetch(following_url)).json();
    return followingList;
  }

  async getPublicGistsList() {
    const gists_url = this.userData.gists_url.replace("{/gist_id}", "");
    const gistList = await (await fetch(gists_url)).json();
    return gistList;
  }

  getProfileAvatarURL() {
    return this.userData.avatar_url;
  }

  getFollowerCount() {
    return this.userData.followers;
  }

  getFollowingCount() {
    return this.userData.following;
  }

  getCompany() {
    return this.userData.company;
  }

  getEmail() {
    return this.userData.email;
  }

  getLocation() {
    return this.userData.location;
  }

  getMemberSince() {
    return this.userData.created_at;
  }

  getPublicRepoCount() {
    return this.userData.public_repos;
  }

  getPublicGistCount() {
    return this.userData.public_gists;
  }

  getGitHubURL() {
    return this.userData.url;
  }

  getLatestRepos(number) {
    return this.userRepository.slice(0, number);
  }
}
