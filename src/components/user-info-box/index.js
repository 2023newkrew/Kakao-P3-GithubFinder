import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import ProfileCard from '@/components/profile-card';
import RepositoryList from '@/components/repository-list';

class UserInfoBox extends Component {
  constructor() {
    super();

    this.profileCard = new ProfileCard();
    this.element.prepend(this.profileCard.element);

    this.repositoryList = new RepositoryList();
    this.repositoryListWrapperElement =
      this.element.querySelector('.repository-list-wrapper');
    this.repositoryListWrapperElement.appendChild(this.repositoryList.element);
  }

  _initElement() {
    return createElement(`<div class="user-info-box">
  <div class="repository-list-wrapper">
    <h4 class="user-info-topic">Repositories</h4>
  </div>
</div>`);
  }
}

export default UserInfoBox;
