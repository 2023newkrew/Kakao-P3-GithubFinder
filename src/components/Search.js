import Component from "@core/Component";
import UserInfoStore from "@stores/UserInfo";
import { get } from "@utils/api";

export default class Search extends Component {
  template() {
    return `
      <form class="card-body">
        <div class="fs-2 fw-bold">깃허브 유저 검색</div>
        <div class="fs-4">저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</div>
        <input class="search__input w-100 mt-3 p-1 fs-5" placeholder="username" />
      </form>
    `;
  }

  onMount() {
    this.targetEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = this.targetEl.querySelector(".search__input").value;

      this.fetchUserInfo(username);
    });
  }

  async fetchUserInfo(username) {
    const userProfile = await get(`/users/${username}`);
    const repositories = await get(`/users/${username}/repos`, { sort: "updated", per_page: "5" });

    UserInfoStore.setState({ ...userProfile, repositories });
  }
}
