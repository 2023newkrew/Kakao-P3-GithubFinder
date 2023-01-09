import { fetchUserInfo } from "./services/user";
fetchUserInfo('lhsljh123')
.then(response => {
    console.log(response)
});
