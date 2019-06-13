import decode from 'jwt-decode';
export default {
    isAuthenticated: function(){
        const token = localStorage.getItem("auth_token");
        if(token){
            return !!token && !this.isTokenExpired(token)
        }
        else{
            return false;
        }
    },
    isTokenExpired: function(token) {
        try {
            const decoded = decode(token,  {header: true });
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    },
    getProfile: function() {
        // Using jwt-decode npm package to decode the token
        return decode(localStorage.getItem("auth_token"));
    }
}