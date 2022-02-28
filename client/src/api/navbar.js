import axios from "axios"
const url = "http://192.168.10.219:5000/api";
export default class API {
    //get user
    static async getTopInfo() {
        const res = await axios.get(`${url}/navbar/moneycount`);
        return res.data;
    }
    static async getMoneyCountData(type) {
        const res = await axios.post(`${url}/navbar/moneycount/popupdata`, type);
        return res.data;
    }
    static async getMoneyCountDataTotal(type) {
        const res = await axios.post(`${url}/navbar/moneycount/popuptotal`, type);
        return res.data;
    }
    static async getNotoriousCount() {
        const res = await axios.get(`${url}/navbar/notorious/count`);
        return res.data;
    }
    static async getNotoriousData() {
        const res = await axios.get(`${url}/navbar/notorious/data`);
        return res.data;
    }
}