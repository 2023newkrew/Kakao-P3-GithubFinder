import { http } from './index';

export async function fetchUserInfo(userID) {
    return http.get(`/users/${userID}`);
}
export async function fetchUserRepos(userID) {
    return http.get(`/users/${userID}/repos`);
}