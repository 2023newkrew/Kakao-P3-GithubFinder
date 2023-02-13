import {
  FETCH_PROFILE_FINISHED_PROGRESS,
  FETCH_REPOS_FINISHED_PROGRESS,
  LOAD_HEATMAP_FINISHED_PROGRESS,
} from '@constant/progress';
import {
  BASE_GITHUB_URL,
  GITHUB_REPOS_PATH,
  GITHUB_USER_PATH,
  BASE_HEATMAP_URL,
} from '@constant/url';
import Github from '@model/github';
import Repo from '@model/repo';
import Client from '@util/client';
import ProgressBar from '@/js/ui/progress-bar';
import { githubApiHeaders } from '@config/github';

export default class GithubRepository {
  #userName;

  constructor(userName) {
    this.#userName = userName;
  }

  async getUser() {
    const [profileInfo, userRepositories, heatmapEl] = await Promise.all([
      this.#getProfileInfo(),
      this.#getUserRepositories(),
      this.#getHeatmapElement(),
    ]);

    profileInfo.setData({ repos: userRepositories, heatmapEl });

    return profileInfo;
  }

  async #getHeatmapElement() {
    const heatmapEl = await new Promise((resolve, reject) => {
      const heatmap = new Image();

      heatmap.src = `${BASE_HEATMAP_URL}/${this.#userName}`;

      heatmap.onload = () => resolve(heatmap);

      heatmap.onerror = reject;
    }).catch(() => {
      const noHeatmapEl = document.createElement('div');
      noHeatmapEl.classList.add('d-flex', 'justify-content-center');
      noHeatmapEl.innerHTML = `<h6 class="my-5">Contribution chart is not available</h6>`;

      return noHeatmapEl;
    });

    ProgressBar.setProgress((prev) => prev + LOAD_HEATMAP_FINISHED_PROGRESS);

    return heatmapEl;
  }

  async #getProfileInfo() {
    const response = await Client.of(BASE_GITHUB_URL).get(`${GITHUB_USER_PATH}/${this.#userName}`, {
      headers: githubApiHeaders,
    });

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
      {
        headers: githubApiHeaders,
      },
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
