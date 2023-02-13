import Component from "@core/Component";
import UserInfoStore from "@stores/UserInfoStore";
import debounce from "@utils/debounce";
import { isValidUsername } from "@utils/github";

export default class Search extends Component {
  template() {
    return `
      <div class="card-body">
        <div class="fs-2 fw-bold">깃허브 유저 검색</div>
        <div class="fs-4">저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</div>
        <input class="search__input w-100 mt-3 p-1 fs-5 form-control" placeholder="username" />
        <div class="search__error invalid-feedback fs-6"></div>
      </div>
    `;
  }

  onMount() {
    const handleSearch = debounce((username) =>
      UserInfoStore.fetchUserInfo(username, ({ message }) => this.showInvalidMessage(message))
    );

    this.targetEl.addEventListener("input", (event) => {
      const username = event.target.value;
      const inputEl = this.targetEl.querySelector(".search__input");

      if (!username) {
        inputEl.classList.remove("is-invalid");
        return;
      }

      if (!isValidUsername(username)) {
        this.showInvalidMessage("Invalid Username");
        return;
      }

      inputEl.classList.remove("is-invalid");
      handleSearch(username);
    });
  }

  showInvalidMessage(message) {
    const inputEl = this.targetEl.querySelector(".search__input");
    const errorEl = this.targetEl.querySelector(".search__error");

    inputEl.classList.add("is-invalid");
    errorEl.innerText = message;
  }
}
