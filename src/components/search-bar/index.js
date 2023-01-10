import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

const KeyCode = {
  ENTER: 'Enter',
};

class SearchBar extends Component {
  constructor() {
    super();

    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
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

    this.userInfoStore = this._useContext('user-info-store');
    this.userInfoStore.subscribe(this.handleUserInfoChange);
  }

  _didUnmounted() {
    this.userInfoStore.unsubscribe(this.handleUserInfoChange);
  }

  handleUserInfoChange(value) {
    console.log(value);
  }

  handleKeydown(event) {
    if (event.code !== KeyCode.ENTER) return;
    this.searchInputElement.disabled = true;

    setTimeout(() => {
      this.searchInputElement.disabled = false;
      this.searchInputElement.focus();
    }, 1000);
  }
}

export default SearchBar;
