import Component from '@/core/component';
import {createElement} from '@/utils';
import SearchBar from '@/components/search-bar';
import UserInfoBox from '@/components/user-info-box';
import createStore from '@/core/store';

class MainBox extends Component {
  constructor() {
    super();

    this.userInfoStore = createStore(123);
    this._createContext('user-info-store', this.userInfoStore);

    this.searchBar = new SearchBar();
    this.element.appendChild(this.searchBar.element);

    this.userInfoBox = new UserInfoBox();
    this.element.appendChild(this.userInfoBox.element);
  }

  _initElement() {
    return createElement('<main class="main-box">메인 박스</main>');
  }

  _didMounted() {
    console.log('MainBox 마운트 됌');
  }

  _didUnmounted() {
    console.log('MainBox 언마운트 됌');
  }
}

export default MainBox;
