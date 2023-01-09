import Component from "@/core/Component";
import UserInfoStore from "@/stores/UserInfo";

export default class Search extends Component {
  template() {
    return `
      <div>깃허브 유저 검색</div>
      <div>저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</div>
      <input class="search__input" />
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
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `token ${process.env.TOKEN}` },
    });
    const userInfo = await response.json();

    UserInfoStore.setState(userInfo);
  }
}
