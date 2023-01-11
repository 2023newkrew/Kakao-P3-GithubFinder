import { fetchUserInfo, fetchUserRepos } from "../services/github";
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

    async onSearchID(event) {
        const { key, target: {value: userID} } = event;
        if (key === 'Enter') {
            const userData = await this.getUserInfo(userID);
            this.#userInfoController.drawUserInfo(userData);

            const reposData = await this.getUserRepos(userID);
            console.log(reposData);
            this.#userInfoController.drawUserRepos(reposData);
        }
    }
    async getUserInfo(userID) {
        return await fetchUserInfo(userID);
    }
    async getUserRepos(userID) {
        return await fetchUserRepos(userID);
    }
}