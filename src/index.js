import "@styles/general.scss";

import SearchController from "@controllers/searchController";
import HistoryController from "@controllers/historyController";

const onLoadScript = () => {
  const searchInputEl = document.body.querySelector("#search-input");
  const searchSubmitButton = document.body.querySelector("#search-button");
  const historyController = new HistoryController(
    document.body.querySelector("#search-history ul.list-group")
  );

  new SearchController(searchInputEl, searchSubmitButton, historyController);
};
onLoadScript();
