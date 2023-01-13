import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '@/core/context';

class RepositoryList extends Component {
  constructor() {
    super();

    this.render = this.render.bind(this);
  }

  _initElement() {
    return createElement('<ul class="repository-list"></ul>');
  }

  _didMounted() {
    this.userInfoStore = useContext(this.element, 'user-info-store');
    this.userInfoStore.subscribe(this.render);
  }

  _didUnmounted() {
    this.userInfoStore.unsubscribe(this.render);
  }

  render({repositories}) {
    if (repositories.length === 0) {
      this.element.innerHTML = '조회 가능한 저장소가 존재하지 않습니다.';
      return;
    }

    this.element.innerHTML = repositories.map(({
      name,
      forks,
      stargazers_count: stars,
      watchers,
    }) => `<div class="repository-list-item">
  <div class="repository">
    <div class="repository-name">${name}</div>
    <div class="repostiory-chips">
      <div class="chip chip--primary">Stars: ${stars}</div>
      <div class="chip chip--quaternary">Watchers: ${watchers}</div>
      <div class="chip chip--secondary">Forks: ${forks}</div>
    </div>
  </div>
</div>`).join('\n');
  }
}

export default RepositoryList;
