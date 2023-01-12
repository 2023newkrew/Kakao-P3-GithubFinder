import Component from "@core/Component";

export default class Repository extends Component {
  template() {
    const { html_url, name, stargazers_count, watchers_count, forks_count } = this.props.repository;

    return `
      <li class="repository card">
        <div class="card-body row align-items-center">
          <div class="col-6">
            <a class="reposirory__name fs-5 text-decoration-none" href="${html_url}">${name}</a>
          </div>
          <div class="repository__stats col-6">
            <span class="stats__stars badge text-bg-primary fs-6 fw-normal">Stars: ${stargazers_count}</span>
            <span class="stats__watchers badge text-bg-secondary fs-6 fw-normal">Watchers: ${watchers_count}</span>
            <span class="stats__forks badge text-bg-success fs-6 fw-normal">Forks: ${forks_count}</span>
          </div>
        </div>
      </li>
    `;
  }
}
