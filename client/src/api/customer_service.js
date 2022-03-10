import axios from "axios";
const url = "http://192.168.10.50:5000/api/cs";

export default class API {
    //group
    static async getgroup() {
        const res = await axios.get(`${url}/getgroup`);
        return res.data;
    }
    static async findgroup(id) {
        const res = await axios.get(`${url}/findgroup${id}`);
        return res.data;
    }
    static async addgroup(data) {
        const res = await axios.post(`${url}/addgroup`, data);
        return res.data;
    }
    static async editgroup(data) {
        const res = await axios.post(`${url}/editgroup`, data);
        return res.data;
    }
    static async savestatus(data) {
        const res = await axios.post(`${url}/savestatus`, data);
        return res.data;
    }
    static async deletegroup(id) {
        const res = await axios.delete(`${url}/deletegroup${id}`);
        return res.data;
    }
    static async savesortgroup(data) {
        const res = await axios.post(`${url}/savesortgroup`, data);
        return res.data;
    }

    //list
    static async getlist(data) {
        const res = await axios.post(`${url}/getlist`, data);
        return res.data;
    }
    static async findlist(id) {
        const res = await axios.get(`${url}/findlist${id}`);
        return res.data;
    }
    static async addlist(data) {
        const res = await axios.post(`${url}/addlist`, data);
        return res.data;
    }
    static async editlist(data) {
        const res = await axios.post(`${url}/editlist`, data);
        return res.data;
    }
    static async savelist(data) {
        const res = await axios.post(`${url}/savelist`, data);
        return res.data;
    }
    static async deletelist(id) {
        const res = await axios.delete(`${url}/deletelist${id}`);
        return res.data;
    }
    static async savesortlist(data) {
        const res = await axios.post(`${url}/savesortlist`, data);
        return res.data;
    }

    //forms
    static async getforms(data) {
        const res = await axios.post(`${url}/getforms`, data);
        return res.data;
    }
    static async addforms(data) {
        const res = await axios.post(`${url}/addforms`, data);
        return res.data;
    }
    static async getformsid(id) {
        const res = await axios.get(`${url}/getformsid${id}`);
        return res.data;
    }
    static async editforms(data) {
        const res = await axios.post(`${url}/editforms`, data);
        return res.data;
    }
}