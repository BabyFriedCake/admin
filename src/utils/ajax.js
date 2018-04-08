import axios from 'axios'
axios.create({
    baseURL:'',
});
axios.interceptors.response.use(res=>{
    return res.data;
})
export default axios;