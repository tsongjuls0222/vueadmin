import axios from "axios";
const url = "http://192.168.10.50:5000/api";

export default class API {
    //add popup
    static async getpopup() {
        const res = await axios.get(`${url}/event/getpopup`);
        return res.data;
    }
    static async setpopupstatus(data) {
        const res = await axios.post(`${url}/event/setpopupstatus`, data);
        return res.data;
        // return 'kwekwek';
    }
    static async addpopup(data) {
        const res = await axios.post(`${url}/event/addpopup`, data);
        return res.data;
    }
    static async findpopup(id) {
        const res = await axios.get(`${url}/event/findpopup${id}`);
        return res.data;
    }
    static async editpopup(id, data) {
        const res = await axios.post(`${url}/event/editpopup${id}`, data);
        return res.data;
    }
    static async deletepopup(id) {
        const res = await axios.delete(`${url}/event/deletepopup${id}`);
        return res.data;
    }

    //notice list
    static async getnotice() {
        const res = await axios.get(`${url}/event/getnotice`);
        return res.data;
    }
}