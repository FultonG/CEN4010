import axios from "axios";

export default {
    // Gets all Campaign names
    login: function (data) {
        return axios.post('/api/auth', data);
    },
    createAccount: function(data){
        return axios.post('/api/auth/create', data)
    },
    // user.js
    getUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getUser', data, {headers: {
            'x-access-token': token
        }})
    },
    updateUserEmail: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateUserEmail', data, {headers: {
                'x-access-token': token
            }});
    },
    updateUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateUser', data, {headers: {
                'x-access-token': token
            }});
    },
    getCreditCardsByUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getCreditCardsByUser', data, {headers: {
                'x-access-token': token
            }});
    },
    addCreditCard: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/addCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    removeCreditCard: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/removeCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    updateCreditCard: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateCreditCard', data, {headers: {
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
    removeShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/removeShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    updateShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    }
    /*,
    //books.js
    getAllBooks: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getAllBooks', data, {headers: {
                'x-access-token': token
            }});
    },
    getBook: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getBook', data, {headers: {
                'x-access-token': token
            }});
    },
    createBook: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/createBook', data, {headers: {
                'x-access-token': token
            }});
    },
    updateBook: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateBook', data, {headers: {
                'x-access-token': token
            }});
    },
    deleteBook: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/deleteBook', data, {headers: {
                'x-access-token': token
            }});
    }
    */
};
