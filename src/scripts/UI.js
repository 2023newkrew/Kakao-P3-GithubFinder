import User from "./user";

export default class UI {
  constructor() {
    this.mainElement = document.body.querySelector("main");

    this.user = new User();
    this.listenInputEvent();
  }

  async displayOFF() {
    this.mainElement.style.opacity = 0;
  }

  async displayON() {
    await this.setUserViewImage();
    await this.setUserInfo();
    await this.setUserTag();

    this.mainElement.style.opacity = 0.99;
  }

  async setUserViewImage() {
    const userImageElement = document.body.querySelector(".view img");

    const URL = await this.user.getProfileAvatarURL();
    userImageElement.src = URL;
  }

  async setUserInfo() {
    const infoListElements = document.body.querySelectorAll(".profile .info li");

    const company = await this.user.getCompany();
    infoListElements[0].innerText = "Company : " + company;

    const website = await this.user.getEmail();
    infoListElements[1].innerText = "Website / Blog : " + website;

    const location = await this.user.getLocation();
    infoListElements[2].innerText = "Location : " + location;

    const memberSince = await this.user.getMemberSince();
    infoListElements[3].innerText = "Member Since : " + memberSince;
  }

  async setUserTag() {
    const tagListElements = document.body.querySelectorAll(".profile .tag li");

    const publicReposCount = this.user.getPublicRepoCount();
    tagListElements[0].innerText = "Public Repos : " + publicReposCount;

    const publicGistsCount = this.user.getPublicGistCount();
    tagListElements[1].innerText = "Public Gists : " + publicGistsCount;

    const followerCount = this.user.getFollowerCount();
    tagListElements[2].innerText = "Followers : " + followerCount;

    const followingCount = this.user.getFollowingCount();
    tagListElements[3].innerText = "Following : " + followingCount;
  }

  listenInputEvent() {
    const inputElement = document.getElementById("usernameInput");
    inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        await this.displayOFF();
        await this.user.fetchUserData(inputElement.value);
        await this.displayON();
      }
    });
  }
}
