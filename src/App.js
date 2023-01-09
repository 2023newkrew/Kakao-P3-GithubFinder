import Component from "@/core/Component";
import Header from "@/components/Header";
import Search from "@/components/Search";

class App extends Component {
  template() {
    return `
      <header class="header"></header>
      <section class="search"></section>
    `;
  }

  onMount() {
    new Header(this.targetEl.querySelector(".header"));
    new Search(this.targetEl.querySelector(".search"));
  }
}

export default new App(document.body.querySelector("#app"));
