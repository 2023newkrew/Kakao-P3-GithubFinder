import Component from '@/core/component';
import {createElement} from '@/utils';

class ProfileCard extends Component {
  _initElement() {
    return createElement('<div class="profile-card">프로필 카드</div>');
  }

  _didMounted() {
    console.log('ProfileCard 마운트 됌');
  }

  _didUnmounted() {
    console.log('ProfileCard 언마운트 됌');
  }
}

export default ProfileCard;
