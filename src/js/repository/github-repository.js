import {
  FETCH_PROFILE_FINISHED_PROGRESS,
  FETCH_REPOS_FINISHED_PROGRESS,
} from '../constant/progress';
import { BASE_GITHUB_URL, GITHUB_REPOS_PATH, GITHUB_USER_PATH } from '../constant/url';
import Github from '../model/github';
import Repo from '../model/repo';
import Client from '../util/client';
import ProgressBar from '../util/progress-bar';

export default class GithubRepository {
  #userName;

  constructor(userName) {
    this.#userName = userName;
  }

  async getUser() {
    const [profileInfo, userRepositories] = await Promise.all([
      this.#getProfileInfo(),
      this.#getUserRepositories(),
    ]);

    profileInfo.setData({ repos: userRepositories });

    return profileInfo;
  }

  async #getProfileInfo() {
    const response = await Client.of(BASE_GITHUB_URL).get(`${GITHUB_USER_PATH}/${this.#userName}`);

    const {
      name,
      avatar_url: profileImage,
      public_repos: repoCount,
      public_gists: gistCount,
      followers: followerCount,
      following: followingCount,
      company,
      blog: website,
      location,
      created_at: memberSince,
      html_url: profileLink,
    } = response;

    ProgressBar.setProgress((prev) => prev + FETCH_PROFILE_FINISHED_PROGRESS);

    return new Github({
      name,
      profileImage,
      repoCount,
      gistCount,
      followerCount,
      followingCount,
      company,
      website,
      location,
      memberSince,
      profileLink,
    });
  }

  async #getUserRepositories() {
    const response = await Client.of(BASE_GITHUB_URL).get(
      `${GITHUB_USER_PATH}/${this.#userName}${GITHUB_REPOS_PATH}`,
    );

    const repos = response.map((repo) => {
      const {
        full_name: title,
        html_url: link,
        stargazers_count: starCount,
        watchers_count: watcherCount,
        forks: forkCount,
      } = repo;

      return new Repo({ title, link, starCount, watcherCount, forkCount });
    });

    ProgressBar.setProgress((prev) => prev + FETCH_REPOS_FINISHED_PROGRESS);

    return repos;
  }
}
