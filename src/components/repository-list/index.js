import Component from '@/core/component';
import {createElement} from '@/utils';

class RepositoryList extends Component {
  _initElement() {
    return createElement(`<div class="repository-list">
  여기에 레포지토리 리스트가 노출됩니다.
</div>`);
  }

  _didMounted() {
    console.log('RepositoryList 마운트 됌');
  }

  _didUnmounted() {
    console.log('RepositoryList 언마운트 됌');
  }
}

export default RepositoryList;
