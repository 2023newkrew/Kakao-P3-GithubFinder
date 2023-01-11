import GithubRepository from '../repository/github-repository';

export default class GithubViewModel {
  #github;

  getGithub() {
    return this.#github;
  }

  async searchGithub(userName) {
    const repository = new GithubRepository(userName);

    const userInfo = await repository.getUser();

    this.#github = userInfo;
  }
}
