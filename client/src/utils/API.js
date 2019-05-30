import axios from "axios";

export default {
    // Gets all Campaign names
    login: function (data) {
        return axios.post('/api/auth', data);
    },
    createAccount: function(data){
        return axios.post('/api/auth/create', data)
    },
    getUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/user/getUser', data, {headers: {
            'x-access-token': token
        }})
    }
};
