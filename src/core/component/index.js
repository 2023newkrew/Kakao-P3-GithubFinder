class Component {
  constructor() {
    if (this.constructor === Component) {
      throw new Error('추상 클래스의 객체를 생성할 수 없음');
    }

    this.element = this._initElement();

    this.element.addEventListener(
        'did-mounted',
        this._didMounted.bind(this),
    );

    this.element.addEventListener(
        'did-unmounted',
        this._didUnmounted.bind(this),
    );
  }

  _initElement() {
    throw new Error('클래스가 _initElement를 오버라이드 하지 않음');
  }

  _didMounted() {}

  _didUnmounted() {}
}

export default Component;
