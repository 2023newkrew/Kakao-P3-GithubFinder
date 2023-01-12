import Component from "@core/Component";
import Header from "@components/Header";
import Search from "@components/Search";
import UserProfile from "@components/UserProfile";
import Repositories from "@components/Repositories";
import Footer from "@components/Footer";

class App extends Component {
  template() {
    return `
      <header class="header navbar sticky-top navbar-dark bg-primary"></header>
      <main class="container d-flex flex-column gap-3 mt-3">
        <section class="search card"></section>
        <section class="user-profile card"></section>
        <section class="repositories"></section>
      </main>
      <footer class="footer"></footer>
    `;
  }

  onMount() {
    new Header(this.targetEl.querySelector(".header"));
    new Search(this.targetEl.querySelector(".search"));
    new UserProfile(this.targetEl.querySelector(".user-profile"));
    new Repositories(this.targetEl.querySelector(".repositories"));
    new Footer(this.targetEl.querySelector(".footer"));
  }
}

export default new App(document.body.querySelector("#app"));
