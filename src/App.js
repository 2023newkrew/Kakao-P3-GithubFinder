import Component from "@/core/Component";
import Header from "@/components/Header";
import Search from "@/components/Search";
import UserProfile from "@/components/UserProfile";

class App extends Component {
  template() {
    return `
      <header class="header"></header>
      <form class="search"></form>
      <section class="user-profile"></section>
    `;
  }

  onMount() {
    new Header(this.targetEl.querySelector(".header"));
    new Search(this.targetEl.querySelector(".search"));
    new UserProfile(this.targetEl.querySelector(".user-profile"));
  }
}

export default new App(document.body.querySelector("#app"));
