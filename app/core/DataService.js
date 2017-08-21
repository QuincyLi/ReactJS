import axiosInstance from './httpRequestInterceptor';

export async function httpCall(method, url, data) {
    try {
        let responseData = await axiosInstance({
            method: method,
            url: url,
            data: data
        });

        if(responseData.status >= 200 && responseData.status < 300){
            return await responseData.data;
        }else{
            throw responseData.statusText;
        }
    } catch (e) {
        console.log(e);
    }
}

// export async function callLogin(vm) {
//     return httpCall('post', '/login', vm);
// }