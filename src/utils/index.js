const createElement = (html) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container.children[0];
};

class Component {
  constructor() {
    if (this.constructor === Component) {
      throw new Error(); // 추상 클래스의 객체를 생성할 수 없음
    }

    this.element = this.__initElement();
    this.__container = document.createElement('div');
    this.__container.appendChild(this.element);

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(({addedNodes, removedNodes}) => {
        if (addedNodes.length) {
          this.__willUnmount();
        }
        if (removedNodes.length) {
          this.__didMounted();
        }
      });
    });

    this.mutationObserver.observe(this.__container, {childList: true});
  }

  unmount() {
    this.__container.appendChild(this.element);
  }

  __initElement() {
    throw new Error(); // initElement를 오버라이드 하지 않음
  }

  __didMounted() {}

  __willUnmount() {}
}

export {createElement, Component};
