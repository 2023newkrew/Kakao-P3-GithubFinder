import User from "./user";
import sweetAlert from "../lib/sweetAlert";

export default class UI {
  constructor() {
    this.inputElement = document.getElementById("usernameInput");

    this.mainElement = document.body.querySelector("main");
    this.tagElement = document.getElementById("profile-tag");
    this.infoElement = document.getElementById("profile-info");
    this.userImageElement = document.getElementById("userInfo-image");
    this.viewButtonElement = document.getElementById("view-button");
    this.latestReposListElement = document.getElementById("latestReposList");

    this.user = new User();
    this.listenInputEvent();
  }

  async displayAlert() {
    sweetAlert.showTimerAlert("유저의 정보를 가져오는 중입니다.", 1000);
  }

  async displayON() {
    this.setUserViewImage();
    this.setUserViewButton();
    this.setUserTag();
    this.setUserInfo();
    this.setUserLatestRepos();

    this.mainElement.style.opacity = 0.99;
  }

  setUserViewImage() {
    this.userImageElement.src = "";
    const URL = this.user.getProfileAvatarURL();
    this.userImageElement.src = URL;
  }

  setUserViewButton() {
    const username = this.user.getUserName();
    this.viewButtonElement.innerHTML = `<a href="https://github.com/${username}">View Profile</a>`;
  }

  setUserTag() {
    const publicReposCount = this.user.getPublicRepoCount();
    const publicGistsCount = this.user.getPublicGistCount();
    const followerCount = this.user.getFollowerCount();
    const followingCount = this.user.getFollowingCount();

    const elementString = `
    <li>Public Repos : ${publicReposCount}</li>
    <li>Public Gists : ${publicGistsCount}</li>
    <li>Followers : ${followerCount}</li>
    <li>Following : ${followingCount}</li>
    `;

    this.tagElement.innerHTML = elementString;
  }

  setUserInfo() {
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

  setUserLatestRepos() {
    const latestRepos = this.user.getLatestRepos(5);

    const elementString = makeLatestRepoListElement();
    this.latestReposListElement.innerHTML = elementString;

    function makeLatestRepoListElement() {
      let elementString = ``;
      for (let index = 0; index < latestRepos.length; index++) {
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
        event.preventDefault();
        this.displayAlert();

        if (await this.user.fetchUserData(this.inputElement.value)) {
          console.time("label");
          this.displayON();
          console.timeEnd("label");
        } else {
          sweetAlert.showErrorAlert("해당 유저를 찾을 수 없습니다 !");
        }
      }
    });
  }
}
