import Model from '@abstract/model';

export default class Repo extends Model {
  #title;

  #link;

  #starCount;

  #watcherCount;

  #forkCount;

  constructor({ title, link, starCount, watcherCount, forkCount }) {
    super();
    this.#title = title;
    this.#link = link;
    this.#starCount = starCount;
    this.#watcherCount = watcherCount;
    this.#forkCount = forkCount;
  }

  setData({ title, link, starCount, watcherCount, forkCount }) {
    if (title) this.#title = title;

    if (link) this.#link = link;

    if (starCount) this.#starCount = starCount;

    if (watcherCount) this.#watcherCount = watcherCount;

    if (forkCount) this.#forkCount = forkCount;
  }

  getData() {
    return {
      title: this.#title,
      link: this.#link,
      starCount: this.#starCount,
      watcherCount: this.#watcherCount,
      forkCount: this.#forkCount,
    };
  }
}
