export default class UserInfoProfile {
  constructor(user) {
    this.tagElement = document.getElementById("profile-tag");
    this.infoElement = document.getElementById("profile-info");
    this.user = user;
  }
  renderUserTag() {
    const publicReposCount = this.user.getPublicRepoCount();
    const publicGistsCount = this.user.getPublicGistCount();
    const followerCount = this.user.getFollowerCount();
    const followingCount = this.user.getFollowingCount();

    const elementString = `
    <li>Public Repos : ${publicReposCount}</li>
    <li>Public Gists : ${publicGistsCount}</li>
    <li>Followers : ${followerCount}</li>
    <li>Following : ${followingCount}</li>
    `;

    this.tagElement.innerHTML = elementString;
  }

  renderUserInfo() {
    const company = this.user.getCompany();
    const website = this.user.getEmail();
    const location = this.user.getLocation();
    const memberSince = this.user.getMemberSince();

    const elementString = `
    <li>Company : ${company}</li>
    <li>Website / Blog : ${website}</li>
    <li>Location : ${location}</li>
    <li>Member Since : ${memberSince}</li>
    `;

    this.infoElement.innerHTML = elementString;
  }
}
