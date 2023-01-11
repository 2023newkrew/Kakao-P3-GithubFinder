import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

class RepositoryList extends Component {
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
}

export default RepositoryList;
