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
        this.drawFavorityUsers();
    }
    
    onFavorityAdd(userID) {
        this.#favorites.push(userID)
        this.saveFavorities();
        this.drawFavorityUsers();
    }
    onFavorityRemove(userID) {
        this.#favorites = this.#favorites.filter((favority) => favority !== userID)
        this.saveFavorities();
        this.drawFavorityUsers();
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
            this.drawFavorityButton(userID);
        })
        favorityRemoveButtonElement.addEventListener('click', () => {
            const userID = this.#searchController.getLastUserID();
            if (userID === '') {
                alert('유저를 검색해주세요.')
                return;
            }
            this.onFavorityRemove(userID);
            this.drawFavorityButton(userID);
        })
    }
    getFavority() {
        this.#favorites = JSON.parse(localStorage.getItem('favorities')) || []
    }
    saveFavorities() {
        localStorage.setItem('favorities', JSON.stringify(this.#favorites));
    }
    drawFavorityButton(userID) {
        const isFavority = this.#favorites.find(favority => favority === userID) ? true : false;
        if (isFavority) {
            this.#favoriteElement.classList.add('favority');
        } else {
            this.#favoriteElement.classList.remove('favority');
        }
    }
    drawFavorityUsers() {
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