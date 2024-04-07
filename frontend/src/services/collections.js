import axios from 'axios';


class CollectionsDataService{

    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('http://localhost:8000/api/collections/');
    }

    createCollection(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://localhost:8000/api/collections/", data);
    }

    updateCollection(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/api/collections/${id}/`, data);
    } 
    
    deleteCollection(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://localhost:8000/api/collections/${id}/`);
    }
} 

export default new CollectionsDataService();