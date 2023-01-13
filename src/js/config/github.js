// eslint-disable-next-line import/prefer-default-export
export const githubApiHeaders = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
};
