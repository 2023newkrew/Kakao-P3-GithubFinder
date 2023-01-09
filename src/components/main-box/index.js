import Component from '@/core/component';
import {createElement} from '@/utils';

class MainBox extends Component {
  __initElement() {
    return createElement('<main class="main-box">메인 박스</main>');
  }

  __didMounted() {
    console.log('MainBox 마운트 됌');
  }

  __willUnmount() {
    console.log('MainBox 언마운트 되려 함');
  }
}

export default MainBox;
