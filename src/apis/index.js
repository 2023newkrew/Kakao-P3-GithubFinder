/* eslint-disable max-len */
const ACCESS_TOKEN = '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';
const headers = {'Authorization': `Bearer ${ACCESS_TOKEN}`};

const fetchUser = (username) => fetch(`https://api.github.com/users/${username}`, {headers});
const fetchUserRepositories = (username) => fetch(`https://api.github.com/users/${username}/repos`, {headers});

const requestUserInfo = (username) => {
  const userPromise = fetchUser(username);
  const repositoriesPromise = fetchUserRepositories(username);

  return Promise.all([userPromise, repositoriesPromise])
      .then((results) => Promise.all(results.map((res) => res.ok ? Promise.resolve(res) : Promise.reject(new Error('HTTP 응답 상태가 성공적이지 않습니다.')))))
      .then((results) => Promise.all(results.map((res) => res.json())));
};

export {requestUserInfo};
