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
    <li class="publicRepos" data-element="Repository">Public Repos : ${publicReposCount}</li>
    <li class="publicGists" data-element="Gists">Public Gists : ${publicGistsCount}</li>
    <li class="followers" data-element="followers">Followers : ${followerCount}</li>
    <li class="following" data-element="following">Following : ${followingCount}</li>
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
    const response = await Promise.all([this.user.getPublicReposList(), this.user.getPublicGistsList(), this.user.getFollowList(), this.user.getFollowingList()]);

    const publicReposList = response[0] || "정보를 불러올 수 없습니다";
    const publicGistsList = response[1] || "정보를 불러올 수 없습니다";
    const followList = response[2] || "정보를 불러올 수 없습니다";
    const followingList = response[3] || "정보를 불러올 수 없습니다";

    this.tagElement.onclick = (event) => {
      const modalTitle = event.target.dataset.element;
      if (event.target.dataset.element === "Repository") this.renderTagModal(modalTitle, publicReposList);
      if (event.target.dataset.element === "Gists") this.renderTagModal(modalTitle, publicGistsList);
      if (event.target.dataset.element === "followers") this.renderTagModal(modalTitle, followList);
      if (event.target.dataset.element === "following") this.renderTagModal(modalTitle, followingList);
    };
  }

  renderTagModal(title, element) {
    let elementString = `<ul>`;

    // ! 지금 작성된 코드에서는 name 또는 login 값으로 들어오기에 단축 평가를 활용해 작성
    for (let index = 0; index < element.length; index++) {
      elementString += `
      <li>
        <a href="${element[index].html_url}" target="_blank">
          ${element[index].name || element[index].login}    
        </a>
      </li>
      `;
    }

    this.modal.renderModal(title, elementString);
  }
}
