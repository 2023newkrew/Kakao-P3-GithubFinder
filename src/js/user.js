import sweetAlert from "../lib/sweetAlert";

import env from "../../env.json";
const axios = require("axios");

const header = {
  Authorization: env.API_TOKEN,
};

export default class User {
  constructor() {
    this.userData = null;
    this.userRepository = null;
    this.username = null;
  }

  async fetchUserData(username) {
    const response = await axios(`https://${env.API_SERVER}/${username}`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) {
        return false;
      }
    });

    if (response === false) return false;

    this.userData = response.data;
    this.username = this.userData.login;

    return true;
  }

  async fetchUserRepos(username) {
    const response = await axios(`https://${env.API_SERVER}/${username}/repos`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) return false;
    });

    if (response === false) return false;

    this.userRepository = response.data;
    return true;
  }

  getUserName() {
    return this.username;
  }

  async getPublicReposList() {
    const response = await axios(`${this.userData.repos_url}`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) return false;
    });

    if (response === false) return false;

    const publicReposList = response.data;
    return publicReposList;
  }

  async getPublicGistsList() {
    const gists_url = this.userData.gists_url.replace("{/gist_id}", "");

    const response = await axios(`${gists_url}`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) return false;
    });

    if (response === false) return false;

    const gistList = response.data;
    return gistList;
  }

  async getFollowList() {
    const response = await axios(`${this.userData.followers_url}`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) return false;
    });

    if (response === false) return false;

    const followList = response.data;
    return followList;
  }

  async getFollowingList() {
    const following_url = this.userData.following_url.replace("{/other_user}", "");

    const response = await axios(`${following_url}`, {
      headers: header,
    }).catch((error) => {
      if (error.response.status == 404) return false;
    });

    if (response === false) return false;

    const followingList = response.data;
    return followingList;
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
