const url = "http://localhost:5000/api/partner";
import axios from "axios";

export default class API {
    static async refresh() {
        const res = await axios.get(`${url}/getpartnertree`);
        return res;
    }
    static async refreshs() {
        const res = await axios.get(`${url}/getpartnertrees`);
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
    static async findingcode(id) {
        const res = await axios.get(`${url}/findingcode${id}`);
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
    static async transferbalance(data) {
        const res = await axios.post(`${url}/transferbalance`, data);
        return res.data;
    }
    static async transferlogs(id) {
        const res = await axios.get(`${url}/transferlogs${id}`);
        return res.data;
    }
    static async getinfosportsconfig() {
        const res = await axios.get(`${url}/getinfosportsconfig`);
        return res.data;
    }
    static async updateinfosportsconfig(data) {
        const res = await axios.post(`${url}/updateinfosportsconfig`, data);
        return res.data;
    }
    static async getbanklist() {
        const res = await axios.get(`${url}/getbanklist`);
        return res.data;
    }
    static async addbank(data) {
        const res = await axios.post(`${url}/addbank`, data);
        return res.data;
    }
    static async findbank(id) {
        const res = await axios.get(`${url}/findbank${id}`);
        return res.data;
    }
    static async editbank(id, data) {
        const res = await axios.post(`${url}/editbank${id}`, data);
        return res.data;
    }
    static async deletebank(id) {
        const res = await axios.delete(`${url}/deletebank${id}`);
        return res.data;
    }
    static async bankstatus(data) {
        const res = await axios.post(`${url}/bankstatus`, data);
        return res.data;
    }
    static async getconfiglevel() {
        const res = await axios.get(`${url}/getconfiglevel`);
        return res.data;
    }
    static async updateconfiglevel(data) {
        const res = await axios.post(`${url}/updateconfiglevel`, data);
        return res.data;
    }
    static async getmaintenance() {
        const res = await axios.get(`${url}/getmaintenance`);
        return res.data;
    }
    static async setpages(data) {
        const res = await axios.post(`${url}/setpages`, data);
        return res.data;
    }
}