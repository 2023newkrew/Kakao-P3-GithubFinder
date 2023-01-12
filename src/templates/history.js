export const getHistoryItemTemplate = (
  content,
  id
) => `<li id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
  ${content}
  <button type="button" class="button__delete bg-none border-none">
    X
  </button>
</li>`;

export const NO_HISTORY_TEMPLATE =
  '<p class="text-center">검색 기록이 없습니다.</p>';
