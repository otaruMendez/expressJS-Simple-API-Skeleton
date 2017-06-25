/**
 * Created by Babatunde Otaru <otarubabatunde@gmail.com>
 * Keep all your generic functions to be used accross your app here
 */
module.exports = {
    getToken: function getToken(req) {
        return req.body.token || req.query.token || req.headers['x-access-token'];
    },

    inArray: function (element, array) {
        for (var i = 0; i < array.length; i++)
            if (element === array[i]) return true;
        return false;
    },
};