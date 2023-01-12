import GithubApiController from "@controllers/githubController";
import User from "@models/User";
import {
  NO_SEARCH_RESULT_TEMPLATE,
  SEARCH_LOADING_TEMPLATE,
  getReposTemplate,
  NO_REPOS_TEMPLATE,
} from "@templates/search";
import { SPINNER_TEMPLATE } from "@templates/spinner";
import { NUMBER_OF_REPOS } from "@constants/search";

const searchResultContainer = document.body.querySelector(".search-result");

export default class SearchController {
  constructor(inputEl, submitEl, historyController) {
    this.inputEl = inputEl;
    this.submitEl = submitEl;
    this.fetcher = new GithubApiController();
    this.historyController = historyController;
    this.init();
  }
  init() {
    this.inputEl.addEventListener("keypress", (event) => {
      if (event.code === "Enter") {
        this.search(this.inputEl.value);
      }
    });
    this.submitEl.addEventListener("click", () => {
      this.search(this.inputEl.value);
    });
    console.log(this.historyController.historyContainer);
    this.historyController.historyContainer.addEventListener(
      "click",
      (event) => {
        if (
          event.target &&
          event.target.closest(".list-group-item") &&
          !event.target.classList.contains("button__delete")
        ) {
          const [searchValue] = event.target.textContent.trim().split("\n");
          this.search(searchValue);
        }
      }
    );
  }

  async search(searchValue) {
    const renderUser = (user) => {
      const userResult = searchResultContainer.querySelector("#user-result");
      userResult.id = user.id;
      userResult.innerHTML = user.render();
    };
    const renderNoUserInfo = () => {
      const userResult = searchResultContainer.querySelector("#user-result");
      userResult.innerHTML = NO_SEARCH_RESULT_TEMPLATE;
    };
    const getRepoResultContainerEl = () => {
      const repoResult = document.createElement("div");
      repoResult.id = "repo-result";
      repoResult.className = "bs-component";
      return repoResult;
    };
    const renderRepos = (repos, numberOfRepos) => {
      const repoResult = getRepoResultContainerEl();
      repoResult.innerHTML = getReposTemplate(repos, numberOfRepos);

      searchResultContainer.appendChild(repoResult);
    };
    const renderNoRepos = () => {
      const repoResult = getRepoResultContainerEl();
      repoResult.innerHTML = NO_REPOS_TEMPLATE;

      searchResultContainer.appendChild(repoResult);
    };
    const getLoadingElement = () => {
      const element = document.createElement("div");
      element.className = "card-body d-flex align-items-center";
      element.innerHTML = SPINNER_TEMPLATE;
      return element;
    };

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      alert("검색어를 입력해주세요");
      return;
    }
    this.historyController.addHistory(trimmedValue);
    searchResultContainer.innerHTML = SEARCH_LOADING_TEMPLATE;

    const userInfo = await this.fetcher.getUser(trimmedValue);
    if (!userInfo) {
      renderNoUserInfo();
      return;
    }

    const user = new User(userInfo);
    renderUser(user);

    const loadingEl = getLoadingElement();

    searchResultContainer.appendChild(loadingEl);
    const repos = await this.fetcher.getRepos(user);
    searchResultContainer.removeChild(loadingEl);

    if (repos.length === 0) {
      renderNoRepos();
      return;
    }

    user.setRepos(repos);
    renderRepos(user.repos, NUMBER_OF_REPOS);
  }
}
