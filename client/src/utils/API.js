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
        return axios.post('/api/profile_management/getUser', data, {headers: {
            'x-access-token': token
        }})
    },
    updateUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateUser', data, {headers: {
                'x-access-token': token
            }});
    },
    updateUserEmail: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateUserEmail', data, {headers: {
                'x-access-token': token
            }});
    },
    getShippingAddressesByUser: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getShippingAddressesByUser', data, {headers: {
                'x-access-token': token
            }});
    },
    addShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/addShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    deleteShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/deleteShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    updateShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    deleteCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/deleteCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    addCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/addCreditCard', data, {headers: {
                'x-access-token': token
            }});
    }
    // TODO(justin): Add the rest of the mongoDB queries.
};
