import { BASE_GITHUB_URL, GITHUB_REPOS_PATH, GITHUB_USER_PATH } from '../constant/url';
import Github from '../model/github';
import Repo from '../model/repo';
import Client from '../util/client';

export default class GithubRepository {
  async getUserInfo(userName) {
    const response = await Client.of(BASE_GITHUB_URL).get(`${GITHUB_USER_PATH}/${userName}`);

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

  async getUserRepositories(userName) {
    const response = await Client.of(BASE_GITHUB_URL).get(
      `${GITHUB_USER_PATH}/${userName}${GITHUB_REPOS_PATH}`,
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

    return repos;
  }
}
