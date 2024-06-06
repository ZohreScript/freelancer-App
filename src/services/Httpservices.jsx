import axios from "axios";

// Define BASE_URL
const BASE_URL = "http://localhost:5000/api";

// Create an Axios instance
const app = axios.create({
    baseURL: BASE_URL, // Correct key
    withCredentials: true, // httponly cookies
});
 
//requset,response=>rror

app.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
);
//err=>response=>status===401=>proccess=>?!
//add project,get user,...=>get 401 error
app.interceptors.response.use(
    (res) => res,
    async (err) => {
        console.log(err.config)
        const originalConfig = err.config;
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const { data } = await axios.get(`${BASE_URL}/user/refresh-token`, {
                    withCredentials: true
                })
                if (data) return app(originalConfig)
            } catch (error) {
                return Promis.reject(error)
            }
            return Promise.reject(err);
        } 
        return Promise.reject(err);
} 
);

const http = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
}

export default http;