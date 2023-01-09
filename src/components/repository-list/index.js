import Component from '@/core/component';
import {createElement} from '@/utils';

class RepositoryList extends Component {
  _initElement() {
    return createElement('<div class="repository-list">레포지토리 리스트</div>');
  }

  _didMounted() {
    console.log('RepositoryList 마운트 됌');
  }

  _didUnmounted() {
    console.log('RepositoryList 언마운트 됌');
  }
}

export default RepositoryList;
