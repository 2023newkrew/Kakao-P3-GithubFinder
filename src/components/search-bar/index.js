import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';

class SearchBar extends Component {
  constructor() {
    super();

    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.element.addEventListener('click', this.handleClick);
  }

  _initElement() {
    return createElement(`<div class="search-bar">
  <h2 class="title">깃허브 유저 검색</h2>
  <label class="search-label">저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</label>
  <input class="search-input" type="text">
</div>`);
  }

  _didMounted() {
    this.userInfoStore = this._useContext('user-info-store');
    this.userInfoStore.subscribe(this.handleUserInfoChange);
  }

  _didUnmounted() {
    this.userInfoStore.unsubscribe(this.handleUserInfoChange);
  }

  handleUserInfoChange(value) {
    console.log(value);
  }

  handleClick(event) {
    this.userInfoStore.publish(999);
  }
}

export default SearchBar;
