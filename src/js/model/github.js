import Model from '@abstract/model';

export default class Github extends Model {
  #name;

  #profileImage;

  #repoCount;

  #gistCount;

  #followerCount;

  #followingCount;

  #company;

  #website;

  #location;

  #memberSince;

  #profileLink;

  #repos;

  #heatmapEl;

  constructor({
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
    heatmapEl,
  }) {
    super();
    this.#name = name;
    this.#profileImage = profileImage;
    this.#repoCount = repoCount;
    this.#gistCount = gistCount;
    this.#followerCount = followerCount;
    this.#followingCount = followingCount;
    this.#company = company;
    this.#website = website;
    this.#location = location;
    this.#memberSince = memberSince;
    this.#profileLink = profileLink;
    this.#repos = [];
    this.#heatmapEl = heatmapEl;
  }

  setData({
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
    repos,
    heatmapEl,
  }) {
    if (name) this.#name = name;

    if (profileImage) this.#profileImage = profileImage;

    if (repoCount) this.#repoCount = repoCount;

    if (gistCount) this.#gistCount = gistCount;

    if (followerCount) this.#followerCount = followerCount;

    if (followingCount) this.#followingCount = followingCount;

    if (company) this.#company = company;

    if (website) this.#website = website;

    if (location) this.#location = location;

    if (memberSince) this.#memberSince = memberSince;

    if (profileLink) this.#profileLink = profileLink;

    if (repos) this.#repos = repos;

    if (heatmapEl) this.#heatmapEl = heatmapEl;
  }

  getData() {
    return {
      name: this.#name,
      profileImage: this.#profileImage,
      repoCount: this.#repoCount,
      gistCount: this.#gistCount,
      followerCount: this.#followerCount,
      followingCount: this.#followingCount,
      company: this.#company,
      website: this.#website,
      location: this.#location,
      memberSince: this.#memberSince,
      profileLink: this.#profileLink,
      repos: this.#repos,
      heatmapEl: this.#heatmapEl,
    };
  }
}
