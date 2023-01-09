import Component from '@/core/component';
import {createElement} from '@/utils';

class SearchBar extends Component {
  _initElement() {
    return createElement('<div class="search-bar">서치 바</div>');
  }

  _didMounted() {
    console.log('SearchBar 마운트 됌');
  }

  _didUnmounted() {
    console.log('SearchBar 언마운트 됌');
  }
}

export default SearchBar;
