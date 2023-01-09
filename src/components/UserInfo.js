import Component from "@/core/Component";
import UserInfoStore from "@/stores/UserInfo";

export default class UserInfo extends Component {
  template() {
    return `
      <img class="user-info__avatar" src="" alt="avatar" />
      <a class="user-info__view-profile" href="">View Profile</a>
      <div class="user-info__stats">
        <div class="stats__public-repos">Public Repos: <span class="public-repos__value"></span></div>
        <div class="stats__public-gists">Public Gists: <span class="public-gists__value"></span></div>
        <div class="stats__followers">Followers: <span class="followers__value"></span></div>
        <div class="stats__following">Following: <span class="following__value"></span></div>
      </div>
      <ul class="user-info__profile">
        <li class="profile__company">Company: <span class="company__value"></span></li>
        <li class="profile__website-blog">Website/Blog: <span class="website-blog__value"></span></li>
        <li class="profile__location">Location: <span class="location__value"></span></li>
        <li class="profile__member-since">Member Since: <span class="member-since__value"></span></li>
      </ul>
    `;
  }

  onMount() {
    UserInfoStore.subscribe(() => {
      const {
        avatar_url,
        html_url,
        public_repos,
        public_gists,
        followers,
        following,
        company,
        blog,
        location,
        created_at,
      } = UserInfoStore.state;

      const avatarEl = this.targetEl.querySelector(".user-info__avatar");
      avatarEl.src = avatar_url;

      const viewProfileEl = this.targetEl.querySelector(".user-info__view-profile");
      viewProfileEl.href = html_url;

      const publicReposValueEl = this.targetEl.querySelector(".public-repos__value");
      publicReposValueEl.innerText = public_repos;

      const publicGistsValueEl = this.targetEl.querySelector(".public-gists__value");
      publicGistsValueEl.innerText = public_gists;

      const followersValueEl = this.targetEl.querySelector(".followers__value");
      followersValueEl.innerText = followers;

      const followingValueEl = this.targetEl.querySelector(".following__value");
      followingValueEl.innerText = following;

      const companyValueEl = this.targetEl.querySelector(".company__value");
      companyValueEl.innerText = company;

      const websiteBlogValueEl = this.targetEl.querySelector(".website-blog__value");
      websiteBlogValueEl.innerText = blog;

      const locationValueEl = this.targetEl.querySelector(".location__value");
      locationValueEl.innerText = location;

      const memberSinceValueEl = this.targetEl.querySelector(".member-since__value");
      memberSinceValueEl.innerText = created_at;
    });
  }
}
