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
    return createElement('<div class="search-bar">서치 바</div>');
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
