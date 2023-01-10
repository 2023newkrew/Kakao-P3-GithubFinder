import Component from "@core/Component";
import UserInfoStore from "@stores/UserInfo";

export default class Repositories extends Component {
  template() {
    return `
      <div class="fs-3 fw-bold">Latest Repos</div>
      <ul class="repositories__repository-list list-unstyled d-flex flex-column gap-2 mt-2"></ul>
    `;
  }

  onMount() {
    UserInfoStore.subscribe(() => {
      this.targetEl.querySelector(".repositories__repository-list").innerHTML =
        UserInfoStore.state.repositories
          .map(
            ({ html_url, name, stargazers_count, watchers_count, forks_count }) => `
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
            `
          )
          .join("");
    });
  }
}
