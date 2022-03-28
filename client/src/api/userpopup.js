import axios from "axios"
const url = "http://localhost:5000/api/userpopup";
export default class API {
    //get user
    static async getDepositData(id) {
        const res = await axios.get(`${url}/depositdata/${id}`);
        return res.data;
    }
    static async getMoneylogData(id) {
        const res = await axios.get(`${url}/moneylogdata/${id}`);
        return res.data;
    }
    static async getBetlogData1st(id) {
        const res = await axios.get(`${url}/betlogdata1st/${id}`);
        return res.data;
    }
    static async getPointlogData(id) {
        const res = await axios.get(`${url}/pointlogdata/${id}`);
        return res.data;
    }
    static async getUserInformation(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    static async updateSurveillanceStatus(data) {
        const res = await axios.post(`${url}/updateundersurveillancestatus`, data)
        return res.data;
    }
    static async refreshBalanceAndPoint(id) {
        const res = await axios.get(`${url}/refreshbalanceandpoint/${id}`)
        return res.data;
    }
    static async refreshCasino(id) {
        const res = await axios.get(`${url}/refreshcasino/${id}`)
        return res.data;
    }
    static async refreshSlot(id) {
        const res = await axios.get(`${url}/refreshslot/${id}`)
        return res.data;
    }
    static async getRecommender(id) {
        const res = await axios.get(`${url}/recommender/${id}`)
        return res.data;
    }
    static async getBankList() {
        const res = await axios.get(`${url}/bank/list`)
        return res.data;
    }
    static async getCodeName(id) {
        const res = await axios.get(`${url}/codename/${id}`)
        return res.data;
    }
    static async getUserBetInfo(id) {
        const res = await axios.get(`${url}/userbetinfo/${id}`)
        return res.data;
    }
    static async checkRecommender(rec) {
        const res = await axios.get(`${url}/checkrecommender/${rec}`)
        return res.data;
    }
    static async checkPartner(code) {
        const res = await axios.get(`${url}/checkcode/${code}`)
        return res.data;
    }
    static async updateUserInformation(data) {
        const res = await axios.put(`${url}/updateuserinformation`, data)
        return res.data;
    }
    static async updateBalance(data) {
        const res = await axios.put(`${url}/updatebalance`, data)
        return res.data;
    }
    static async addTransaction(data) {
        const res = await axios.post(`${url}/addtransaction`, data)
        return res.data;
    }
}