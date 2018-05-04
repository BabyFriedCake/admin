import axios from 'axios'
axios.create({
    baseURL: '',
});
axios.interceptors.response.use(res => {
    return res.data;
}, error => {
    if (process.env.NODE_ENV == "development") {
        // console.log(error.response.status);
        console.log(error.response)
    }
    if(error.response.status == 508){
        sessionStorage.clear();
        window.location.href = '/';
    }
    layer.msg(error.response.data,{icon:2,time:2000,skin:'pansty'});
    return Promise.reject(error.response);
})
export default axios;