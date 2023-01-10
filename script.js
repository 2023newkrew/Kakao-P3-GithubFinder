// 테스트를 위한 토큰 (아무런 권한이 없음. 나중에 따로 파일을 빼서 .gitignore에 추가하거나 환경 변수로 설정할 듯)
const MY_TOKEN = "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";

class Util {
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
    static async getUserInfoResponse(userName) {
        const userInfoRes = await fetch(
            `https://api.github.com/users/${userName}`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${MY_TOKEN}`,
                },
            }
        );
        return userInfoRes;
    }
    static async getRepoInfoResponse(userName) {
        const userInfoRes = await fetch(
            `https://api.github.com/users/${userName}/repos`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${MY_TOKEN}`,
                },
            }
        );
        return userInfoRes;
    }
}
class UIManager {
    static instance = null;
    constructor() {
        if (UIManager.instance !== null) return UIManager.instance;
        this.searchFrom = document.body.querySelector(".search-form");
        this.userInfo = document.body.querySelector(".user-info");
        this.repoInfo = document.body.querySelector(".repo-info");
        UIManager.instance = this;
    }
    static _createSpanBadge(text, bgColor) {
        const $badge = Util.createElementWithClassName("span", [
            "badge",
            "mr-1",
            bgColor,
        ]);
        $badge.innerText = text;
        return $badge;
    }
    static _createUserProfileLiElement(text) {
        const $li = Util.createElementWithClassName("li", [
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
        ]);
        $li.innerText = text;
        return $li;
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
        const $cardBody = Util.createDivWithClassName([
            "card-body",
            "text-light",
        ]);

        const $cardBodyRow = Util.createDivWithClassName(["row"]);
        const $cardBodyRowImgGrid = Util.createDivWithClassName([
            "col-md-3",
            "col-xm-12",
        ]);
        const $img = Util.createElementWithClassName("img", [
            "w-100",
            "h-100",
            "object-fit-fill",
            "m-auto",
            "align-items-center",
            "d-block",
        ]);
        $img.src = avatar_url;
        const $cardBodyRowInfoGrid = Util.createDivWithClassName([
            "col-md-9",
            "col-xm-12",
        ]);
        const $userInfoBadges = Util.createDivWithClassName([
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

        const $userInfoProfileList = Util.createDivWithClassName([
            "user-info__profile-list",
            "text-dark",
        ]);

        const $ul = Util.createElementWithClassName("ul", [
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

        const $viewProfileRow = Util.createDivWithClassName(["row"]);
        const $viewProfile = Util.createElementWithClassName("span", [
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
        const $card = Util.createDivWithClassName([
            "card",
            "border-secondary",
            "m-3",
        ]);
        /* 엘리멘트 생성 */
        const $row = Util.createDivWithClassName(["row", "p-3"]);
        const $colRepoName = Util.createDivWithClassName(["col-6"]);
        const $aRepoName = Util.createElementWithClassName("a", []);
        $aRepoName.innerText = name;
        const $colRepoInfo = Util.createDivWithClassName(["col-6"]);
        const $repoInfoBadges = Util.createDivWithClassName([
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
}
const renderUserInfoCard = async (userName) => {
    const uiManager = new UIManager();
    const res = await GitHubManager.getUserInfoResponse(userName);
    const json = await res.json();
    uiManager.renderUserInfo(json);
};
const renderRepoInfoCard = async (userName) => {
    const uiManager = new UIManager();
    const res = await GitHubManager.getRepoInfoResponse("charon0530");
    const jsonArray = await res.json();
    jsonArray.forEach((repoJson) => {
        uiManager.renderLatestRepos(repoJson);
        console.log(repoJson);
    });
};
async function main() {
    /* 현재 이벤트 등록 부분을 구현하지 않아 메인에서 테스트 코드를 작성함 */
    renderUserInfoCard("charon0530");
    renderRepoInfoCard("charon0530");
}
main();
