import SearchController from "@controllers/searchController";

const onLoadScript = () => {
  const searchInputEl = document.body.querySelector("#search-input");
  const searchSubmitButton = document.body.querySelector("#search-button");
  new SearchController(searchInputEl, searchSubmitButton);
};
onLoadScript();
