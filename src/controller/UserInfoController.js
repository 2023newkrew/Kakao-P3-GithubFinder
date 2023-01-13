export default class UserInfoController {
    static #instance;
    #userInfoElement;
    #userReposElement;
    #gitChartElement;
    constructor() {
        if (UserInfoController.#instance) return UserInfoController.#instance;
        UserInfoController.#instance = this;

        this.#userInfoElement = document.querySelector('.user-info');
        this.#userReposElement = document.querySelector('.user-repos');
        this.#gitChartElement = document.querySelector('.git-chart');
    }
    drawUserInfo(data) {
        // manage parameters
        const { avatar_url, name, public_repos, public_gists, followers, following, company, blog, location, created_at } = data;

        // (fragment) create fragment
        const newUserInfoFragmentElement = document.createDocumentFragment();

        // (wrapper) add user profile element
        const userProfileWrapperElement = document.createElement('article');
        userProfileWrapperElement.classList.add('user-profile');
        newUserInfoFragmentElement.appendChild(userProfileWrapperElement);

        // (element) add user picture element
        const userPictureElement = document.createElement('img');
        userPictureElement.setAttribute('src', avatar_url);
        userPictureElement.setAttribute('alt', '프로필 사진');
        userProfileWrapperElement.appendChild(userPictureElement);

        // (element) add user name element
        const userNameElement = document.createElement('p');
        userNameElement.textContent = name;
        userProfileWrapperElement.appendChild(userNameElement)

        // (wrapper) add git profile element
        const gitProfileWrapperElement = document.createElement('article');
        gitProfileWrapperElement.classList.add('git-profile');
        newUserInfoFragmentElement.appendChild(gitProfileWrapperElement);

        // (wrapper) add git info element
        const  gitInfoWrapperElement = document.createElement('ul');
        gitProfileWrapperElement.appendChild(gitInfoWrapperElement);

        // (elements) add git profile list elements
        const profileListElements = this.createListElements({ public_repos, public_gists, followers, following });
        for (let profileListElement of profileListElements) {
            gitInfoWrapperElement.appendChild(profileListElement);
        }

        // (wrapper) add user private element
        const userPrivateWrapperElement = document.createElement('ul');
        gitProfileWrapperElement.appendChild(userPrivateWrapperElement)
        
        // (elements) add user private list elements
        const privateListElements = this.createListElements({ company, blog, location, created_at });
        for (let privateListElement of privateListElements) {
            userPrivateWrapperElement.appendChild(privateListElement);
        }
        

        // draw element
        this.#userInfoElement.replaceChildren(); // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        this.#userInfoElement.appendChild(newUserInfoFragmentElement);
    }
    drawUserRepos(repos) {
        // (fragment) add repos fragment element
        const newUserReposFragmentElement = document.createDocumentFragment();
        const userReposWrapperElement = document.createElement('ul');
        newUserReposFragmentElement.appendChild(userReposWrapperElement);
        repos.forEach((repo) => {
            // manage parameters
            const { html_url, name, stargazers_count, watchers_count, forks_count } = repo;

            // (wrapper) add repo wrapper element
            const userRepoWrapperElement = document.createElement('li');
            userReposWrapperElement.appendChild(userRepoWrapperElement);

            // (element) add repo title element
            const userRepoTitleElement = document.createElement('a');
            userRepoTitleElement.textContent = name;
            userRepoTitleElement.setAttribute('href', html_url);
            userRepoWrapperElement.appendChild(userRepoTitleElement);

            // (wrapper) add repo attribute wrapper element
            const userAttributeWrapperElement = document.createElement('ul');
            userRepoWrapperElement.appendChild(userAttributeWrapperElement);
            
            // (elements) add repo attribute elements
            const repoAttributeListElements = this.createListElements({ stargazers_count, watchers_count, forks_count });
            for (let repoAttributeListElement of repoAttributeListElements) {
                userAttributeWrapperElement.appendChild(repoAttributeListElement);
            }
        })
        
        
        // draw element
        this.#userReposElement.replaceChildren();
        this.#userReposElement.appendChild(newUserReposFragmentElement);
        
    }
    drawGitChart(userID) {
        // (element) add git chart img element
        const gitChartImgElement = document.createElement('img');
        gitChartImgElement.setAttribute('src', `https://ghchart.rshah.org/${userID}`);
        gitChartImgElement.setAttribute('alt', '깃헙 활동 차트')
        
        this.#gitChartElement.replaceChildren();
        this.#gitChartElement.appendChild(gitChartImgElement);
    }

    createListElements(obj) {
        const listElements = [];
        for (let key in obj) {
            const listElement = document.createElement('li');
            listElement.textContent = `${key}: ${obj[key] || (obj[key] !== 0 ? '-' : '0')}`
            listElements.push(listElement);
        }
        return listElements;
    }
}