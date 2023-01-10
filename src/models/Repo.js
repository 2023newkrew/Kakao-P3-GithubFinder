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
    this.full_name = full_name;
    this.owner = owner;
    this.html_url = html_url;
    this.description = description;
    this.stargazers_count = stargazers_count;
    this.watchers_count = watchers_count;
    this.forks_count = forks_count;
    this.forks = forks;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.clone_url = clone_url;
    this.language = language;
    this.watchers = watchers;
    this.visibility = visibility;
  }
  render() {
    return `
      <div class="col-12 col-sm-6 mb-4 px-2" id="repo-${this.id}">
        <div class="card border-secondary h-100" >
          <div class="card-body">
            <div class="d-flex align-items-center flex-wrap" >
              <a class="text-info d-flex align-items-center flex-wrap mb-2 mr-2" href="${
                this.html_url
              }" target="_blank">
                <h5>
                  ${this.name}
                </h5>
              </a>
              <span class="mb-2 badge bg-light mr-2">
                ${this.visibility}
              </span>
              <span class="mb-2 d-flex align-items-center">
                <img alt="repo_stars" src="${
                  this.stargazers_count > 0 ? "star_filled.svg" : "star.svg"
                }" height="16"/>
                ${this.stargazers_count}
              </span>
            </div>
            <p class="card-text">${this.description ?? ""}</p>
            <div>
              <span class="text-secondary">
                ${this.language ?? ""}
              </span>
              <span class="text-secondary">
                ${this.forks > 0 ? this.forks : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
