import Component from "@core/Component";
import UserInfoStore from "@stores/UserInfoStore";
import Repository from "@components/Repository";

export default class Repositories extends Component {
  template() {
    if (UserInfoStore.state.isLoading) return "";

    return `
      <div class="fs-3 fw-bold">Latest Repos</div>
      <ul class="repositories__repository-list list-unstyled d-flex flex-column gap-2 mt-2">
        <div class="py-2 text-center">No Public Repositories</div>
      </ul>
    `;
  }

  onMount() {
    UserInfoStore.subscribe(() => {
      this.render();
    });

    UserInfoStore.subscribe(() => {
      const { isLoading, repositories } = UserInfoStore.state;

      if (isLoading) return;
      if (!repositories.length) return;

      this.appendChildComponents(
        this.targetEl.querySelector(".repositories__repository-list"),
        Repository,
        repositories.map((repository) => ({ repository }))
      );
    });
  }
}
