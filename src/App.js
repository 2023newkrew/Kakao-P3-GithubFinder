import Component from "@/core/Component";
import Header from "@/components/Header";
import Search from "@/components/Search";
import UserInfo from "@/components/UserInfo";

class App extends Component {
  template() {
    return `
      <header class="header"></header>
      <form class="search"></form>
      <section class="user-info"></section>
    `;
  }

  onMount() {
    new Header(this.targetEl.querySelector(".header"));
    new Search(this.targetEl.querySelector(".search"));
    new UserInfo(this.targetEl.querySelector(".user-info"));
  }
}

export default new App(document.body.querySelector("#app"));
