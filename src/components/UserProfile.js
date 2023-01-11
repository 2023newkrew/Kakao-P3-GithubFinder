import Component from "@core/Component";
import UserInfoStore from "@stores/UserInfoStore";

export default class UserProfile extends Component {
  template() {
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
    } = UserInfoStore.state.userProfile;

    return `
      <div class="card-body row">
        <div class="card-img-overlay d-flex justify-content-center align-items-center bg-dark bg-opacity-10 z-1 d-none">
          <div class="spinner-border"></div>
        </div>
        <div class="col-3">
          <img class="user-profile__avatar d-block w-100" src="${avatar_url}" alt="avatar" />
          <a class="user-profile__view-profile btn btn-primary w-100 mt-2 ${
            html_url ? "" : "disabled"
          }" href="${html_url}">
            View Profile
          </a>
        </div>
        <div class="col-9">
          <div class="user-profile__stats">
            <span class="stats__public-repos badge text-bg-primary fs-6 fw-normal">
              Public Repos: ${public_repos}
            </span>
            <span class="stats__public-gists badge text-bg-secondary fs-6 fw-normal">
              Public Gists: ${public_gists}
            </span>
            <span class="stats__followers badge text-bg-success fs-6 fw-normal">
              Followers: ${followers}
            </span>
            <span class="stats__following badge text-bg-info fs-6 fw-normal">
              Following: ${following}
            </span>
          </div>
          <ul class="user-profile__profile list-group mt-4">
            <li class="profile__company list-group-item">
              Company: ${company || "-"}
            </li>
            <li class="profile__website-blog list-group-item">
              Website/Blog: ${blog || "-"}
            </li>
            <li class="profile__location list-group-item">
              Location: ${location || "-"}
            </li>
            <li class="profile__member-since list-group-item">
              Member Since: ${created_at}
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  onMount() {
    UserInfoStore.subscribe(() => {
      if (UserInfoStore.state.isLoading) return;

      this.render();
    });

    UserInfoStore.subscribe(() => {
      if (!UserInfoStore.state.isLoading) return;

      const overlayEl = this.targetEl.querySelector(".card-img-overlay");

      overlayEl.classList.remove("d-none");
    });
  }
}
