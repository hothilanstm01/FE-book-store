import axiosClient from "./axiosCilent";
import axiosClientAuth from "./axiosClientAuth";


const userApi={

    GetCata(){
        const url = '/catalogs';
        const res = axiosClient.get(url)
        .then(res=>{
            return res.data;
        })
        return res
    },
    GetUserById (id){
        const url = `/users/${id}`;
        const res = axiosClient.get(url)
        .then(res=>{
            return res.data;
        })
        return res;
    },
    Register(data){
        const url = '/users/register';
        return axiosClient.post(url , data)
    },
    Login(data){
        const url = '/users/login';
        return axiosClient.post(url , data)
    },
    DelCata(id){
        const url = `/catalogs/del/${id}`;
        return axiosClientAuth.delete(url)
    },
};

export default userApi; 