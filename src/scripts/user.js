export default class User {
  constructor() {
    this.userData = null;
    this.userRepository = null;
  }

  async fetchUserData(username) {
    this.userData = await (await fetch(`https://api.github.com/users/${username}`)).json();
    this.userRepository = await (await fetch(`https://api.github.com/users/${username}/repos`)).json();

    // 최근 업데이트 순 정렬
    this.userRepository.sort(function (elementA, elementB) {
      return new Date(elementB.updated_at).getTime() - new Date(elementA.updated_at).getTime();
    });
  }

  async;

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
}
