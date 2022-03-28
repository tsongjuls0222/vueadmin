import axios from "axios";
const url = "http://localhost:5000/api";

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
    static async findnotice(id) {
        const res = await axios.get(`${url}/event/findnotice${id}`);
        return res.data;
    }
    static async addnotice(data) {
        const res = await axios.post(`${url}/event/addnotice`, data);
        return res.data;
    }
    static async editnotice(id, data) {
        const res = await axios.post(`${url}/event/editnotice${id}`, data);
        return res.data;
    }
    static async deletenotice(id) {
        const res = await axios.delete(`${url}/event/deletenotice${id}`);
        return res.data;
    }
    static async setnoticestatus(data) {
        const res = await axios.post(`${url}/event/setnoticestatus`, data);
        return res.data;
        // return 'kwekwek';
    }
    static async savesorting(data) {
        const res = await axios.post(`${url}/event/savesorting`, data);
        return res.data;
        // return 'kwekwek';
    }

    //board list
    static async getboard() {
        const res = await axios.get(`${url}/event/getboard`);
        return res.data;
    }
    static async findboard(id) {
        const res = await axios.get(`${url}/event/findboard${id}`);
        return res.data;
    }
    static async addboard(data) {
        const res = await axios.post(`${url}/event/addboard`, data);
        return res.data;
    }
    static async editboard(id, data) {
        const res = await axios.post(`${url}/event/editboard${id}`, data);
        return res.data;
    }
    static async deleteboard(id) {
        const res = await axios.delete(`${url}/event/deleteboard${id}`);
        return res.data;
    }
    static async setboardstatus(data) {
        const res = await axios.post(`${url}/event/setboardstatus`, data);
        return res.data;
        // return 'kwekwek';
    }

    // attendance
    static async getrewards() {
        const res = await axios.get(`${url}/event/getrewards`);
        return res.data;
    }
    static async saverewards(data) {
        const res = await axios.post(`${url}/event/saverewards`, data);
        return res.data;
    }
}