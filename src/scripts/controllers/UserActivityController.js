import UI from "@/scripts/UI";
import DataModel from "@/scripts/DataModel.js";

export default class UserActivityController {
  constructor() {
    this.ui = new UI();
    this.dataModel = new DataModel();
    this.bindEvents();
    this.ui.drawFollowingUser();
  }

  bindEvents() {
    document.getElementById("profile").addEventListener("click", (e) => {
      this.handleOnClick(e);
    });
  }

  handleOnClick({ target }) {
    this.togglefollowing(target.id);
  }

  togglefollowing(type) {
    const userName = this.dataModel.getData("target_user_info").username;
    const followingUsersArray = JSON.parse(localStorage.getItem("following_users")) ?? [];
    const followingUsersSet = new Set(followingUsersArray);

    if (type === "follow-button") followingUsersSet.add(userName);
    else followingUsersSet.delete(userName);

    localStorage.setItem("following_users", JSON.stringify([...followingUsersSet]));

    this.ui.drawFollowingUser();
    this.ui.drawFollowButton();
  }
}
