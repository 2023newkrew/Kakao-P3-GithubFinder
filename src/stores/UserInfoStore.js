import Store from "@core/Store";
import { get } from "@utils/api";

class UserInfoStore extends Store {
  setIsLoading(isLoading) {
    this.setState({ ...this.state, isLoading });
  }

  async fetchUserInfo(username) {
    try {
      const userProfile = await get(`/users/${username}`);
      const repositories = await get(`/users/${username}/repos`, {
        sort: "updated",
        per_page: "5",
      });

      this.setState({ ...this.state, isLoading: false, userProfile, repositories });
    } catch (error) {
      this.setState({ ...this.state, isLoading: false });

      throw error;
    }
  }
}

export default new UserInfoStore({ isLoading: false, userProfile: {}, repositories: [] });
