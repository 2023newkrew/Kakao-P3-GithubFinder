import './index.scss';
import Component from '@/core/component';
import {createElement} from '@/utils';
import MainBox from '@/components/main-box';

class App extends Component {
  constructor() {
    super();

    this.mainBox = new MainBox();
    this.element.appendChild(this.mainBox.element);
  }

  __initElement() {
    return createElement('<div class="app"></div>');
  }

  __didMounted() {
    console.log('App 마운트 됌');
  }

  __didUnmounted() {
    console.log('App 언마운트 됌');
  }
}

export default App;
