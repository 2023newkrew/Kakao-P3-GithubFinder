import Store from "@core/Store";
import { get } from "@utils/api";
import { filterExistingKeys } from "@utils/object";
import NoAvatar from "@assets/no-avatar.svg";

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

      this.setState({
        ...this.state,
        isLoading: false,
        userProfile: filterExistingKeys(this.state.userProfile, userProfile),
        repositories,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        isLoading: false,
      });

      throw error;
    }
  }
}

export default new UserInfoStore({
  isLoading: false,
  userProfile: {
    avatar_url: NoAvatar,
    html_url: "",
    public_repos: "-",
    public_gists: "-",
    followers: "-",
    following: "-",
    company: "-",
    blog: "-",
    location: "-",
    created_at: "-",
  },
  repositories: [],
});
