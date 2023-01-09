import axios from "axios";

const instance = axios.create({
    baseURL: GITHUB_BASEURL,
    headers: {
        "Accept": "application/vnd.github+json"
    }
})

export const http = {
    get: function get(url) {
        return instance.get(url).then(res => res.data);
    },
    post: function post(url, data) {
        return instance.post(url, data).then(res => res.data);
    }
};