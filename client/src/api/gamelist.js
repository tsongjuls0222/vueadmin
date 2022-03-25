import axios from "axios"
const url = "http://192.168.10.50:5000/api/gamelist";
export default class API {
    //get user
    static async getminigamelist() {
        const res = await axios.get(`${url}/getminigamelist`);
        return res.data;
    }
    static async getmaintenance() {
        const res = await axios.get(`${url}/getmaintenance`);
        return res.data;
    }
    static async addminigame(data) {
        const res = await axios.post(`${url}/addminigame`, data);
        return res.data;
    }
    static async saveminigame(data) {
        const res = await axios.post(`${url}/saveminigame`, data);
        return res.data;
    }
    static async deletesubgame(data) {
        const res = await axios.post(`${url}/deletesubgame`, data);
        return res.data;
    }
    static async deleteminigame(id) {
        const res = await axios.delete(`${url}/deleteminigame${id}`);
        return res.data;
    }
    static async forceLogout(data) {
        const res = await axios.post(`http://192.168.10.50:5000/api/memberList/forceLogout`, data);
        return res.data;
    }
}