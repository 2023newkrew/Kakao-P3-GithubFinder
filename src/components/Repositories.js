import Component from "@/core/Component";
import UserInfoStore from "@/stores/UserInfo";

export default class Repositories extends Component {
  template() {
    return `
      <div>Latest Repos</div>
      <ul class="repositories__repository-list"></ul>
    `;
  }

  onMount() {
    UserInfoStore.subscribe(() => {
      this.targetEl.querySelector(".repositories__repository-list").innerHTML =
        UserInfoStore.state.repositories
          .map(
            ({ url, name, stargazers_count, watchers_count, forks_count }) => `
              <li class="repository">
                <a class="reposirory__name" href="${url}">${name}</a>
                <div class="repository__stats">
                <div class="stats__stars">Stars: ${stargazers_count}</div>
                <div class="stats__watchers">Watchers: ${watchers_count}</div>
                <div class="stats__forks">Forks: ${forks_count}</div>
                </div>
              </li>
            `
          )
          .join("");
    });
  }
}
