import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '@/core/context';

const KeyCode = {
  ENTER: 'Enter',
};

class SearchBar extends Component {
  constructor() {
    super();

    this.handleKeydown = this.handleKeydown.bind(this);
    this.searchInputElement = this.element.querySelector('.search-input');
    this.searchInputElement.addEventListener('keydown', this.handleKeydown);
  }

  _initElement() {
    return createElement(`<div class="search-bar">
  <h2 class="title">깃허브 유저 검색</h2>
  <label class="search-label">저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</label>
  <input class="search-input" type="text">
</div>`);
  }

  _didMounted() {
    this.searchInputElement.focus();

    this.userInfoStore = useContext(this.element, 'user-info-store');
  }

  handleKeydown(event) {
    if (event.code !== KeyCode.ENTER) return;
    this.searchInputElement.disabled = true;

    // eslint-disable-next-line max-len
    const accessToken = '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';
    const headers = {'Authorization': `Bearer ${accessToken}`};

    const userPromise = fetch(`https://api.github.com/users/${event.target.value}`, {headers});
    const repositoriesPromise = fetch(`https://api.github.com/users/${event.target.value}/repos`, {headers});
    Promise.all([userPromise, repositoriesPromise])
        .then((results) => Promise.all(results.map((res) => res.json())))
        .then(([user, repositories]) => {
          this.userInfoStore.publish({user, repositories});
          this.searchInputElement.disabled = false;
          this.searchInputElement.focus();
        });
  }
}

export default SearchBar;
