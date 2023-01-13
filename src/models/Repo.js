export default class Repo {
  constructor({
    id,
    name,
    full_name,
    owner,
    html_url,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
    forks,
    created_at,
    updated_at,
    clone_url,
    language,
    watchers,
    visibility,
  }) {
    this.id = id;
    this.name = name;
    this.fullName = full_name;
    this.owner = owner;
    this.htmlUrl = html_url;
    this.description = description;
    this.stargazersCount = stargazers_count;
    this.watchersCount = watchers_count;
    this.forksCount = forks_count;
    this.forks = forks;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.cloneUrl = clone_url;
    this.language = language;
    this.watchers = watchers;
    this.visibility = visibility;
  }
  render() {
    return `
      <div class="col-12 col-sm-6 mb-4 px-2" id="repo-${this.id}">
        <div class="card border-secondary h-100" >
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center flex-wrap" >
              <a class="text-info d-flex align-items-center flex-wrap mb-2 mr-2" href="${
                this.htmlUrl
              }" target="_blank">
                <h5>
                  ${this.name}
                </h5>
              </a>
              <span class="mb-2 badge bg-light mr-2">
                ${this.visibility}
              </span>
              <span class="mb-2 d-flex align-items-center">
                <img alt="레포지토리 스타 아이콘" src="${
                  this.stargazersCount > 0 ? "star_filled.svg" : "star.svg"
                }" height="16"/>
                ${this.stargazersCount}
              </span>
            </div>
            <p class="card-text">${this.description ?? ""}</p>
            <div>
              <span class="text-secondary mr-2">
                ${this.language ?? ""}
              </span>
              <span class="text-secondary mr-2">
                <img src="fork.svg" alt="포크 아이콘" height="18"/>
                ${this.forks}
              </span>
              <span class="text-secondary">
                <img src="watch.svg" alt="워치 아이콘" height="18"/>
                ${this.watchersCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
