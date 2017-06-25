/**
 * Created by Babatunde Otaru <otarubabatunde@gmail.com>
 * Save all api responses within your app here
 */
module.exports = {
    registrationSuccessful: function (token) {
        return {
            status: 200,
            success: true,
            message: "Registration Succesful",
            token: token
        }
    },
    registrationFailed: {
        status: 400,
        success: false,
        message: "Registration Failed"
    },

    userExists: {
        status: 400,
        success: false,
        message: "User Already Exists"
    },

    loginSuccessful: function (token) {
        return {
            status: 200,
            success: true,
            message: "Login Successful",
            token: token
        }
    },

    wrongLoginDetails: {
        status: 400,
        success: false,
        message: "Wrong Login Details"
    },

    accessDenied: {
        status: 400,
        success: false,
        message: "Access Denied"
    },

    tokenAuthenticateFailure: {
        status: 400,
        success: false,
        message: "Failed to Authenticate token"
    },

    noTokenProvided: {
        status: 400,
        success: false,
        message: "No Token Provided"
    },

    orderRemovedSuccessfully: {
        status: 200,
        success: true,
        message: "Order Removed Successfully"
    }
};

