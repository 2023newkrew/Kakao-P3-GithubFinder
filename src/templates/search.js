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
export const NO_REPOS_TEMPLATE = `
  <div id="repos-result" class="bs-component">
    <p class="text-center w-100 p-4 mt-4">레포지토리 정보가 없습니다.</p>
  </div>
`;
export const getReposTemplate = (repos) => {
  return `
    <div class="container px-2">
      <div class="py-2 mb-3 d-flex align-items-center justify-content-between">
        <h5 class="p-0">Latest Repos</h5>
      </div>
      <div class="row">
      ${repos
        .slice(0, 5)
        .map((repo) => repo.render())
        .join("\n")}
      </div>
    </div>
  `;
};
