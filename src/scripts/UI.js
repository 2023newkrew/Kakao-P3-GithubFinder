export default class UI {
  drawUserInfo(userInfo) {
    const tagKeyList = [
      "public_repos",
      "public_gists",
      "followers",
      "following",
    ];
    const detailKeyList = ["company", "blog", "location", "created_at"];

    const profileEl = document.getElementById("profile");
    profileEl.innerHTML = `
    <div id="profile-view__warapper">
      <img id="profile-view__image" 
           src="${userInfo.avatar_url}" 
           alt="profile image" />
      <button id="profile-view__button">View Profile</button>
    </div>
    <div id="profile-info__warapper">
      <ul id="profile-info__tags" class="tag-buttons">
        ${tagKeyList
          .map((tagKey) => {
            return `<li class="profile-info__tag tag-button">${tagKey}: ${userInfo[tagKey]}</li>`;
          })
          .join("")}
      </ul>
      <ul id="profile-info__details">
      ${detailKeyList
        .map((detailKey) => {
          return `<li class="profile-info__detail">${detailKey}: ${userInfo[detailKey]}</li>`;
        })
        .join("")}
      </ul>
    </div>`;
  }

  drawUserRepository(userRepos) {
    const tagKeyList = ["stargazers_count", "watchers", "forks"];
    const repositoryEl = document.getElementById("repository__warapper");

    repositoryEl.innerHTML = `
    <ul id="repository__repos">
      ${userRepos
        .map((userRepo) => {
          return `
          <li class="repository__repo">
            <div class="repo__name">${userRepo.name}</div>
            <ul class="repo__tags tag-buttons">
              ${tagKeyList
                .map((tagKey) => {
                  return `<li class="repo__tag tag-button">${tagKey}: ${userRepo[tagKey]}</li>`;
                })
                .join("")}
            </ul>
          </li>`;
        })
        .join("")}
    </ul>
    `;
  }
}
