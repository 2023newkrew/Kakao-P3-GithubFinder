export default class UserLatestRepos {
  constructor(user) {
    this.latestReposListElement = document.getElementById("latestReposList");
    this.user = user;
  }
  renderUserLatestRepos(number) {
    const latestRepos = this.user.getLatestRepos(number);

    latestRepos.sort((elementA, elementB) => {
      return new Date(elementB.updated_at).getTime() - new Date(elementA.updated_at).getTime();
    });

    const elementString = this.makeLatestRepoListElement(latestRepos);
    this.latestReposListElement.innerHTML = elementString;
  }

  makeLatestRepoListElement(latestRepos) {
    let elementString = ``;
    for (let index = 0; index < latestRepos.length; index++) {
      elementString += `
      <li class="latestRepo">
        <div class="title">
          <a href="${latestRepos[index].html_url}" target="_blank">${latestRepos[index].name}</a>
        </div>
        <ul class="tag">
          <li>Stars : ${latestRepos[index].stargazers_count}</li>
          <li>Watchers : ${latestRepos[index].watchers}</li>
          <li>Forks : ${latestRepos[index].forks}</li>
        </ul>
      </li>
      `;
    }
    return elementString;
  }
}
