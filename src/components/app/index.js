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
}

export default App;
