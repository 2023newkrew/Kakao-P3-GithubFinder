import { INIT_FINISHED_PROGRESS } from '../constant/progress';
import GithubRepository from '../repository/github-repository';
import ProgressBar from '../util/progress-bar';

export default class GithubViewModel {
  #github;

  getGithub() {
    return this.#github;
  }

  async searchGithub(userName) {
    const repository = new GithubRepository(userName);

    ProgressBar.setProgress(INIT_FINISHED_PROGRESS);

    const userInfo = await repository.getUser();

    ProgressBar.finishProgress();

    this.#github = userInfo;
  }
}
