const url = "http://localhost:5000/api/league";
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
    static async setrow(data) {
        const res = await axios.post(`${url}/setrow`, data);
        return res.data;
    }
    static async deleteimage(data) {
        const res = await axios.post(`${url}/deleteimage`, data);
        return res.data;
    }
    static async getleaguesorting() {
        const res = await axios.get(`${url}/getleaguesorting`);
        return res.data;
    }
    static async getleagues(data) {
        const res = await axios.post(`${url}/getleagues`, data);
        return res.data;
    }
    static async setleaguename(data) {
        const res = await axios.post(`${url}/setleaguename`, data);
        return res.data;
    }
    static async setcountryname(data) {
        const res = await axios.post(`${url}/setcountryname`, data);
        return res.data;
    }
    static async setleaguebox(data) {
        const res = await axios.post(`${url}/setleaguebox`, data);
        return res.data;
    }
    static async setcountrybox(data) {
        const res = await axios.post(`${url}/setcountrybox`, data);
        return res.data;
    }
    static async setleaguesort(data) {
        const res = await axios.post(`${url}/setleaguesort`, data);
        return res.data;
    }
    static async setcountrysort(data) {
        const res = await axios.post(`${url}/setcountrysort`, data);
        return res.data;
    }
    static async countryupload(data) {
        const res = await axios.post(`${url}/countryupload`, data);
        return res.data;
    }
    static async getliveleaguesorting() {
        const res = await axios.get(`${url}/getliveleaguesorting`);
        return res.data;
    }
}