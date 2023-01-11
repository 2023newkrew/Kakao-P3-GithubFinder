export default class User {
  constructor() {
    this.userData = null;
    this.userRepository = null;
    this.username = null;
  }

  async fetchUserData(username) {
    this.username = username;

    this.userData = await (
      await fetch(`https://api.github.com/users/${username}`)
    ).json();
    if (this.userData.message === "Not Found") return false;

    this.userRepository = await (
      await fetch(`https://api.github.com/users/${username}/repos`)
    ).json();

    // 최근 업데이트 순 정렬
    this.userRepository.sort(function (elementA, elementB) {
      return (
        new Date(elementB.updated_at).getTime() -
        new Date(elementA.updated_at).getTime()
      );
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

  // * 최근 5개의 레포지토리를 보냄
  getFiveLatestRepos() {
    return this.userRepository.slice(0, 5);
  }
}
