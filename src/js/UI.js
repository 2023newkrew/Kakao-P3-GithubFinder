import User from "./user";
import sweetAlert from "../lib/sweetAlert";

import UserInfoView from "./render/userInfoView";
import UserInfoProfile from "./render/userInfoProfile";
import UserLatestRepos from "./render/userLatestRepos";

export default class UI {
  constructor() {
    this.inputElement = document.getElementById("usernameInput");
    this.mainElement = document.body.querySelector("main");

    this.user = new User();

    this.userInfoView = new UserInfoView(this.user);
    this.userInfoProfile = new UserInfoProfile(this.user);
    this.userLatestRepos = new UserLatestRepos(this.user);

    this.listenInputEvent();
  }

  displayAlert() {
    sweetAlert.showTimerAlert("유저의 정보를 가져오는 중입니다.", 1000);
  }

  displayON() {
    this.render();
    this.mainElement.style.opacity = 0.99;
  }

  render() {
    this.userInfoView.renderUserViewImage();
    this.userInfoView.renderUserViewButton();

    this.userInfoProfile.renderUserTag();
    this.userInfoProfile.renderUserInfo();
    this.userInfoProfile.renderUserGitHubChart();

    this.userLatestRepos.renderUserLatestRepos(5);
  }

  listenInputEvent() {
    this.inputElement.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.displayAlert();

        if (await this.user.fetchUserData(this.inputElement.value)) {
          this.displayON();
        } else {
          sweetAlert.showErrorAlert("해당 유저를 찾을 수 없습니다 !");
        }
      }
    });
  }
}
