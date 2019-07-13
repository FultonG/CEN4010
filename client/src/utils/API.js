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
    removeCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/removeCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    addCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/addCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    getCreditCardsByUser: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/getCreditCardsByUser', data, {headers: {
                'x-access-token': token
            }});
    },
    updateCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profile_management/updateCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    createBook: function (data) {
        return axios.post('/api/book/createBook', data);
    },
    deleteBook: function (data) {
        return axios.post('/api/book/deleteBook', data);
    },
    getBookByAuthor: function (data) {
        return axios.post('/api/book/getBookByAuthor', data);
    },
    updateBook: function (data) {
        return axios.post('/api/book/updateBook', data);
    },
    getBooksByPage: function (data) {
        return axios.post('/api/book/getBooksByPage', data);
    },
    getWishLists: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/wishlist', data, {headers: {
            'x-access-token': token
        }});
    },
    getBook: function (id) {
        return axios.post('/api/book/getBook', id);
    },
    updateBookAverageRating: function (id) {
        return axios.post('/api/book/updateBookAverageRating', id);
    },
    addPurchase: function (userEmail, bookId, quantity) {
        return axios.post('/api/purchase/addPurchase', {user_email: userEmail, book_id: bookId, quantity: quantity});
    },
    getPurchase: function (userEmail, bookId) {
        return axios.post('/api/purchase/getPurchase', {user_email: userEmail, book_id: bookId});
    },
    getPurchases: function (userEmail, bookId) {
        return axios.post('/api/purchase/getPurchases', {user_email: userEmail, book_id: bookId});
    },
    updateRating: function (userEmail, bookId, rating) {
        return axios.post('/api/purchase/updatePurchase', 
                          {
            primaryKeys: {"user_email": userEmail, "book_id": bookId}, 
            updates: {$set: {"rating": rating}}
                          });
    },
    updateComment: function (userEmail, bookId, comment) {
        return axios.post('/api/purchase/updatePurchase', 
                          {
            primaryKeys: {"user_email": userEmail, "book_id": bookId}, 
            updates: {$set: {"comment": comment}}
                          });
    },
   updateNickname: function (userEmail, bookId, nickname) {
        return axios.post('/api/purchase/updatePurchase', 
                          {
            primaryKeys: {"user_email": userEmail, "book_id": bookId}, 
            updates: {$set: {"nickname": nickname}}
                          });
    },
   updateQuantity: function (userEmail, bookId, quantity) {
        return axios.post('/api/purchase/updatePurchase', 
                          {
            primaryKeys: {"user_email": userEmail, "book_id": bookId}, 
            updates: {$set: {"quantity": quantity}}
                          });
    },
    addToCart: function (userEmail, bookId, quantity) {
          return axios.post('/api/cart/addToCart', {user_email: userEmail, book_id: bookId, quantity: quantity});
    },
    updateCartBookQuantity: function (userEmail, bookId, quantity) {
                return axios.post('/api/cart/updateCart',
                          {
            primaryKeys: {"user_email": userEmail, "book_id": bookId}, 
            updates: {$set: {"quantity": quantity}}
                          });
    },
    removeFromCart: function (userEmail, bookId) {
        return axios.post('/api/cart/removeFromCart', {user_email: userEmail, book_id: bookId});
    },
    getCartForUser: function (userEmail) {
        return axios.post('/api/cart/getCartForUser', userEmail);
    }
};
