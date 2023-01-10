import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

class RepositoryList extends Component {
  _initElement() {
    return createElement(`<div class="repository-list">
  <div class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </div>
  <div class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </div>
  <div class="repository-list-item">
    <div class="repository">
      <div class="repository-name">gogo</div>
      <div class="repostiory-chips">
        <div class="chip primary">Stars: 0</div>
        <div class="chip quaternary">Watchers: 0</div>
        <div class="chip secondary">Forks: 0</div>
      </div>
    </div>
  </div>
</div>`);
  }

  _didMounted() {
    console.log('RepositoryList 마운트 됌');
  }

  _didUnmounted() {
    console.log('RepositoryList 언마운트 됌');
  }
}

export default RepositoryList;
