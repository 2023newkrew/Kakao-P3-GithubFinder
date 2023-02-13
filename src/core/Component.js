export default class Component {
  constructor(targetEl, props = {}) {
    this.targetEl = targetEl;
    this.props = props;
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

  appendChildComponents(targetEl, Component, propsList) {
    const fragment = document.createDocumentFragment();

    propsList.forEach((props) => {
      const template = document.createElement("template");
      new Component(template, props);
      fragment.appendChild(template.content);
    });

    targetEl.replaceChildren(fragment);
  }
}
