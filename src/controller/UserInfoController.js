export default class UserInfoController {
    static #instance;
    #userNameElement;
    constructor() {
        if (UserInfoController.#instance) return UserInfoController.#instance;
        
        this.#userNameElement = document.querySelector('.result span');

        UserInfoController.#instance = this;
    }
    drawUserInfo(data) {
        const { name } = data;
        this.#userNameElement.innerText = name;
    }
}