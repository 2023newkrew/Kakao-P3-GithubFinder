import { SPINNER_TEMPLATE } from "@templates/spinner";

export const NO_SEARCH_RESULT_TEMPLATE = `<p class="text-center container-fluid">검색 결과가 없습니다.</p>`;
export const SEARCH_LOADING_TEMPLATE = `
<div class="card my-3">
  <h4 class="card-header">검색결과</h4>
  <div id="user-result" class="card-body d-flex flex-column">
    ${SPINNER_TEMPLATE}
  </div>
</div>
`;

export const getReposTemplate = (repos) => `
<div class="container px-2">
  <h5 class="p-0 mb-3">Latest Repos</h5>
  <div class="row">
    ${repos
      .slice(0, 5)
      .map((repo) => repo.render())
      .join("\n")}
  </div>
</div>
`;
