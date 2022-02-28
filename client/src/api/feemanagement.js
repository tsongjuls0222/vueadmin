import axios from "axios"
const url = "http://192.168.10.219:5000/api";
export default class API {
    static async getFeelogs() {
        const res = await axios.get(`${url}/feemanagement/feelogs`);
        return res.data;
    }
    static async getFilterFeelogs(data) {
        const res = await axios.post(`${url}/feemanagement/filterfeelogs`, data);
        return res.data;
    }
    static async getSettings(id) {
        const res = await axios.get(`${url}/feemanagement/getBonus${id}`);
        return res.data;
    }
    static async getConfig(id) {
        const res = await axios.get(`${url}/feemanagement/getConfig${id}`);
        return res.data;
    }
    static async setSettings(data) {
        const res = await axios.post(`${url}/feemanagement/setBonus`, data);
        return res.data;
    }
}