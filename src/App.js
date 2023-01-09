import Component from "@/core/Component";
import Header from "@/components/Header";

class App extends Component {
  template() {
    return `
    <header class="header"></header>
    `;
  }

  onMount() {
    new Header(document.body.querySelector(".header"));
  }
}

export default new App(document.body.querySelector("#app"));
