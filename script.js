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

class BoredManager {
    static async getActivityResponse() {
        let activityRes = null;
        try {
            activityRes = await fetch("http://www.boredapi.com/api/activity/");
        } catch (error) {
            throw error;
        }
        return activityRes;
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
    /* 정적 변수 */
    static searchFrom = document.body.querySelector(".search-form");
    static userInfo = document.body.querySelector(".user-info");
    static repoInfo = document.body.querySelector(".repo-info");
    static toastBox = document.body.querySelector(".toast-box");
    static historyBox = document.body.querySelector(".history-box");
    static boredButton = document.getElementById("bored-button");
    static activityModal = document.getElementById("activityModal");

    static toastTime = 2000;
    static historyList = UIManager._getHistoryListInLocalStorage();
    static historyMaxCount = 5;

    static _getHistoryListInLocalStorage() {
        return JSON.parse(localStorage.getItem("historyList")) || [];
    }

    static _setHistoryListInLocalStorage() {
        localStorage.setItem(
            "historyList",
            JSON.stringify(UIManager.historyList)
        );
    }

    static _addHistory(name) {
        const historyList = UIManager.historyList;
        for (let i = historyList.length - 1; i >= 0; i--) {
            if (historyList[i] === name) {
                historyList.splice(i, 1);
            }
        }
        if (historyList.length >= UIManager.historyMaxCount) {
            historyList.shift();
        }
        historyList.push(name);
    }

    static _getUserInfoHTML({
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
        return `
        <div class="card-body text-light">
          <div class="row">
            <div class="col-md-3 col-xm-12">
              <img class="w-100 h-100 object-fit-fill m-auto align-items-center d-block" src="${avatar_url}" style="background:transparent url(./asset/loading.gif) center center no-repeat; " />
            </div>
            <div class="col-md-9 col-xm-12">
              <div class="user-info__badges">
                <span class="badge bg-primary">Public Repos : ${public_repos}</span>
                <span class="badge bg-secondary">Public Gists : ${public_gists}</span>
                <span class="badge bg-success">Followers : ${followers}</span>
                <span class="badge bg-danger">Following : ${following}</span>
              </div>
              <div class="user-info__profile-list text-dark">
                <ul class="list-group mt-3">
                  <li class="list-group-item d-flex justify-content-between align-items-center">Company : ${company}</li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">Website/Blog : ${blog}</li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">Location : ${location}</li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">Member Since : ${created_at}</li>
                  
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <span class="badge rounded-pill bg-primary col-3 mt-3">View Profile</span>
          </div>
        </div>
        `;
    }

    static _getLatestReposHTML({
        name,
        stargazers_count,
        watchers_count,
        forks_count,
        svn_url,
    }) {
        return `
        <div class="card border-secondary m-3">
          <div class="row p-3">
            <div class="col-6">
              <a href="${svn_url}">${name}</a>
            </div>
            <div class="col-6">
              <div class="repo-info__badges text-light">
                <span class="badge bg-primary">Stars : ${stargazers_count}</span>
                <span class="badge bg-secondary">Watchers : ${watchers_count}</span>
                <span class="badge bg-success">Forks : ${forks_count}</span>
              </div>
            </div>
          </div>
        </div>
        `;
    }

    static renderUserInfo(json) {
        const userInfoHTML = UIManager._getUserInfoHTML(json);
        UIManager.userInfo.innerHTML = userInfoHTML;
    }

    static renderRepoInfo(jsonArray) {
        jsonArray.forEach((json) => {
            const latestReposHTML = this._getLatestReposHTML(json);
            UIManager.repoInfo.innerHTML += latestReposHTML;
        });
    }

    static clearUserInfo() {
        UIManager.userInfo.innerHTML = "";
    }

    static clearRepoInfo() {
        UIManager.repoInfo.innerHTML = "";
    }

    static async renderUserInfoAsync(userName) {
        try {
            const loadingHTML = UIManager.getLoadingHTML(100);
            UIManager.userInfo.innerHTML = loadingHTML;

            const res = await GitHubManager.getUserInfoResponse(userName);
            const json = await res.json();

            UIManager.clearUserInfo();
            UIManager.renderUserInfo(json);

            UIManager._addHistory(userName);
            UIManager.renderHistory();

            UIManager.renderToast(
                "User Data를 가져오는데 성공했습니다.",
                "green",
                "white"
            );
        } catch (error) {
            console.log(error);
            UIManager.clearUserInfo();
            UIManager.renderToast(
                "User Data를 가져오는데 실패했습니다.",
                "red",
                "white"
            );
            UIManager.clearUserInfo();
        }
    }

    static async renderRepoInfoAsync(userName) {
        try {
            const loadingHTML = UIManager.getLoadingHTML(100);
            UIManager.repoInfo.innerHTML = loadingHTML;

            const res = await GitHubManager.getRepoInfoResponse(userName);
            const jsonArray = await res.json();

            UIManager.clearRepoInfo();
            UIManager.renderRepoInfo(jsonArray);

            UIManager.renderToast(
                "Repo Data를 가져오는데 성공했습니다.",
                "green",
                "white"
            );
        } catch (error) {
            console.log(error);
            UIManager.clearRepoInfo();
            UIManager.renderToast(
                "Repo Data를 가져오는데 실패했습니다.",
                "red",
                "white"
            );
            UIManager.clearRepoInfo();
        }
    }

    static getToastElement(message) {
        const $toast = Dom.createDivWithClassName(["toast"]);
        $toast.setAttribute("role", "alert");
        $toast.setAttribute("aria-live", "assertive");
        $toast.setAttribute("aria-atomic", "true");
        $toast.setAttribute("data-autohide", "false");

        $toast.innerHTML = `
            <div class="toast-header">
                <strong class="mr-auto">GitHub Finder</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        return $toast;
    }

    static renderToast(message, backgroundColor, textColor) {
        const $toast = UIManager.getToastElement(message);

        $toast.style.backgroundColor = backgroundColor;
        $toast.style.color = textColor;

        UIManager.toastBox.insertAdjacentElement("afterbegin", $toast);

        $($toast).toast("show");
        setTimeout(() => {
            $($toast).toast("hide");
        }, UIManager.toastTime);
    }

    static renderHistory() {
        UIManager.historyBox.innerHTML = "";
        UIManager.historyList.forEach((name) => {
            UIManager.historyBox.innerHTML += `<button class="btn btn-primary btn-sm m-1">${name}</button>`;
        });
        UIManager._setHistoryListInLocalStorage();
    }

    static getLoadingHTML(size) {
        return `<img class="p-3 mx-auto" src="./asset/loading.gif" alt="loading-spinner" style="width: ${size}px" />`;
    }

    static async renderBoredModalAsync() {
        //TODO
        const activityRes = await BoredManager.getActivityResponse();
        const activityJson = await activityRes.json();
        console.log(activityJson);
    }
}

const handleKeyDownSearchForm = (event) => {
    if (event.key === "Enter") {
        if (event.target.value === "") return;

        const userName = event.target.value.trim();
        UIManager.renderUserInfoAsync(userName);
        UIManager.renderRepoInfoAsync(userName);
    }
};

const handleClickSearchForm = (event) => {
    if (event.target.tagName === "BUTTON") {
        const userName = event.target.innerText;
        UIManager.searchFrom.querySelector("input").value = userName;

        UIManager.renderUserInfoAsync(userName);
        UIManager.renderRepoInfoAsync(userName);
    }
};
const handleShowModal = async (event) => {
    UIManager.activityModal.querySelector(".modal-body").innerHTML =
        UIManager.getLoadingHTML(50);
};

const handleShownModal = async (event) => {
    const activityRes = await BoredManager.getActivityResponse();
    const activityJson = await activityRes.json();
    const activity = activityJson.activity;
    UIManager.activityModal.querySelector(".modal-body").innerHTML = activity;
};
function main() {
    UIManager.searchFrom.addEventListener("keydown", handleKeyDownSearchForm);
    UIManager.searchFrom.addEventListener("click", handleClickSearchForm);
    $(document).on("show.bs.modal", handleShowModal);
    $(document).on("shown.bs.modal", handleShownModal);
    UIManager.renderHistory();
}
main();
