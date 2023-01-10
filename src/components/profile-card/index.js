import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

class ProfileCard extends Component {
  _initElement() {
    return createElement(`<div class="profile-card">
  <img class="profile-image" src="https://t1.daumcdn.net/cfile/tistory/997072485DA7884713" alt="profile image">
  <div class="profile-content">
    <div class="profile-chips">
      <div class="chip primary">Public Repos: 51</div>
      <div class="chip quaternary">Public Gists: 0</div>
      <div class="chip secondary">Followers: 1101</div>
      <div class="chip tertiary">Following: 0</div>
    </div>
    <div class="profile-details">여기에 유저 프로필 상세 정보가 노출됩니다.</div>
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
