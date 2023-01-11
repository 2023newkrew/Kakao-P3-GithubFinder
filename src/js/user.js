import sweetAlert from "../lib/sweetAlert";

import env from "../../env.json";

export default class User {
  constructor() {
    this.userData = null;
    this.userRepository = null;
    this.username = null;
  }

  async fetchUserData(username) {
    // TODO : Bearer Token .env 파일로 빼내기
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

  // TODO : 적절한 함수명 짓기
  getLatestRepos(number) {
    return this.userRepository.slice(0, number);
  }
}
