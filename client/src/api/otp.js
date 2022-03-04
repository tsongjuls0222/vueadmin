import axios from "axios"
const url = "http://192.168.10.50:5000/api";
export default class API {
    static async getOTP(data) {
        const res = await axios.post(`${url}/otp/getotp`, data);
        return res.data;
    }
    static async getCasino(data) {
        const res = await axios.post(`${url}/otp/getcasino`, data);
        return res.data;
    }
}