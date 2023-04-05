import ApiService from "./ApiService";
import StorageService from "./StorageService";
import router from "../router";

export default class AuthService {

  static async login(email, password) {
    try {
      const result=(await ApiService.login(email, password)).data.data;
      StorageService.saveClient(result);
      router.push("/home");
    } catch (error) {
      throw new Error(error);
    }
  }

  static async logout() {
    StorageService.clear();
    router.push("/login");
  }

}
