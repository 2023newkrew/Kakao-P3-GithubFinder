import Component from '@/core/component';
import {createElement} from '@/utils';

class ProfileCard extends Component {
  __initElement() {
    return createElement('<div class="profile-card">프로필 카드</div>');
  }

  __didMounted() {
    console.log('ProfileCard 마운트 됌');
  }

  __willUnmount() {
    console.log('ProfileCard 언마운트 되려 함');
  }
}

export default ProfileCard;
