import axios from "axios";
import store from "./StorageService";
import router from "../router";

axios.interceptors.request.use((config)=>{
  const token=store.getCurrentClient()? store.getCurrentClient().token:null;
  if(token) config.headers.Authorization= `Bearer ${token}`;
  return config;},(err)=> Promise.reject(err));

axios.interceptors.response.use((res)=>res
,(err)=>{
  if(err.response.status == 401){
    store.clear();
    router.push("/login");
  }
  return Promise.reject(err)
});

export default class ApiService {
  static apiUrl = import.meta.env.VITE_API_URL;

  static async getClientInfo() {
    useFetch
    return axios.get(`${this.apiUrl}/clients/current`);
  }

  static async getClient(id){
    return axios.get(`${this.apiUrl}/clients/${id}`);
  }

  static async getClients() {
    return axios.get(`${this.apiUrl}/clients`);
  }

  static async getAccount(id){
    return axios.get(`${this.apiUrl}/accounts/${id}`);
  }

  static async createAccount(){
    return axios.post(`${this.apiUrl}/clients/current/accounts`);
  }

  static async createCard(card){
    return axios.post(`${this.apiUrl}/clients/current/cards`,card);
  }

  static async makeTransaction(transaction){
    return axios.post(`${this.apiUrl}/transaction`,transaction);
  }

  static async login(email, password) {
    return axios.post(
      `${this.apiUrl}/clients/login`,{email:email,password:password}
    );
  }

  static async register(client){
    return axios.post(`${this.apiUrl}/clients`,client);
  }

  static async removeClient(id){
    return axios.delete(`${this.apiUrl}/clients/${id}`);
  }

  static async editClient(id, client){
    return axios.put(`${this.apiUrl}/clients/${id}`,client);
  }

  static async verify(code){
    return axios.post(`${this.apiUrl}/clients/${code}/verify`);
  }


}
