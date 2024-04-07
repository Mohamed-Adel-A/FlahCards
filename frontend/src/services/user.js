import axios from 'axios';

class UserDataService{
    baseUrl = "http://localhost:8000/";


    login(data){
        delete axios.defaults.headers.common["Authorization"];
        return axios.post("http://localhost:8000/api/login/", data);
    }

    logout(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://localhost:8000/api/logout/", 
                        {headers: {Authorization: `Token ${token}`}});
    }

    signup(data){
        delete axios.defaults.headers.common["Authorization"];
        return axios.post("http://localhost:8000/api/signup/", data);
    }

}

export default new UserDataService();