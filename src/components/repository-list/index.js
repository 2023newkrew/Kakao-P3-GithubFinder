import Component from '@/core/component';
import {createElement} from '@/utils';

class RepositoryList extends Component {
  __initElement() {
    return createElement('<div class="repository-list">레포지토리 리스트</div>');
  }

  __didMounted() {
    console.log('RepositoryList 마운트 됌');
  }

  __willUnmount() {
    console.log('RepositoryList 언마운트 되려 함');
  }
}

export default RepositoryList;
