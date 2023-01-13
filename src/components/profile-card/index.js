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
    this.companyElement = this.element.querySelector('.company');
    this.locationElement = this.element.querySelector('.location');
    this.sinceElement = this.element.querySelector('.since');

    this.render = this.render.bind(this);
  }

  _initElement() {
    return createElement(`<div class="profile-card">
  <img class="profile-image" src="https://t1.daumcdn.net/cfile/tistory/997072485DA7884713" alt="profile image">
  <div class="profile-content">
    <h3 class="profile-name">리처드 파인만</h3>
    <div class="profile-chips">
      <div class="chip primary public-repos">Public Repos: 51</div>
      <div class="chip quaternary public-gists">Public Gists: 0</div>
      <div class="chip secondary follwers">Followers: 1101</div>
      <div class="chip tertiary following">Following: 0</div>
    </div>
    <dl class="profile-details">
      <div class="profile-detail">
        <dt class="key">Company</div>
        <dd class="value company">kakao</div>
      </div>
      <div class="profile-detail">
        <dt class="key">Blog</div>
        <dd class="value blog">https://www.naver.com</div>
      </div>
      <div class="profile-detail">
        <dt class="key">Location</div>
        <dd class="value location">Korea Bundang-gu</div>
      </div>
      <div class="profile-detail">
        <dt class="key">Member Since</div>
        <dd class="value since">2018-04-26</div>
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
