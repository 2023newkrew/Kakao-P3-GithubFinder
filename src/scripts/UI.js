import User from "./user";

export default class UI {
  constructor() {
    this.inputElement = document.getElementById("usernameInput");

    this.mainElement = document.body.querySelector("main");
    this.tagElement = document.getElementById("profile-tag");
    this.infoElement = document.getElementById("profile-info");
    this.userImageElement = document.getElementById("userInfo-image");
    this.latestReposListElement = document.getElementById("latestReposList");

    this.user = new User();
    this.listenInputEvent();
  }

  async displayOFF() {
    this.mainElement.style.opacity = 0;
  }

  async displayON() {
    await this.setUserViewImage();
    await this.setUserViewButton();
    await this.setUserTag();
    await this.setUserInfo();
    await this.setUserLatestRepos();

    this.mainElement.style.opacity = 0.99;
  }

  async setUserViewImage() {
    this.userImageElement.src = "";
    const URL = await this.user.getProfileAvatarURL();
    this.userImageElement.src = URL;
  }

  async setUserViewButton() {
    const viewButton = document.getElementById("view-button");

    const username = this.user.getUserName();
    viewButton.addEventListener("click", (event) => {
      window.open(`https://github.com/${username}`, "_blanck");
    });
  }

  async setUserTag() {
    const publicReposCount = await this.user.getPublicRepoCount();
    const publicGistsCount = await this.user.getPublicGistCount();
    const followerCount = await this.user.getFollowerCount();
    const followingCount = await this.user.getFollowingCount();

    const elementString = `
    <li>Public Repos : ${publicReposCount}</li>
    <li>Public Gists : ${publicGistsCount}</li>
    <li>Followers : ${followerCount}</li>
    <li>Following : ${followingCount}</li>
    `;

    this.tagElement.innerHTML = elementString;
  }

  async setUserInfo() {
    const company = await this.user.getCompany();
    const website = await this.user.getEmail();
    const location = await this.user.getLocation();
    const memberSince = await this.user.getMemberSince();

    const elementString = `
    <li>Company : ${company}</li>
    <li>Website / Blog : ${website}</li>
    <li>Location : ${location}</li>
    <li>Member Since : ${memberSince}</li>
    `;

    this.infoElement.innerHTML = elementString;
  }

  async setUserLatestRepos() {
    const latestRepos = this.user.getFiveLatestRepos();

    const elementString = makeLatestRepoListElement();
    this.latestReposListElement.innerHTML = elementString;

    function makeLatestRepoListElement() {
      let elementString = ``;
      for (let index = 0; index < latestRepos.length; index++) {
        console.log(latestRepos[index]);
        elementString += `
        <li class="latestRepo">
          <div class="title">
            <a href="${latestRepos[index].html_url}" target="_blank">${latestRepos[index].name}</a>
          </div>
          <ul class="tag">
            <li>Stars : ${latestRepos[index].stargazers_count}</li>
            <li>Watchers : ${latestRepos[index].watchers}</li>
            <li>Forks : ${latestRepos[index].forks}</li>
          </ul>
        </li>
        `;
      }
      return elementString;
    }
  }

  listenInputEvent() {
    this.inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        await this.displayOFF();
        if (await this.user.fetchUserData(this.inputElement.value)) {
          await this.displayON();
        } else {
          alert("해당 유저를 찾을 수 없습니다 !");
        }
      }
    });
  }
}
