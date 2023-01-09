export default class User {
  constructor() {
    this.userData = null;
  }

  async fetchUserData(username) {
    this.userData = await (await fetch(`https://api.github.com/users/${username}`)).json();
    console.log(this.userData);
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
}
