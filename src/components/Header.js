import Component from "@core/Component";

export default class Header extends Component {
  template() {
    return `
      <nav class="container">
        <span class="navbar-brand">GitHub Finder</span>
      </nav>
    `;
  }
}
