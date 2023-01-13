import History from "@models/History";
import {
  getHistoryItemTemplate,
  NO_HISTORY_TEMPLATE,
} from "@templates/history";

export default class HistoryController {
  constructor(historyContainer) {
    this.historyContainer = historyContainer;
    this.numberOfHistory = 0;
    this._init();
  }
  _init() {
    this._initEvent();
    this._initHistory();
  }
  _initEvent() {
    this.historyContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("button__delete")) {
        const toDeleteEl = event.target.parentElement;
        this.deleteHistory(toDeleteEl);
      }
    });
  }
  _initHistory() {
    const history = History.getAll();
    this.numberOfHistory = history.length;

    if (this.numberOfHistory === 0) {
      this.historyContainer.innerHTML = NO_HISTORY_TEMPLATE;
      return;
    }

    const historyTemplates = history
      .map(({ value, id }) => getHistoryItemTemplate(value, id))
      .join("");
    this.historyContainer.innerHTML = historyTemplates;
  }
  addHistory(searchValue) {
    const historyId = History.add(searchValue);
    if (!historyId) {
      return;
    }

    const listItemEl = getHistoryItemTemplate(searchValue, historyId);

    this.numberOfHistory++;
    if (this.numberOfHistory === 1) {
      this.historyContainer.innerHTML = listItemEl;
      return;
    }

    this.historyContainer.insertAdjacentHTML("beforeend", listItemEl);
  }
  deleteHistory(historyEl) {
    const id = historyEl.id;
    this.historyContainer.removeChild(historyEl);
    History.delete(id);
    this.numberOfHistory--;

    if (this.numberOfHistory === 0) {
      this.historyContainer.innerHTML = NO_HISTORY_TEMPLATE;
    }
  }
}
