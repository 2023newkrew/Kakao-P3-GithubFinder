import DataModel from "@/scripts/DataModel";

import Swal from "sweetalert2";

import defaultProfileImage from "@/assets/profile_default.png";
import defaultActivityImage from "@/assets/activity_default.png";

export default class UI {
  constructor() {
    this.dataModel = new DataModel();
  }
  drawUserInfo() {
    const userInfo = this.dataModel.getData("target_user_info");

    const tagKeyList = ["public_repos", "public_gists", "followers", "following"];
    const detailKeyList = ["company", "blog", "location", "created_at"];

    const profileEl = document.getElementById("profile");
    profileEl.classList.remove("hidden");

    profileEl.innerHTML = `
    <div class="profile-view__wrapper">
      ${this.makeImageEl(userInfo.avatar_url, "profile image", defaultProfileImage)}
      <div class="profile-view__button-wrapper">
        <a class="profile-view__button profile-button" href="${userInfo.html_url}">View Profile</a>
        <button id="follow-button" class="profile-view__button">Follow</button>
        <button id="unfollow-button" class="profile-view__button hidden">Unfollow</button>
      </div>
    </div>
    <div class="profile-info__wrapper">
      <h2 class="profile-info__name">${userInfo.username}</h2>
      <ul class="profile-info__tags tag-buttons">
        ${this.makeTagElList(tagKeyList, userInfo)}
      </ul>
      <ul class="profile-info__details">
        ${this.makeTagElList(detailKeyList, userInfo)}
      </ul>
      ${this.makeImageEl(
        `https://ghchart.rshah.org/${userInfo.username}`,
        "activity chart",
        defaultActivityImage
      )}
    </div>
    `;

    this.drawFollowButton();
  }

  drawUserRepository() {
    const userRepos = this.dataModel.getData("target_user_repos");

    const tagKeyList = ["stargazers_count", "watchers", "forks"];
    const repositoryEl = document.getElementById("repository");
    repositoryEl.classList.remove("hidden");

    repositoryEl.innerHTML = `
    <h1>Lastest Repos</h1>
    <div class="repository__wrapper">
      <ul class="repository__repos">
        ${userRepos
          .map((userRepo) => {
            return `
            <li class="repository__repo">
              <a class="repo__name" href=${userRepo.html_url}>${userRepo.name}</a>
              <ul class="repo__tags tag-buttons">
                ${this.makeTagElList(tagKeyList, userRepo)}
              </ul>
            </li>`;
          })
          .join("")}
      </ul>
    </div>
    `;
  }

  drawFollowingUser() {
    const followingEl = document.getElementById("following");
    const followingUsers = JSON.parse(localStorage.getItem("following_users"));

    followingEl.innerHTML = `
    <h1 class="following__title">Following</h1>
    <ul class="following-users">
      ${followingUsers
        .map((username) => {
          return `<li>${username}</li>`;
        })
        .join("")}
    </ul>
    `;
  }

  drawFollowButton() {
    const userName = this.dataModel.getData("target_user_info").username;
    const followButtonEl = document.getElementById("follow-button");
    const unfollowButtonEl = document.getElementById("unfollow-button");
    const followingUsers = JSON.parse(localStorage.getItem("following_users"));

    if (followingUsers.includes(userName)) {
      followButtonEl.classList.add("hidden");
      unfollowButtonEl.classList.remove("hidden");
    } else {
      followButtonEl.classList.remove("hidden");
      unfollowButtonEl.classList.add("hidden");
    }
  }

  alertError(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  makeTagElList(keyList, valueObj) {
    return keyList
      ?.map((key) => {
        return `<li>${key}: ${valueObj[key]}</li>`;
      })
      .join("");
  }

  makeImageEl(src, alt, errorImage) {
    return `
    <img class="image--unload" 
      src="${src}"
      onload="this.classList.remove('image--unload')"
      onerror="this.src='${errorImage}'"
      alt="${alt}" />`;
  }
}
