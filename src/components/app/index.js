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

  _initElement() {
    return createElement('<div class="app"></div>');
  }

  _didMounted() {
    console.log('App 마운트 됌');
  }

  _didUnmounted() {
    console.log('App 언마운트 됌');
  }
}

export default App;
