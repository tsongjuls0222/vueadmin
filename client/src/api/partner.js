const url = "http:/192.168.10.50/api/partner";
import axios from "axios";

export default class API {
    static async refresh() {
        const res = await axios.get(`${url}/getpartnertree`);
        return res.data;
    }
}