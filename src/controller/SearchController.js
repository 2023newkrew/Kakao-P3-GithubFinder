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
            this.getGitChart(userID);
            await Promise.all([
                this.getUserInfo(userID),
                this.getUserRepos(userID)    
            ])
        }
    }
    async getUserInfo(userID) {
        const userData = await fetchUserInfo(userID);
        this.#userInfoController.drawUserInfo(userData);
    }
    async getUserRepos(userID) {
        const reposData = await fetchUserRepos(userID);
        this.#userInfoController.drawUserRepos(reposData);
    }
    getGitChart(userID) {
        this.#userInfoController.drawGitChart(userID);
    }
}