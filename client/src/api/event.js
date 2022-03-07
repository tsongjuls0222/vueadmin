import axios from "axios";
const url = "http://192.168.10.50:5000/api";

export default class API {
    static async getpopup() {
        const res = await axios.get(`${url}/event/getpopup`);
        return res.data;
    }
    static async setpopupstatus(data) {
        const res = await axios.post(`${url}/event/setpopupstatus`, data);
        return res.data;
        // return 'kwekwek';
    }
}