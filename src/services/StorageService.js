export default class StorageService{

    static saveClient(client){
        localStorage.setItem('client', JSON.stringify(client));
    }

    static getCurrentClient(){
        const client=localStorage.getItem('client');
        if(!client) return null;
        return JSON.parse(client);
    }

    static clear(){
        localStorage.clear();
    }

}