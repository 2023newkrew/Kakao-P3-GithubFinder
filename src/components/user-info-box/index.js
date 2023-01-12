import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import ProfileCard from '@/components/profile-card';
import RepositoryList from '@/components/repository-list';
import {useContext} from '@/core/context';

class UserInfoBox extends Component {
  constructor() {
    super();

    this.render = this.render.bind(this);

    this.profileCard = new ProfileCard();
    this.element.prepend(this.profileCard.element);

    this.repositoryList = new RepositoryList();
    this.repositoryListWrapperElement =
        this.element.querySelector('.repository-list-wrapper');
    this.repositoryListWrapperElement.appendChild(this.repositoryList.element);
  }

  _initElement() {
    return createElement(`<div class="user-info-box" style="height: 0px;">
  <div class="repository-list-wrapper">
    <h4 class="user-info-topic">Repositories</h4>
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

  render(userInfo) {
    this.element.style.height = '0px';

    if (userInfo === null) return;

    this.element.style.height = `${this.element.scrollHeight}px`;
  }
}

export default UserInfoBox;
