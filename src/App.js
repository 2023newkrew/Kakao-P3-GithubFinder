import Component from "@/core/Component";
import Header from "@/components/Header";
import Search from "@/components/Search";
import UserProfile from "@/components/UserProfile";
import Repositories from "@/components/Repositories";

class App extends Component {
  template() {
    return `
      <header class="header navbar navbar-dark bg-primary"></header>
      <main class="container">
        <section class="search card"></section>
        <section class="user-profile card"></section>
        <section class="repositories"></section>
      </main>
    `;
  }

  onMount() {
    new Header(this.targetEl.querySelector(".header"));
    new Search(this.targetEl.querySelector(".search"));
    new UserProfile(this.targetEl.querySelector(".user-profile"));
    new Repositories(this.targetEl.querySelector(".repositories"));
  }
}

export default new App(document.body.querySelector("#app"));
