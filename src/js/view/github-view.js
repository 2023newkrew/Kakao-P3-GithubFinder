import View from '@abstract/view';
import Github from '@model/github';
import typeCheck from '@util/type-check';
import GithubViewModel from '@viewmodel/github-view-model';

export default class GithubView extends View {
  #githubViewModel;

  constructor(githubViewModel, _ = typeCheck(githubViewModel, GithubViewModel)) {
    super();
    this.#githubViewModel = githubViewModel;
  }

  render() {
    const github = this.#githubViewModel.getGithub();

    if (github === undefined) return;

    this.#renderUserInfo(github);
    this.#renderRepositories(github);
  }

  #renderUserInfo(github, _ = typeCheck(github, Github)) {
    const {
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
    } = github.getData();

    const userNameEl = document.querySelector('.user__nickname');
    const userProfileImgEl = document.querySelector('.user__profile-img');
    const userRepoBadgeEl = document.querySelector('.user__repo-badge');
    const userGistBadgeEl = document.querySelector('.user__gist-badge');
    const userFollowerBadgeEl = document.querySelector('.user__follower-badge');
    const userFollowingBadgeEl = document.querySelector('.user__following-badge');
    const userCompanyEl = document.querySelector('.user__company');
    const userWebsiteEl = document.querySelector('.user__website');
    const userLocationEl = document.querySelector('.user__location');
    const userMemberSinceEl = document.querySelector('.user__member-since');
    const userProfileBtnEl = document.querySelector('.user__profile-button');

    userNameEl.textContent = name;
    userProfileImgEl.src = profileImage;
    userRepoBadgeEl.textContent = repoCount;
    userGistBadgeEl.textContent = gistCount;
    userFollowerBadgeEl.textContent = followerCount;
    userFollowingBadgeEl.textContent = followingCount;
    userCompanyEl.textContent = company;
    userWebsiteEl.textContent = website;
    userLocationEl.textContent = location;
    userMemberSinceEl.textContent = memberSince;
    userProfileBtnEl.href = profileLink;
  }

  #renderRepositories(github, _ = typeCheck(github, Github)) {
    const { repos } = github.getData();

    const repoListEl = document.querySelector('.repo__list');

    repoListEl.innerHTML = '';

    const repoElArray = repos.map((repo) => {
      const { title, link, starCount, watcherCount, forkCount } = repo.getData();

      const repoEl = document.createElement('a');

      repoEl.classList.add(
        'list-group-item',
        'list-group-item-action',
        'd-flex',
        'justify-content-between',
        'align-items-center',
      );

      repoEl.href = link;

      repoEl.innerHTML = `
      ${title}
      <div class="d-flex align-items-center gap-2">
        <span class="badge bg-primary py-2 px-3">Stars: ${starCount}</span>
        <span class="badge bg-primary py-2 px-3">Watchers: ${watcherCount}</span>
        <span class="badge bg-primary py-2 px-3">Forks: ${forkCount}</span>
      </div> 
      `;

      return repoEl;
    });

    repoListEl.append(...repoElArray);
  }
}
