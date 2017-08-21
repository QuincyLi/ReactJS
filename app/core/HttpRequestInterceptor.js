import axios from 'axios';
import $ from 'jquery';
//import promise from 'promise';

// Add a request interceptor 
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function(config) {
    // Do something before request is sent 
    //If the header does not contain the token and the url not public, redirect to login  
    var accessToken = $('input[name="_csrf"]').val();

    //if token is found add it to the header
    if (accessToken) {
        if (config.method !== 'OPTIONS') {
            config.headers['csrf-token'] = accessToken;
        }
    }
    return config;
}, function(error) {
    // Do something with request error 
    //return promise.reject(error);
});

export default axiosInstance;