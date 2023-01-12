import Modal from "@lib/modal.js";

export default class UserInfoProfile {
  constructor(user) {
    this.tagElement = document.getElementById("profile-tag");
    this.infoElement = document.getElementById("profile-info");
    this.GHChartImageElement = document.getElementById("GHChart");

    this.user = user;
    this.modal = new Modal();
  }
  renderUserTag() {
    const publicReposCount = this.user.getPublicRepoCount();
    const publicGistsCount = this.user.getPublicGistCount();
    const followerCount = this.user.getFollowerCount();
    const followingCount = this.user.getFollowingCount();

    const elementString = `
    <li class="publicRepos">Public Repos : ${publicReposCount}</li>
    <li class="publicGists">Public Gists : ${publicGistsCount}</li>
    <li class="followers">Followers : ${followerCount}</li>
    <li class="following">Following : ${followingCount}</li>
    `;

    this.tagElement.innerHTML = elementString;
    this.listenUserTag();
  }

  listenUserTag() {
    const publicReposElement = document.body.querySelector(".publicRepos");
    const publicGistsElement = document.body.querySelector(".publicGists");
    const followersElement = document.body.querySelector(".followers");
    const followingElement = document.body.querySelector(".following");

    publicReposElement.onclick = async () => {
      const publicReposList = await this.user.getPublicReposList();
      let publicReposName = `<ul>`;
      for (let index = 0; index < publicReposList.length; index++) {
        publicReposName += `<li>${publicReposList[index].name}</li>`;
      }
      publicReposName += "</ul>";

      this.modal.renderModal("Repository", publicReposName);
      this.modal.onModal();
    };

    publicGistsElement.onclick = async () => {
      const publicGistsList = await this.user.getPublicGistsList();
      let publicGistsName = `<ul>`;
      for (let index = 0; index < publicGistsList.length; index++) {
        publicGistsName += `<li>${publicGistsList[index].name}</li>`;
      }
      publicGistsName += "</ul>";

      this.modal.renderModal("Gists", publicGistsName);
      this.modal.onModal();
    };

    followersElement.onclick = async () => {
      const followList = await this.user.getFollowList();
      let followName = `<ul>`;
      for (let index = 0; index < followList.length; index++) {
        followName += `<li>${followList[index].login}</li>`;
      }
      followName += "</ul>";

      this.modal.renderModal("Followers", followName);
      this.modal.onModal();
    };

    followingElement.onclick = async () => {
      const followingList = await this.user.getFollowingList();
      let followingName = `<ul>`;
      for (let index = 0; index < followingList.length; index++) {
        followingName += `<li>${followingList[index].login}</li>`;
      }
      followingName += "</ul>";

      this.modal.renderModal("Followings", followingName);
      this.modal.onModal();
    };
  }

  renderUserInfo() {
    const company = this.user.getCompany();
    const website = this.user.getEmail();
    const location = this.user.getLocation();
    const memberSince = this.user.getMemberSince();

    const elementString = `
    <li>Company : ${company}</li>
    <li>Website / Blog : ${website}</li>
    <li>Location : ${location}</li>
    <li>Member Since : ${memberSince}</li>
    `;

    this.infoElement.innerHTML = elementString;
  }

  renderUserGitHubChart() {
    const username = this.user.getUserName();
    this.GHChartImageElement.src = `https://ghchart.rshah.org/${username}`;
  }
}
