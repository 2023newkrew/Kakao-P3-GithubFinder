import { http } from './index';

export async function fetchUserInfo(userID) {
    return http.get(`/users/${userID}`);
}