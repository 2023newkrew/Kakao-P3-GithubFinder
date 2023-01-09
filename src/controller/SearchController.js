import { fetchUserInfo } from "../services/user";
console.log(3);
export default class SearchController {
    #inputElement;
    constructor() {
        this.#inputElement = document.querySelector('.search input');
        this.#inputElement.addEventListener('keyup', this.onSearchID)
    }

    onSearchID(event) {
        const { key, target: {value: userID} } = event;
        console.log(key);
        if (key === 'Enter') {
            fetchUserInfo(userID)
            .then((data) => console.log(data));
        }
    }
}