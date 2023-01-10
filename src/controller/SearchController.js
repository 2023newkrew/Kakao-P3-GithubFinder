import { fetchUserInfo } from "../services/user";
import UserInfoController from "./UserInfoController";

export default class SearchController {
    static #instance; // 싱글톤패턴
    #userInfoController;
    #inputElement; // input element

    constructor() {
        if (SearchController.#instance) return SearchController.#instance;
        
        this.#inputElement = document.querySelector('.search input');
        this.#inputElement.addEventListener('keyup', (event) => this.onSearchID(event))
        this.#userInfoController = new UserInfoController();

        SearchController.#instance = this;
    }

    onSearchID(event) {
        const { key, target: {value: userID} } = event;
        if (key === 'Enter') {
            fetchUserInfo(userID)
            .then((data) => this.#userInfoController.drawUserInfo(data));
        }
    }
}