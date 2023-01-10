import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import ProfileCard from '@/components/profile-card';
import RepositoryList from '@/components/repository-list';

class UserInfoBox extends Component {
  constructor() {
    super();

    this.profileCard = new ProfileCard();
    this.element.appendChild(this.profileCard.element);

    this.repositoryList = new RepositoryList();
    this.element.appendChild(this.repositoryList.element);
  }

  _initElement() {
    return createElement(`<div class="user-info-box">
</div>`);
  }

  _didMounted() {
    console.log('UserInfoBox 마운트 됌');
  }

  _didUnmounted() {
    console.log('UserInfoBox 언마운트 됌');
  }
}

export default UserInfoBox;
