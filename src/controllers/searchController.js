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
        this.search(this.inputEl.value);
      }
    });
    this.submitEl.addEventListener("click", () => {
      this.search(this.inputEl.value);
    });
  }

  async search(searchValue) {
    const renderUser = (user) => {
      const userResult = searchResultContainer.querySelector("#user-result");
      userResult.id = user.id;
      userResult.innerHTML = user.render();
    };

    const renderRepos = (repos) => {
      const repoResult = document.createElement("div");
      repoResult.id = "#repos-result";
      repoResult.className = "bs-component";

      repoResult.innerHTML = `
            <div class="container">
              <div class="row">
                ${repos
                  .slice(0, 5)
                  .map((repo) => repo.render())
                  .join("\n")}
              </div>
            </div>
          `;
      searchResultContainer.appendChild(repoResult);
    };

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      alert("검색어를 입력해주세요");
      return;
    }

    searchResultContainer.innerHTML = `
      <div class="card my-3">
        <h4 class="card-header">검색결과</h4>
        <div id="user-result" class="card-body d-flex align-items-center">
          <p class="text-center container-fluid">
            검색중
          </p>
        </div>
      </div>
    `;

    const userInfo = await this.fetcher.getUser(trimmedValue);
    if (!userInfo) {
      const userResult = searchResultContainer.querySelector("#user-result");
      userResult.innerHTML = `
        <p class="text-center container-fluid">
          검색 결과가 없습니다.
        </p>
      `;
      return;
    }

    const user = new User(userInfo);
    renderUser(user);

    const loadingEl = document.createElement("div");
    loadingEl.className = "card-body d-flex align-items-center";
    loadingEl.innerHTML = `<p class="text-center container-fluid">불러오는 중</p>`;

    searchResultContainer.appendChild(loadingEl);
    user.setRepos(await this.fetcher.getRepos(user));
    searchResultContainer.removeChild(loadingEl);

    renderRepos(user.repos);
  }
}
