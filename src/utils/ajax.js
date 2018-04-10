import axios from 'axios'
axios.create({
    baseURL: '',
});
axios.interceptors.response.use(res => {
    return res.data;
}, error => {
    if (process.env.NODE_ENV == "development") {
        console.log(error.response)
    }
    return Promise.reject(error.response);
})
export default axios;