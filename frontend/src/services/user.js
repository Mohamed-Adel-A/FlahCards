import axios from 'axios';

class UserDataService{
    baseUrl = "http://localhost:8000/";


    login(data){
        console.log(data);
        delete axios.defaults.headers.common["Authorization"];
        return axios.post("http://localhost:8000/api/login/", data);
    }

    logout(token){
        console.log(token);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://localhost:8000/api/logout/", 
                        {headers: {Authorization: `Token ${token}`}});
    }

    signup(data){
        return axios.post("http://localhost:8000/api/signup/", data);
    }

}

export default new UserDataService();