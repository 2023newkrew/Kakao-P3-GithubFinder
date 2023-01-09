class Component {
  constructor() {
    if (this.constructor === Component) {
      throw new Error(); // 추상 클래스의 객체를 생성할 수 없음
    }

    this.element = this.__initElement();

    this.element.addEventListener(
        'did-mounted',
        this.__didMounted.bind(this),
    );

    this.element.addEventListener(
        'did-unmounted',
        this.__didUnmounted.bind(this),
    );
  }

  __initElement() {
    throw new Error(); // initElement를 오버라이드 하지 않음
  }

  __didMounted() {}

  __didUnmounted() {}

  __createContext(key, value) {
    this.element.addEventListener(`context-${key}`, (event) => {
      event.detail.resolve(value);
      event.stopPropagation();
    });
  }

  __useContext(key) {
    let result = null;
    const resolve = (value) => {
      result = value;
    };

    this.element.dispatchEvent(new CustomEvent(`context-${key}`, {
      detail: {resolve},
      bubbles: true,
    }));

    return result;
  }
}

export default Component;
