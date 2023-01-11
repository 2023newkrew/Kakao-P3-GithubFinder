import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '../../core/context';

class ProfileCard extends Component {
  constructor() {
    super();

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
    <div class="profile-details">
      <div class="profile-detail">
        <div class="key">Company</div>
        <div class="value company">kakao</div>
      </div>
      <div class="profile-detail">
        <div class="key">Blog</div>
        <div class="value blog">https://www.naver.com</div>
      </div>
      <div class="profile-detail">
        <div class="key">Location</div>
        <div class="value location">Korea Bundang-gu</div>
      </div>
      <div class="profile-detail">
        <div class="key">Member Since</div>
        <div class="value since">2018-04-26</div>
      </div>
    </div>
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

  render([{
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
  }]) {
    const getNotFalsyOrElseHyphen = (value) => !!value ? value : '-';

    this.element.querySelector('.profile-image').src = avatarUrl;

    this.element.querySelector('.profile-name').innerHTML = name;

    this.element.querySelector('.public-repos').innerHTML =
        `Public Repos: ${publicRepos}`;

    this.element.querySelector('.public-gists').innerHTML =
        `Public Gists: ${publicGists}`;

    this.element.querySelector('.follwers').innerHTML =
        `Followers: ${followers}`;

    this.element.querySelector('.following').innerHTML =
        `Following: ${following}`;

    this.element.querySelector('.blog').innerHTML =
        getNotFalsyOrElseHyphen(blog);

    this.element.querySelector('.company').innerHTML =
        getNotFalsyOrElseHyphen(company);

    this.element.querySelector('.location').innerHTML =
        getNotFalsyOrElseHyphen(location);

    this.element.querySelector('.since').innerHTML =
        new Date(createdAt).toLocaleString();
  }
}

export default ProfileCard;
