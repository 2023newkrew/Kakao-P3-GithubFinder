import {
  FORBIDDEN_ACCESS,
  GITHUB_UNAUTHORIZED,
  NO_SUCH_USER,
  UNKNOWN_ERROR,
} from '@constant/alert';
import { INIT_FINISHED_PROGRESS } from '@constant/progress';
import { FetchError } from '@error/fetch-error';
import GithubRepository from '@repository/github-repository';
import Alert from '@util/alert';
import ProgressBar from '@util/progress-bar';
import HttpStatus from '../constant/http-status';

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
      if (!(e instanceof FetchError)) {
        Alert.createTimerAlert(UNKNOWN_ERROR);
        return;
      }

      const statusMessage = {
        [HttpStatus.UNAUTHORIZED]: GITHUB_UNAUTHORIZED,
        [HttpStatus.FORBIDDEN]: FORBIDDEN_ACCESS,
        [HttpStatus.NOT_FOUND]: NO_SUCH_USER,
      };

      Alert.createTimerAlert(statusMessage[e.response.status] ?? UNKNOWN_ERROR);
    } finally {
      ProgressBar.finishProgress();
    }
  }
}
