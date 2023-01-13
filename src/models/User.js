import Repo from "@models/Repo";
import { getDateDiff } from "@utils/dateUtils";
export default class User {
  constructor({
    id,
    avatar_url,
    created_at,
    email,
    bio,
    followers,
    following,
    login,
    name,
    public_repos,
    public_gists,
    html_url,
    organizations_url,
    repos_url,
    starred_url,
    subscriptions_url,
    updated_at,
  }) {
    this.id = id;
    this.avartar = avatar_url;
    this.name = name;
    this.bio = bio;
    this.followers = followers;
    this.following = following;
    this.loginId = login;
    this.email = email;
    this.public_repos = public_repos;
    this.public_gists = public_gists;
    this.created_at = created_at;
    this.html_url = html_url;
    this.organizations_url = organizations_url;
    this.starred_url = starred_url;
    this.subscriptions_url = subscriptions_url;
    this.repos_url = repos_url;
    this.updated_at = updated_at;
    this.repos = [];
  }
  _getCreatedDateInfo() {
    const today = new Date();
    const createdDate = new Date(this.created_at);
    const monthDiff = getDateDiff(today, createdDate, "month");

    if (monthDiff === 0) {
      const dayDiff = getDateDiff(today, createdDate, "day");
      return `${dayDiff}일 전`;
    }

    const year = Math.floor(monthDiff / 12);
    const month = monthDiff % 12;
    if (year === 0) {
      return `${month}개월 전`;
    }
    if (month === 0) {
      return `${year}년 전`;
    }

    return `${year}년 ${month}개월 전`;
  }
  render() {
    return `
    <div class="w-100 flex-lg-row flex-column d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center">
        <img
          src="${this.avartar}"
          alt="${this.name} 프로필사진"
          width="200"
          class="mr-xl-3 mb-3 mb-xl-0 rounded-circle"
        />
      </div>
      <div class="w-100 d-flex flex-column align-items-lg-start align-items-center">
        <div class="px-4 text-lg-left text-center">
          <a class="text-primary" href="${this.html_url}" target="_blank">
            <h5 class="card-title">${this.loginId} </h5>
          </a>
          <div class="d-flex align-items-end">
            <h6 class="card-subtitle m-0">${this.name ?? ""}</h6>
            <span class="card-text text-muted ml-2 font-size-xs">${this._getCreatedDateInfo()}</span>
          </div>
          <p class="m-0 mt-2">${this.bio ?? ""}</p>
        </div>
        <div class="card-body py-1 ml-1 mb-2">
          <a
            href="https://github.com/dmstmdrbs?tab=followers"
            target="_blank"
            class="card-link badge bg-success text-white"
            >Followers ${this.followers}명</a
          >
          <a
            href="https://github.com/dmstmdrbs?tab=following"
            target="_blank"
            class="card-link badge bg-success text-white ml-2"
            >Following ${this.following}명</a
          >
          <a
            href="https://github.com/dmstmdrbs?tab=repositories"
            target="_blank"
            class="card-link badge bg-info text-white ml-2"
            >Repos ${this.public_repos}개
          </a>
          <span class="badge bg-secondary text-white ml-2">
            Gists ${this.public_gists}개
          </span>
        </div>
        <div class="w-100">
          <img
            class="w-100"
            style="max-width: 663px;"
            src="https://ghchart.rshah.org/${this.loginId}"
            alt="깃허브 잔디"
          />
        </div>
      </div>
    </div>

  `;
  }
  setRepos(repos) {
    this.repos = repos
      .map((repo) => new Repo(repo))
      .sort(
        (repo1, repo2) =>
          new Date(repo2.updated_at) - new Date(repo1.updated_at)
      );
  }
}
