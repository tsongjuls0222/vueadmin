import axios from "axios"
const url = "http://192.168.10.50:5000/api";
export default class API {
    static async getOTP() {
        const res = await axios.get(`${url}/otp/getotp`);
        return res.data;
    }
}