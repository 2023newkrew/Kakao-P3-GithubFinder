import { NO_SUCH_USER, UNKNOWN_ERROR } from '../constant/alert';
import { INIT_FINISHED_PROGRESS } from '../constant/progress';
import { FetchError } from '../error/fetch-error';
import GithubRepository from '../repository/github-repository';
import Alert from '../util/alert';
import ProgressBar from '../util/progress-bar';

export default class GithubViewModel {
  #github;

  getGithub() {
    return this.#github;
  }

  async searchGithub(userName) {
    const githubRepository = new GithubRepository(userName);

    ProgressBar.setProgress(INIT_FINISHED_PROGRESS);

    try {
      this.#github = await githubRepository.getUser();
    } catch (e) {
      if (e instanceof FetchError && e.response.status === 404) {
        Alert.createTimerAlert(NO_SUCH_USER);
        return;
      }

      Alert.createTimerAlert(UNKNOWN_ERROR);
    }

    ProgressBar.finishProgress();
  }
}
