import GithubRepository from '../repository/github-repository';

export default class GithubViewModel {
  #github;

  getGithub() {
    return this.#github;
  }

  async searchGithub(userName) {
    const repository = new GithubRepository();

    const github = await repository.getUserInfo(userName);

    const repos = await repository.getUserRepositories(userName);

    github.setData({ repos });

    this.#github = github;
  }
}
