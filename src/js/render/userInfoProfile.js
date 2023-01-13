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
    this.listenUserTagEvent();
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

  async listenUserTagEvent() {
    const publicReposElement = document.body.querySelector(".publicRepos");
    const publicGistsElement = document.body.querySelector(".publicGists");
    const followersElement = document.body.querySelector(".followers");
    const followingElement = document.body.querySelector(".following");

    const response = await Promise.all([this.user.getPublicReposList(), this.user.getPublicGistsList(), this.user.getFollowList(), this.user.getFollowingList()]);

    const publicReposList = response[0] || "정보를 불러올 수 없습니다";
    const publicGistsList = response[1] || "정보를 불러올 수 없습니다";
    const followList = response[2] || "정보를 불러올 수 없습니다";
    const followingList = response[3] || "정보를 불러올 수 없습니다";

    publicReposElement.onclick = () => {
      if (typeof publicReposList === String) return false;
      let publicReposName = `<ul>`;
      for (let index = 0; index < publicReposList.length; index++) {
        publicReposName += `<li><a href="${publicReposList[index].html_url}" target="_blank">${publicReposList[index].name}</a></li>`;
      }
      publicReposName += "</ul>";

      this.modal.renderModal("Repository", publicReposName);
    };

    publicGistsElement.onclick = () => {
      if (typeof publicGistsList === String) return false;
      let publicGistsName = `<ul>`;
      for (let index = 0; index < publicGistsList.length; index++) {
        publicGistsName += `<li>${publicGistsList[index].name}</li>`;
      }
      publicGistsName += "</ul>";

      this.modal.renderModal("Gists", publicGistsName);
    };

    followersElement.onclick = () => {
      if (typeof followList === String) return false;
      let followName = `<ul>`;
      for (let index = 0; index < followList.length; index++) {
        followName += `<li><a href="${followList[index].html_url}" target="_blank">${followList[index].login}</a></li>`;
      }
      followName += "</ul>";

      this.modal.renderModal("Followers", followName);
    };

    followingElement.onclick = () => {
      if (typeof followingList === String) return false;
      let followingName = `<ul>`;
      for (let index = 0; index < followingList.length; index++) {
        followingName += `<li><a href="${followingList[index].html_url}" target="_blank">${followingList[index].login}</a></li>`;
      }
      followingName += "</ul>";

      this.modal.renderModal("Followings", followingName);
    };
  }
}
