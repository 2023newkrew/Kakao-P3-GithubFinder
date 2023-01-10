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
    profileEl.classList.remove("hidden");

    profileEl.innerHTML = `
    <div class="profile-view__warapper">
      <img class="profile-view__image" 
           src="${userInfo.avatar_url}" 
           alt="profile image" />
      <button class="profile-view__button">View Profile</button>
    </div>
    <div class="profile-info__warapper">
      <h2 class="profile-info__name">${userInfo.login}</h2>
      <ul class="profile-info__tags tag-buttons">
        ${tagKeyList
          .map((tagKey) => {
            return `<li class="profile-info__tag tag-button">${tagKey}: ${userInfo[tagKey]}</li>`;
          })
          .join("")}
      </ul>
      <ul class="profile-info__details">
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
    const repositoryEl = document.getElementById("repository");
    repositoryEl.classList.remove("hidden");

    repositoryEl.innerHTML = `
    <h1>Lastest Repos</h1>
    <div class="repository__warapper">
      <ul class="repository__repos">
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
    </div>
    `;
  }
}
