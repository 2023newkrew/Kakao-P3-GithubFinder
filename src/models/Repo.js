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
      <div class="col-12 col-sm-6  mb-4" id="repo-${this.id}">
        <div class="card border-secondary h-100" >
          <div class="card-body">
            <div class="d-flex align-items-center flex-wrap">
              <h5 class="mb-2 mr-2">
                ${this.name}
              </h5>
              <span class="mb-2 badge bg-light">
                ${this.visibility}
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
