import Component from "@/core/Component";
import UserInfoStore from "@/stores/UserInfo";
import NoAvatar from "@/assets/no-avatar.svg";

export default class UserProfile extends Component {
  template() {
    return `
      <div class="card-body row">
        <div class="col-3">
          <img class="user-profile__avatar d-block w-100" src="${NoAvatar}" alt="avatar" />
          <a class="user-profile__view-profile btn btn-primary w-100 mt-2 disabled" href="">View Profile</a>
        </div>
        <div class="col-9">
          <div class="user-profile__stats">
            <span class="stats__public-repos badge text-bg-primary fs-6 fw-normal">
              Public Repos: <span class="public-repos__value"></span>
            </span>
            <span class="stats__public-gists badge text-bg-secondary fs-6 fw-normal">
              Public Gists: <span class="public-gists__value"></span>
            </span>
            <span class="stats__followers badge text-bg-success fs-6 fw-normal">
              Followers: <span class="followers__value"></span>
            </span>
            <span class="stats__following badge text-bg-info fs-6 fw-normal">
              Following: <span class="following__value"></span>
            </span>
          </div>
          <ul class="user-profile__profile list-group mt-4">
            <li class="profile__company list-group-item">
              Company: <span class="company__value"></span>
            </li>
            <li class="profile__website-blog list-group-item">
              Website/Blog: <span class="website-blog__value"></span>
            </li>
            <li class="profile__location list-group-item">
              Location: <span class="location__value"></span>
            </li>
            <li class="profile__member-since list-group-item">
              Member Since: <span class="member-since__value"></span>
            </li>
          </ul>
        </div>
      </div>
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

      const avatarEl = this.targetEl.querySelector(".user-profile__avatar");
      avatarEl.src = avatar_url;

      const viewProfileEl = this.targetEl.querySelector(".user-profile__view-profile");
      viewProfileEl.classList.remove("disabled");
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
      memberSinceValueEl.innerText = new Date(created_at).toDateString();
    });
  }
}
