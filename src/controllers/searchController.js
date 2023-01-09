import GithubApiController from "@controllers/githubController";
import User from "@models/User";

const searchResultContainer = document.body.querySelector(".search-result");

export default class SearchController {
  constructor(inputEl, submitEl) {
    this.inputEl = inputEl;
    this.submitEl = submitEl;
    this.fetcher = new GithubApiController();
    this.init();
  }
  init() {
    this.inputEl.addEventListener("keypress", (event) => {
      if (event.keyCode === 13) {
        this.submit(this.inputEl.value);
      }
    });
    this.submitEl.addEventListener("click", () => {
      if (!this.inputEl.value.trim()) {
        return false;
      }
      this.submit(this.inputEl.value);
    });
  }
  async submit(searchValue) {
    const trimmedValue = searchValue.trim();

    searchResultContainer.innerHTML = `
      <div class="card my-3">
        <h4 class="card-header">검색결과</h4>
        <div class="card-body d-flex align-items-center">
          <p class="text-center container-fluid">
            검색중
          </p>
        </div>
      </div>
    `;
    const result = searchResultContainer.querySelector(".card .card-body");

    try {
      const userInfo = await this.fetcher.getUser(trimmedValue);

      const user = new User(userInfo);
      result.id = user.id;
      result.innerHTML = user.render();
    } catch (error) {
      result.appendChild(document.createTextNode("검색 결과가 없습니다."));
    }
  }
}
