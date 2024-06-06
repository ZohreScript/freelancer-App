import http from "./Httpservices";


export function getOTP(data){
    return http.post("/user/get-otp", data).then(({data})=>data.data);
}

export function checkOTP(data){
    return http.post("/user/check-otp", data).then(({data})=>data.data);
}
export function completeProfile(data){
    return http.post("/user/complete-profile", data).then(({data})=>data.data);
}

export function getUser( ){
    return http.get("/user/profile").then(({data})=>data.data);
}

export function logoutApi(){
    return http.post("/user/logout", data).then(({data})=>data.data);
}