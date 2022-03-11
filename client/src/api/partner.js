const url = "http://192.168.10.50:5000/api/partner";
import axios from "axios";

export default class API {
    static async refresh() {
        const res = await axios.get(`${url}/getpartnertree`);
        return res;
    }
    static async getpartnerinfo(id) {
        const res = await axios.get(`${url}/getpartnerinfo${id}`);
        return res.data;
    }
}