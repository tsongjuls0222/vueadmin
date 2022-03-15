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
    static async addcode(data) {
        const res = await axios.post(`${url}/addcode`, data);
        return res.data;
    }
    static async editcode(id, data) {
        const res = await axios.post(`${url}/editcode${id}`, data);
        return res.data;
    }
    static async editcode(id, data) {
        const res = await axios.post(`${url}/editcode${id}`, data);
        return res.data;
    }
    static async deletecode(data) {
        const res = await axios.post(`${url}/deletecode`, data);
        return res.data;
    }
    static async addaccount(data) {
        const res = await axios.post(`${url}/addaccount`, data);
        return res.data;
    }
    static async editaccount(data) {
        const res = await axios.post(`${url}/editaccount`, data);
        return res.data;
    }
    static async deleteaccount(data) {
        const res = await axios.post(`${url}/deleteaccount`, data);
        return res.data;
    }
    static async addagent(data) {
        const res = await axios.post(`${url}/addagent`, data);
        return res.data;
    }
    static async editagent(data) {
        const res = await axios.post(`${url}/editagent`, data);
        return res.data;
    }
    static async deleteagent(data) {
        const res = await axios.post(`${url}/deleteagent`, data);
        return res.data;
    }
    static async gettransferagentcodes() {
        const res = await axios.get(`${url}/gettransferagentcodes`);
        return res.data;
    }
    static async getmemberagentcodes() {
        const res = await axios.get(`${url}/getmemberagentcodes`);
        return res.data;
    }
    static async transferpartner(data) {
        const res = await axios.post(`${url}/transferpartner`, data);
        return res.data;
    }
    static async transfermember(data) {
        const res = await axios.post(`${url}/transfermember`, data);
        return res.data;
    }
}