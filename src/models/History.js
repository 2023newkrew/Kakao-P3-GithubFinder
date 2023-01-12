import { nanoid } from "nanoid";
import { getItem, setItem } from "@utils/localStorage";
import { HISTORY_STORAGE_KEY } from "@constants/history";

export default class History {
  constructor() {}
  static add(searchValue) {
    const history = History.getAll();

    const alreadyExists = history.find(({ value }) => value === searchValue);
    if (alreadyExists) {
      return null;
    }

    const id = nanoid();
    const newHistoryItem = { value: searchValue, id };
    history.push(newHistoryItem);
    setItem(HISTORY_STORAGE_KEY, history);

    return id;
  }
  static delete(toDeleteId) {
    const history = History.getAll();
    const newHistory = history.filter(({ id }) => id !== toDeleteId);
    setItem(HISTORY_STORAGE_KEY, newHistory);
  }
  static getAll() {
    return getItem(HISTORY_STORAGE_KEY) || [];
  }
}
