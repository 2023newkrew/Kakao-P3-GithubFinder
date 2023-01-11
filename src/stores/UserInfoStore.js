import Store from "@core/Store";
import { get } from "@utils/api";

class UserInfoStore extends Store {
  async fetchUserInfo(username) {
    const userProfile = await get(`/users/${username}`);
    const repositories = await get(`/users/${username}/repos`, { sort: "updated", per_page: "5" });

    this.setState({ ...userProfile, repositories });
  }
}

export default new UserInfoStore();
