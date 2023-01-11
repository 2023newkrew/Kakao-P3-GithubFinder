import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '../../core/context';

class RepositoryList extends Component {
  constructor() {
    super();

    this.render = this.render.bind(this);
  }

  _initElement() {
    return createElement(`<ul class="repository-list">
  <li class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </li>
  <li class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </li>
  <li class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </li>
</ul>`);
  }

  _didMounted() {
    this.userInfoStore = useContext(this.element, 'user-info-store');
    this.userInfoStore.subscribe(this.render);
  }

  _didUnmounted() {
    this.userInfoStore.unsubscribe(this.render);
  }

  render([_, repositories]) {
    this.element.innerHTML = repositories.map(({
      name,
      forks,
      stargazers_count: stars,
      watchers,
    }) => `<div class="repository-list-item">
  <div class="repository">
    <div class="repository-name">${name}</div>
    <div class="repostiory-chips">
      <div class="chip primary">Stars: ${stars}</div>
      <div class="chip quaternary">Watchers: ${watchers}</div>
      <div class="chip secondary">Forks: ${forks}</div>
    </div>
  </div>
</div>`).join('\n');
  }
}

export default RepositoryList;
