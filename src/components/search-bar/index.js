import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import {useContext} from '@/core/context';
import {requestUserInfo} from '@/apis';

const KeyCode = {
  ENTER: 'Enter',
};

class SearchBar extends Component {
  constructor() {
    super();

    this.handleKeydown = this.handleKeydown.bind(this);
    this.searchInputElement = this.element.querySelector('.search-input');
    this.searchErrorElement = this.element.querySelector('.search-error');
    this.searchInputElement.addEventListener('keydown', this.handleKeydown);
  }

  _initElement() {
    return createElement(`<div class="search-bar">
  <h2 class="title">깃허브 유저 검색</h2>
  <label class="search-label">저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</label>
  <div class="search-input-wrapper">
    <input class="search-input" type="text">
    <div class="search-error" style="height: 0px;">에러!</div>
  <div>
</div>`);
  }

  _didMounted() {
    this.searchInputElement.focus();

    this.userInfoStore = useContext(this.element, 'user-info-store');
  }

  async handleKeydown(event) {
    this.clearSearchError();

    if (event.code !== KeyCode.ENTER) return;
    this.searchInputElement.disabled = true;

    try {
      const [user, repositories] =
          await requestUserInfo(this.searchInputElement.value);

      this.userInfoStore.publish({user, repositories});
    } catch (error) {
      this.setSearchError(error);
    }

    this.searchInputElement.disabled = false;
    this.searchInputElement.focus();
  }

  clearSearchError() {
    this.searchInputElement.classList.remove('error');
    this.searchErrorElement.style.height = '0px';
  }

  setSearchError(error) {
    this.searchInputElement.classList.add('error');
    this.searchErrorElement.innerHTML = error;
    this.searchErrorElement.style.height =
        `${this.searchErrorElement.scrollHeight}px`;
  }
}

export default SearchBar;
