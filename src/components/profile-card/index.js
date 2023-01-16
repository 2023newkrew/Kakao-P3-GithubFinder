import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '@/core/context';

class ProfileCard extends Component {
  constructor() {
    super();

    this.profileImageElement = this.element.querySelector('.profile-image');
    this.profileNameElement = this.element.querySelector('.profile-name');
    this.publicReposElement = this.element.querySelector('.public-repos');
    this.publicGistsElement = this.element.querySelector('.public-gists');
    this.follwersElement = this.element.querySelector('.follwers');
    this.followingElement = this.element.querySelector('.following');
    this.blogElement = this.element.querySelector('.blog');
    console.log(this.blogElement);
    this.companyElement = this.element.querySelector('.company');
    console.log(this.companyElement);
    this.locationElement = this.element.querySelector('.location');
    console.log(this.locationElement);
    this.sinceElement = this.element.querySelector('.since');
    console.log(this.sinceElement);

    this.render = this.render.bind(this);
  }

  _initElement() {
    return createElement(`<div class="profile-card">
  <img class="profile-image" src="https://t1.daumcdn.net/cfile/tistory/997072485DA7884713" alt="profile image">
  <div class="profile-content">
    <h3 class="profile-name">리처드 파인만</h3>
    <div class="profile-chips">
      <div class="chip chip--primary public-repos">Public Repos: 51</div>
      <div class="chip chip--quaternary public-gists">Public Gists: 0</div>
      <div class="chip chip--secondary follwers">Followers: 1101</div>
      <div class="chip chip--tertiary following">Following: 0</div>
    </div>
    <dl class="profile-details">
      <div class="profile-detail">
        <dt class="profile-detail__key">Company</dt>
        <dd class="profile-detail__value company">kakao</dd>
      </div>
      <div class="profile-detail">
        <dt class="profile-detail__key">Blog</dt>
        <dd class="profile-detail__value blog">https://www.naver.com</dd>
      </div>
      <div class="profile-detail">
        <dt class="profile-detail__key">Location</dt>
        <dd class="profile-detail__value location">Korea Bundang-gu</dd>
      </div>
      <div class="profile-detail">
        <dt class="profile-detail__key">Member Since</dt>
        <dd class="profile-detail__value since">2018-04-26</dd>
      </div>
    </dl>
  </div>
</div>`);
  }

  _didMounted() {
    this.userInfoStore = useContext(this.element, 'user-info-store');
    this.userInfoStore.subscribe(this.render);
  }

  _didUnmounted() {
    this.userInfoStore.unsubscribe(this.render);
  }

  render({user: {
    company,
    blog,
    login: name,
    location,
    followers,
    following,
    avatar_url: avatarUrl,
    created_at: createdAt,
    public_repos: publicRepos,
    public_gists: publicGists,
  }}) {
    const transformFalsyContent = (content) => content || '-';

    this.profileImageElement.src = avatarUrl;
    this.profileNameElement.innerHTML = name;
    this.publicReposElement.innerHTML = `Public Repos: ${publicRepos}`;
    this.publicGistsElement.innerHTML = `Public Gists: ${publicGists}`;
    this.follwersElement.innerHTML = `Followers: ${followers}`;
    this.followingElement.innerHTML = `Following: ${following}`;
    this.blogElement.innerHTML = transformFalsyContent(blog);
    this.companyElement.innerHTML = transformFalsyContent(company);
    this.locationElement.innerHTML = transformFalsyContent(location);
    this.sinceElement.innerHTML = new Date(createdAt).toLocaleString();
  }
}

export default ProfileCard;
