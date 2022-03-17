const url = "http://192.168.10.50:5000/api/league";
import axios from "axios";

export default class API {
    static async getevent() {
        const res = await axios.get(`${url}/getevent`);
        return res.data;
    }
    static async getnation() {
        const res = await axios.get(`${url}/getnation`);
        return res.data;
    }
    static async getnations(id) {
        const res = await axios.get(`${url}/getnations${id}`);
        return res.data;
    }
    static async getlist(data) {
        const res = await axios.post(`${url}/getlist`, data);
        return res.data;
    }
}