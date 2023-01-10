import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

class ProfileCard extends Component {
  _initElement() {
    return createElement(`<div class="profile-card">
  <img class="profile-image" src="https://t1.daumcdn.net/cfile/tistory/997072485DA7884713" alt="profile image">
  <div class="profile-content">
    <h3 class="profile-name">리처드 파인만</h3>
    <div class="profile-chips">
      <div class="chip primary">Public Repos: 51</div>
      <div class="chip quaternary">Public Gists: 0</div>
      <div class="chip secondary">Followers: 1101</div>
      <div class="chip tertiary">Following: 0</div>
    </div>
    <div class="profile-details">
      <div class="profile-detail">
        <div class="key">Company</div>
        <div class="value">kakao</div>
      </div>
      <div class="profile-detail">
        <div class="key">Website/Blog</div>
        <div class="value">https://www.naver.com</div>
      </div>
      <div class="profile-detail">
        <div class="key">Location</div>
        <div class="value">Korea Bundang-gu</div>
      </div>
      <div class="profile-detail">
        <div class="key">Member Since</div>
        <div class="value">2018-04-26</div>
      </div>
    </div>
  </div>
</div>`);
  }

  _didMounted() {
    console.log('ProfileCard 마운트 됌');
  }

  _didUnmounted() {
    console.log('ProfileCard 언마운트 됌');
  }
}

export default ProfileCard;
