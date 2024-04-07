import axios from 'axios';

class UserDataService{
    baseUrl = "http://localhost:8000/";


    login(data){
        return axios.post("http://localhost:8000/api/login/", data);
    }

    logout(data){
        return axios.post("http://localhost:8000/api/logout/", data);
    }

    signup(data){
        return axios.post("http://localhost:8000/api/signup/", data);
    }

}

export default new UserDataService();