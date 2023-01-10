// 테스트를 위한 토큰 (아무런 권한이 없음. 나중에 따로 파일을 빼서 .gitignore에 추가하거나 환경 변수로 설정할 듯)
const MY_TOKEN = "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";

class Dom {
    static createElementWithClassName(tagName, classNameArray) {
        const node = document.createElement(tagName);
        node.classList.add(...classNameArray);
        return node;
    }
    static createDivWithClassName(classNameArray) {
        return this.createElementWithClassName("div", classNameArray);
    }
}

class GitHubManager {
    static gitHubApiHeaders = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${MY_TOKEN}`,
    };

    static async getUserInfoResponse(userName) {
        let userInfoRes = null;
        try {
            userInfoRes = await fetch(
                `https://api.github.com/users/${userName}`,
                {
                    headers: GitHubManager.gitHubApiHeaders,
                }
            );
            if (!userInfoRes.ok) {
                throw new Error(
                    `user data 요청 응답에 실패하였습니다. ${userInfoRes.status}`
                );
            }
        } catch (error) {
            throw error;
        }
        return userInfoRes;
    }

    static async getRepoInfoResponse(userName) {
        let repoInfoRes = null;
        try {
            repoInfoRes = await fetch(
                `https://api.github.com/users/${userName}/repos`,
                {
                    headers: GitHubManager.gitHubApiHeaders,
                }
            );
            if (!repoInfoRes.ok) {
                throw new Error(
                    `repo data 요청 응답에 실패하였습니다. ${repoInfoRes.status}`
                );
            }
        } catch (error) {
            throw error;
        }
        return repoInfoRes;
    }
}
class UIManager {
    static instance = null;
    static toastTime = 1000;
    constructor() {
        if (UIManager.instance !== null) return UIManager.instance;
        this.searchFrom = document.body.querySelector(".search-form");
        this.userInfo = document.body.querySelector(".user-info");
        this.repoInfo = document.body.querySelector(".repo-info");
        this.toastBox = document.body.querySelector(".toast-box");
        UIManager.instance = this;
    }
    static _createSpanBadge(text, bgColor) {
        const $badge = Dom.createElementWithClassName("span", [
            "badge",
            "mr-1",
            bgColor,
        ]);
        $badge.innerText = text;
        return $badge;
    }
    static _createUserProfileLiElement(text) {
        const $li = Dom.createElementWithClassName("li", [
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
        ]);
        $li.innerText = text;
        return $li;
    }
    /* ChatGPT가 만든 코드 */
    renderUserInfoByChatGPT({
        avatar_url,
        public_repos,
        public_gists,
        followers,
        following,
        company,
        blog,
        location,
        created_at,
    }) {
        // Create elements
        const cardBody = document.createElement("div");
        const row1 = document.createElement("div");
        const col1 = document.createElement("div");
        const col2 = document.createElement("div");
        const img = document.createElement("img");
        const userInfoBadges = document.createElement("div");
        const publicRepoBadge = document.createElement("span");
        const publicGistBadge = document.createElement("span");
        const followerBadge = document.createElement("span");
        const followingBadge = document.createElement("span");
        const userInfoProfileList = document.createElement("div");
        const ul = document.createElement("ul");
        const companyLiElement = document.createElement("li");
        const webSiteLiElement = document.createElement("li");
        const locationLiElement = document.createElement("li");
        const createdAtLiElement = document.createElement("li");
        const row2 = document.createElement("div");
        const viewProfileBadge = document.createElement("span");

        // Set classes
        cardBody.classList.add("card-body", "text-light");
        row1.classList.add("row");
        col1.classList.add("col-md-3", "col-xm-12");
        col2.classList.add("col-md-9", "col-xm-12");
        img.classList.add(
            "w-100",
            "h-100",
            "object-fit-fill",
            "m-auto",
            "align-items-center",
            "d-block"
        );
        userInfoBadges.classList.add("user-info__badges");
        publicRepoBadge.classList.add("badge", "bg-primary");
        publicGistBadge.classList.add("badge", "bg-secondary");
        followerBadge.classList.add("badge", "bg-success");
        followingBadge.classList.add("badge", "bg-danger");
        userInfoProfileList.classList.add(
            "user-info__profile-list",
            "text-dark"
        );
        ul.classList.add("list-group", "mt-3");
        companyLiElement.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );
        webSiteLiElement.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );
        locationLiElement.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );
        createdAtLiElement.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );
        row2.classList.add("row");
        viewProfileBadge.classList.add(
            "badge",
            "rounded-pill",
            "bg-primary",
            "col-3",
            "mt-3"
        );

        // Set attributes
        img.setAttribute("src", avatar_url);

        // Set text content
        publicRepoBadge.textContent = `Public Repos : ${public_repos}`;
        publicGistBadge.textContent = `Public Gists : ${public_gists}`;
        followerBadge.textContent = `Followers : ${followers}`;
        followingBadge.textContent = `Following : ${following}`;
        companyLiElement.textContent = `Company : ${company}`;
        webSiteLiElement.textContent = `Website/Blog : ${blog}`;
        locationLiElement.textContent = `Location : ${location}`;
        createdAtLiElement.textContent = `Member Since : ${created_at}`;
        viewProfileBadge.textContent = "View Profile";

        // Append elements
        col1.appendChild(img);
        row1.appendChild(col1);
        row1.appendChild(col2);
        col2.appendChild(userInfoBadges);
        userInfoBadges.appendChild(publicRepoBadge);
        userInfoBadges.appendChild(publicGistBadge);
        userInfoBadges.appendChild(followerBadge);
        userInfoBadges.appendChild(followingBadge);
        col2.appendChild(userInfoProfileList);
        userInfoProfileList.appendChild(ul);
        ul.appendChild(companyLiElement);
        ul.appendChild(webSiteLiElement);
        ul.appendChild(locationLiElement);
        ul.appendChild(createdAtLiElement);
        row2.appendChild(viewProfileBadge);
        cardBody.appendChild(row1);
        cardBody.appendChild(row2);

        this.userInfo.appendChild(cardBody);
    }
    renderUserInfo({
        avatar_url,
        public_repos,
        public_gists,
        followers,
        following,
        company,
        blog,
        location,
        created_at,
    }) {
        /* 엘리멘트 생성 */
        const $cardBody = Dom.createDivWithClassName([
            "card-body",
            "text-light",
        ]);
        const $cardBodyRow = Dom.createDivWithClassName(["row"]);
        const $cardBodyRowImgGrid = Dom.createDivWithClassName([
            "col-md-3",
            "col-xm-12",
        ]);
        const $img = Dom.createElementWithClassName("img", [
            "w-100",
            "h-100",
            "object-fit-fill",
            "m-auto",
            "align-items-center",
            "d-block",
        ]);
        $img.src = avatar_url;
        const $cardBodyRowInfoGrid = Dom.createDivWithClassName([
            "col-md-9",
            "col-xm-12",
        ]);
        const $userInfoBadges = Dom.createDivWithClassName([
            "user-info__badges",
        ]);

        const $publicRepoBadge = UIManager._createSpanBadge(
            `Public Repos : ${public_repos}`,
            "bg-primary"
        );
        const $publicGistBadge = UIManager._createSpanBadge(
            `Public Gists : ${public_gists}`,
            "bg-secondary"
        );
        const $followerBadge = UIManager._createSpanBadge(
            `Followers : ${followers}`,
            "bg-success"
        );
        const $followingBadge = UIManager._createSpanBadge(
            `Following : ${following}`,
            "bg-danger"
        );

        const $userInfoProfileList = Dom.createDivWithClassName([
            "user-info__profile-list",
            "text-dark",
        ]);

        const $ul = Dom.createElementWithClassName("ul", [
            "list-group",
            "mt-3",
        ]);

        const $liCompany = UIManager._createUserProfileLiElement(
            `Company : ${company}`
        );
        const $liWebSite = UIManager._createUserProfileLiElement(
            `Website/Blog : ${blog}`
        );
        const $liLocation = UIManager._createUserProfileLiElement(
            `Location : ${location}`
        );
        const $liMemberSince = UIManager._createUserProfileLiElement(
            `Member Since : ${created_at}`
        );
        const $viewProfileRow = Dom.createDivWithClassName(["row"]);
        const $viewProfile = Dom.createElementWithClassName("span", [
            "badge",
            "rounded-pill",
            "bg-primary",
            "col-3",
            "mt-3",
        ]);
        $viewProfile.innerText = "View Profile";

        /* 엘리멘트 결합 */
        $ul.append($liCompany, $liWebSite, $liLocation, $liMemberSince);
        $userInfoProfileList.append($ul);
        $userInfoBadges.append(
            $publicRepoBadge,
            $publicGistBadge,
            $followerBadge,
            $followingBadge
        );
        $cardBodyRowInfoGrid.append($userInfoBadges, $userInfoProfileList);
        $cardBodyRowImgGrid.append($img);
        $cardBodyRow.append($cardBodyRowImgGrid, $cardBodyRowInfoGrid);
        $viewProfileRow.append($viewProfile);
        $cardBody.append($cardBodyRow, $viewProfileRow);
        this.userInfo.append($cardBody);
    }
    renderLatestRepos({ name, stargazers_count, watchers_count, forks_count }) {
        const $card = Dom.createDivWithClassName([
            "card",
            "border-secondary",
            "m-3",
        ]);
        /* 엘리멘트 생성 */
        const $row = Dom.createDivWithClassName(["row", "p-3"]);
        const $colRepoName = Dom.createDivWithClassName(["col-6"]);
        const $aRepoName = Dom.createElementWithClassName("a", []);
        $aRepoName.innerText = name;
        const $colRepoInfo = Dom.createDivWithClassName(["col-6"]);
        const $repoInfoBadges = Dom.createDivWithClassName([
            "repo-info__badges",
            "text-light",
        ]);
        const $starBadge = UIManager._createSpanBadge(
            `Stars : ${stargazers_count}`,
            "bg-primary"
        );
        const $watcherBadge = UIManager._createSpanBadge(
            `Watchers : ${watchers_count}`,
            "bg-secondary"
        );
        const $forkBadge = UIManager._createSpanBadge(
            `Forks : ${forks_count}`,
            "bg-success"
        );

        /* 엘리멘트 결합 */
        $repoInfoBadges.append($starBadge, $watcherBadge, $forkBadge);
        $colRepoInfo.append($repoInfoBadges);
        $colRepoName.append($aRepoName);

        $row.append($colRepoName, $colRepoInfo);
        $card.append($row);
        this.repoInfo.append($card);
    }
    clearUserInfo() {
        this.userInfo.innerHTML = "";
    }
    clearRepoInfo() {
        this.repoInfo.innerHTML = "";
    }
    async renderUserInfoAsync(userName) {
        const uiManager = new UIManager();
        try {
            const res = await GitHubManager.getUserInfoResponse(userName);
            const json = await res.json();

            uiManager.clearUserInfo();
            uiManager.renderUserInfo(json);
            uiManager.renderToast(
                "User Data를 가져오는데 성공했습니다.",
                "green"
            );
        } catch (error) {
            console.log(error);
            uiManager.renderToast(
                "User Data를 가져오는데 실패했습니다.",
                "red"
            );
        }
    }
    async renderRepoInfoAsync(userName) {
        const uiManager = new UIManager();
        try {
            const res = await GitHubManager.getRepoInfoResponse(userName);
            const jsonArray = await res.json();

            uiManager.clearRepoInfo();
            jsonArray.forEach((repoJson) => {
                uiManager.renderLatestRepos(repoJson);
            });
            uiManager.renderToast(
                "Repo Data를 가져오는데 성공했습니다.",
                "green"
            );
        } catch (error) {
            uiManager.renderToast(
                "Repo Data를 가져오는데 실패했습니다.",
                "red"
            );
        }
    }

    renderToast(message, color) {
        // Create elements
        const toast = document.createElement("div");
        const header = document.createElement("div");
        const strong = document.createElement("strong");
        const button = document.createElement("button");
        const span = document.createElement("span");
        const body = document.createElement("div");

        // Set classes
        toast.classList.add("toast");
        header.classList.add("toast-header");
        strong.classList.add("mr-auto");
        button.classList.add("ml-2", "mb-1", "close");
        body.classList.add("toast-body");

        // Set text content
        strong.textContent = "GitHub Finder";
        span.textContent = "×";
        body.textContent = message;

        // Set attributes
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");
        toast.setAttribute("data-autohide", "false");
        button.setAttribute("type", "button");
        button.setAttribute("data-dismiss", "toast");
        button.setAttribute("aria-label", "Close");
        span.setAttribute("aria-hidden", "true");

        // Append elements
        header.appendChild(strong);
        button.appendChild(span);
        header.appendChild(button);
        toast.appendChild(header);
        toast.appendChild(body);
        toast.style.backgroundColor = color;
        this.toastBox.appendChild(toast);
        $(toast).toast("show");
        setTimeout(() => {
            $(toast).toast("hide");
        }, UIManager.toastTime);
    }
}

const handleKeyDownSearchForm = (event) => {
    if (event.key === "Enter") {
        if (event.target.value === "") return;

        const uiManager = new UIManager();
        const userName = event.target.value.trim();
        uiManager.renderUserInfoAsync(userName);
        uiManager.renderRepoInfoAsync(userName);
    }
};
function main() {
    const uiManager = new UIManager();

    uiManager.searchFrom.addEventListener("keydown", handleKeyDownSearchForm);
}
main();
