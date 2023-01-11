export default class UserInfoView {
  constructor(user) {
    this.userImageElement = document.getElementById("userInfo-image");
    this.viewButtonElement = document.getElementById("view-button");
    this.user = user;
  }

  renderUserViewImage() {
    this.userImageElement.src = "";
    const URL = this.user.getProfileAvatarURL();
    this.userImageElement.src = URL;
  }

  renderUserViewButton() {
    const username = this.user.getUserName();

    this.viewButtonElement.onclick = () => {
      window.open(`https://github.com/${username}`, "_blank");
    };
  }
}
