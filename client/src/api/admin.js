import axios from "axios"
const url = "http://192.168.10.219:5000/api";
export default class API {
    //get user
    static async getRadioButtonData() {
        const res = await axios.get(`${url}/admin`);
        return res.data;
    }
    static async getTableData() {
        const res = await axios.get(`${url}/admin/data`);
        return res.data;
    }
    static async getSelectAgent() {
        const res = await axios.get(`${url}/admin/agents`);
        return res.data;
    }
    static async getSelectCode() {
        const res = await axios.get(`${url}/admin/codes`);
        return res.data;
    }
    static async transactType1(data) {
        const res = await axios.post(`${url}/admin/transactiontone`, data);
        return res.data;
    }
    static async transactType2(data) {
        const res = await axios.post(`${url}/admin/transactionttwo`, data);
        return res.data;
    }
    static async transactType3(data) {
        const res = await axios.post(`${url}/admin/transactiontthree`, data);
        return res.data;
    }
    static async getMacroSelection() {
        const res = await axios.get(`${url}/admin/macro`);
        return res.data;
    }
    static async getMacroSelectionContent(id) {
        const res = await axios.get(`${url}/admin/macro/${id}`);
        return res.data;
    }
    static async getMacroGroup() {
        const res = await axios.get(`${url}/admin/macrogroup`);
        return res.data;
    }
    static async CodeByAgent(data) {
        const res = await axios.get(`${url}/admin/cagent/${data}`);
        return res.data;
    }
    static async AgentByCode(data) {
        const res = await axios.get(`${url}/admin/acode/${data}`);
        return res.data;
    }
    static async filterTransaction(data) {
        const res = await axios.post(`${url}/admin/search`, data);
        return res.data;
    }
    static async filterRadioData(data) {
        const res = await axios.post(`${url}/admin/search/radio`, data);
        return res.data;
    }
}