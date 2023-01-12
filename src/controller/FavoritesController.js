import SearchController from "@controller/searchController";

export default class FavoritiesController {
    static #instance;
    #searchController;
    #favoriteElement;
    #favoritesElement;
    #favorites;
    constructor () {
        if (FavoritiesController.#instance) return FavoritiesController.#instance;
        FavoritiesController.#instance = this;

        this.#searchController = new SearchController();
        this.#favoriteElement = document.querySelector('.favorite');
        this.#favoritesElement = document.querySelector('.favorites');
        this.#favorites = [];
        
        this.registEventListner();
        this.getFavority();
        this.drawFavorites();
    }
    onFavorityView(userID) {
        this.#searchController.onSearchID(userID);
    }
    onFavorityAdd(userID) {
        this.#favorites.push(userID)
        this.saveFavorities();
        this.drawFavorites();
    }
    onFavorityRemove(userID) {
        this.#favorites = this.#favorites.filter((favority) => favority !== userID)
        this.saveFavorities();
        this.drawFavorites();
    }
    registEventListner() {
        const [ favorityAddButtonElement, favorityRemoveButtonElement ] = this.#favoriteElement.querySelectorAll('button');
        favorityAddButtonElement.addEventListener('click', () => {
            const userID = this.#searchController.getLastUserID();
            if (userID === '') {
                alert('유저를 검색해주세요.')
                return;
            }
            this.onFavorityAdd(userID);
            this.drawFavority(userID);
        })
        favorityRemoveButtonElement.addEventListener('click', () => {
            const userID = this.#searchController.getLastUserID();
            if (userID === '') {
                alert('유저를 검색해주세요.')
                return;
            }
            this.onFavorityRemove(userID);
            this.drawFavority(userID);
        })
    }
    getFavority() {
        this.#favorites = JSON.parse(localStorage.getItem('favorities')) || []
    }
    saveFavorities() {
        localStorage.setItem('favorities', JSON.stringify(this.#favorites));
    }
    drawFavority(userID) {
        const isFavority = this.#favorites.find(favority => favority === userID) ? true : false;
        if (isFavority) {
            this.#favoriteElement.classList.add('favority');
        } else {
            this.#favoriteElement.classList.remove('favority');
        }
    }
    drawFavorites() {
        const favoritiesWrapperElement = document.createElement('ul');
        favoritiesWrapperElement.addEventListener('click', (event) => {
            this.#searchController.searchID(event.target.textContent);
        })
        this.#favorites.forEach((favorite) => {
            const favoriteElement = document.createElement('li');
            favoriteElement.textContent = favorite;
            favoritiesWrapperElement.appendChild(favoriteElement);
        })   
        
        this.#favoritesElement.replaceChildren();
        this.#favoritesElement.appendChild(favoritiesWrapperElement);
    }
}