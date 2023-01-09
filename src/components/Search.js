import Component from "@/core/Component";

export default class Search extends Component {
  template() {
    return `
      <div>깃허브 유저 검색</div>
      <div>저장소와 유저 프로필을 가져오기 위해 username을 검색해주세요.</div>
      <input class="search__input" />
    `;
  }
}
