import GithubView from '../view/github-view';
import GithubViewModel from '../viewmodel/github-view-model';

export default class GithubBinder {
  bindEvents() {
    const githubViewModel = new GithubViewModel();
    const githubView = new GithubView(githubViewModel);

    const searchButton = document.querySelector('.header__search-btn');
    const searchInput = document.querySelector('.header__search-input');

    searchButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const userName = searchInput.value;

      if (userName === '' || userName === null) return;

      await githubViewModel.searchGithub(userName);
      githubView.render();

      searchInput.value = '';
    });
  }
}
