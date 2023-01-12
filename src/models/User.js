import Repo from "@models/Repo";

export default class User {
  constructor({
    id,
    avatar_url,
    created_at,
    email,
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
  render() {
    return `
          <div>
            <img
              src="${this.avartar}"
              alt="${this.name} 프로필사진"
              width="90"
              class="mr-3 rounded-circle"
            />
          </div>
          <div>
            <h5 class="card-title">${this.name} </h5>
            <h6 class="card-subtitle text-muted">${this.loginId}</h6>
            <div class="card-body p-0 mt-2">
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
                >Repos ${this.public_repos}개</a
              >
              <span class="badge bg-secondary text-white ml-2">Gists ${this.public_gists}개</span>
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
