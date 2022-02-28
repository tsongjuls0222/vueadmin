import axios from "axios"
const url = "http://192.168.10.219:5000/api/login";
export default class API {
    //get user
    static async getLoginWithToken(post) {
        const res = await axios.post(url, post);
        return res.data;
    }
}