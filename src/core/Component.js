export default class Component {
  constructor(targetEl) {
    this.targetEl = targetEl;
    this.render();
    this.onMount();
  }

  template() {
    return "";
  }

  render() {
    this.targetEl.innerHTML = this.template();
  }

  onMount() {}
}
