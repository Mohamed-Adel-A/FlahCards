import axios from 'axios';


class CardsDataService{

    getAllCards(collectionId, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`http://localhost:8000/api/collections/${collectionId}/cards/`);
    }

    createCard(collectionId, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`http://localhost:8000/api/collections/${collectionId}/cards/`, data);
    }

    updateCard(collectionId, CardId, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/api/collections/${collectionId}/cards/${CardId}/`, data);
    } 
    
    deleteCard(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://localhost:8000/api/collections/${id}/`);
    }
} 

export default new CardsDataService();