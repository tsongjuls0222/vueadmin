import axios from "axios"
const url = "http://192.168.10.50:5000/api";
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
    static async getBurstConfig(id) {
        const res = await axios.get(`${url}/feemanagement/getBurstConfig${id}`);
        return res.data;
    }
    static async setBurstConfig(data) {
        const res = await axios.put(`${url}/feemanagement/setBurstConfig`, data);
        return res.data;
    }
    static async setSettings(data) {
        const res = await axios.put(`${url}/feemanagement/setBonus`, data);
        return res.data;
    }
    // static async setBurstSettings(data) {
    //     const res = await axios.put(`${url}/feemanagement/setBurst`, data);
    //     return res.data;
    // }
    static async setConfig(data) {
        const res = await axios.put(`${url}/feemanagement/setConfig`, data);
        return res.data;
    }
    static async getDailyMax() {
        const res = await axios.get(`${url}/feemanagement/dailymax`);
        return res.data;
    }
    static async setDailyMax(data) {
        const res = await axios.put(`${url}/feemanagement/setdailymax`, data);
        return res.data;
    }
}