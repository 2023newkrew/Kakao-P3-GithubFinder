class User {
  constructor(username) {
    this.username = username;
    userData = null;
    fetchUserData();
  }

  fetchUserData() {
    const response = async () => {
      return await (await fetch(`https://api.github.com/users/${this.username}`)).json();
    };
  }
}
