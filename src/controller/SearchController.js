import { fetchUserInfo, fetchUserRepos } from "../services/github";
import FavoritiesController from "./FavoritesController";
import UserInfoController from "./UserInfoController";

export default class SearchController {
    static #instance; // 싱글톤패턴
    #userInfoController;
    #favoritesController;
    #inputElement; // input element
    #favorityButton;
    #lastUserID;
    constructor() {
        if (SearchController.#instance) return SearchController.#instance;
        SearchController.#instance = this;

        this.#inputElement = document.querySelector('.search input');
        this.#inputElement.addEventListener('keyup', (event) => this.onSearchID(event))
        this.#userInfoController = new UserInfoController();
        this.#favoritesController = new FavoritiesController();
        this.#lastUserID = '';
    }

    async onSearchID(event) {
        const { key, target: {value: userID} } = event;
        try {
            if (key === 'Enter') {
                await this.searchID(userID);
            }
        } catch(error) {
            console.log(error);
            if (error.response.status === 404) {
                alert('해당 유저가 존재하지 않습니다.')
            } else {
                alert(error.message);
            } 
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
    async searchID(userID) {
        this.#lastUserID = userID;
        await Promise.all([
            this.getUserInfo(userID),
            this.getUserRepos(userID),
        ])
        this.drawGitChart(userID);
        this.drawFavorityState(userID)
    }
    drawGitChart(userID) {
        this.#userInfoController.drawGitChart(userID);
    }
    drawFavorityState(userID) { 
        this.#favoritesController.drawFavority(userID);
    }
    getLastUserID() {
        return this.#lastUserID;
    }
}