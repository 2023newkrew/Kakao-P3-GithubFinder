import Swal from "sweetalert2";

import defaultProfileImage from "@/assets/profile_default.png";
import defaultActivityImage from "@/assets/activity_default.png";

export default class UI {
  drawUserInfo(userInfo) {
    const tagKeyList = ["public_repos", "public_gists", "followers", "following"];
    const detailKeyList = ["company", "blog", "location", "created_at"];

    const profileEl = document.getElementById("profile");
    profileEl.classList.remove("hidden");

    profileEl.innerHTML = `
    <div class="profile-view__wrapper">
      ${this.makeImageEl(userInfo.avatar_url, "profile image", defaultProfileImage)}
      <div class="profile-view__button-wrapper">
        <a class="profile-view__button" href="${userInfo.html_url}">View Profile</a>
        <button class="profile-view__button">Follow</button>
      </div>
    </div>
    <div class="profile-info__wrapper">
      <h2 class="profile-info__name">${userInfo.login}</h2>
      <ul class="profile-info__tags tag-buttons">
        ${this.makeTagElList(tagKeyList, userInfo)}
      </ul>
      <ul class="profile-info__details">
        ${this.makeTagElList(detailKeyList, userInfo)}
      </ul>
      ${this.makeImageEl(
        `https://ghchart.rshah.org/${userInfo.login}`,
        "activity chart",
        defaultActivityImage
      )}
    </div>
    `;
  }

  drawUserRepository(userRepos) {
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
