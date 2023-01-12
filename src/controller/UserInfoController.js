export default class UserInfoController {
    static #instance;
    #userInfoElement;
    #userReposElement;
    constructor() {
        if (UserInfoController.#instance) return UserInfoController.#instance;
        
        this.#userInfoElement = document.querySelector('.user-info');
        this.#userReposElement = document.querySelector('.user-repos');

        UserInfoController.#instance = this;
    }
    drawUserInfo(data) {
        // manage parameters
        const { login, avatar_url, name, public_repos, public_gists, followers, following, company, blog, location, created_at } = data;

        // (fragment) create fragment
        const newUserInfoElement = document.createDocumentFragment();

        // (wrapper) add user profile element
        const userProfileWrapperElement = document.createElement('article');
        userProfileWrapperElement.classList.add('user-profile');
        newUserInfoElement.appendChild(userProfileWrapperElement);

        // (element) add user picture element
        const userPictureElement = document.createElement('img');
        userPictureElement.setAttribute('src', avatar_url);
        userPictureElement.setAttribute('alt', '프로필 사진');
        userProfileWrapperElement.appendChild(userPictureElement);

        // (element) add user name element
        const userNameElement = document.createElement('p');
        userNameElement.textContent = name;
        userProfileWrapperElement.appendChild(userNameElement)

        // (wrapper) add user private element
        const userPrivateWrapperElement = document.createElement('ul');
        userProfileWrapperElement.appendChild(userPrivateWrapperElement)
        
        // (elements) add user private list elements
        const privateListElements = this.createListElements({ company, blog, location, created_at });
        for (let privateListElement of privateListElements) {
            userPrivateWrapperElement.appendChild(privateListElement);
        }

        // (wrapper) add git profile element
        const gitProfileWrapperElement = document.createElement('article');
        gitProfileWrapperElement.classList.add('git-profile');
        newUserInfoElement.appendChild(gitProfileWrapperElement);

        // (wrapper) add git info element
        const  gitInfoWrapperElement = document.createElement('ul');
        gitProfileWrapperElement.appendChild(gitInfoWrapperElement);

        // (elements) add git profile list elements
        const profileListElements = this.createListElements({ public_repos, public_gists, followers, following });
        for (let profileListElement of profileListElements) {
            gitInfoWrapperElement.appendChild(profileListElement);
        }
        
        // (elements) add git chart img element
        const profileChartElement = document.createElement('img');
        profileChartElement.setAttribute('src', `https://ghchart.rshah.org/${login}`);
        profileChartElement.setAttribute('alt', '깃헙 활동 차트')
        gitProfileWrapperElement.appendChild(profileChartElement);

        // draw element
        this.#userInfoElement.replaceChildren(); // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        this.#userInfoElement.appendChild(newUserInfoElement);
    }
    drawUserRepos(data) {
        const { html_url, name, stargazers_count, watchers_count, forks_count } = data;
        
    }

    createListElements(obj) {
        const listElements = [];
        for (let key in obj) {
            const listElement = document.createElement('li');
            listElement.textContent = `${key}: ${obj[key] || '-'}`
            listElements.push(listElement);
        }
        return listElements;
    }
}