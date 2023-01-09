import Component from '@/core/component';
import {createElement} from '@/utils';

class SearchBar extends Component {
  __initElement() {
    return createElement('<div class="search-bar">서치 바</div>');
  }

  __didMounted() {
    console.log('SearchBar 마운트 됌');
  }

  __didUnmounted() {
    console.log('SearchBar 언마운트 됌');
  }
}

export default SearchBar;
