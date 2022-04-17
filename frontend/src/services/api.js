import axios from 'axios';

//a api é para chamadas em que não precisa do token: login
const api = axios.create({
    baseURL:"http://localhost:3333/"
})

// a authApi é uma outra instância da api para utilizar
// em chamadas em que é necessário de token

const authApi = axios.create({
    baseURL:"http://localhost:3333/"
})

authApi.interceptors.request.use(req=>{
    const token = localStorage.getItem('user');
    //insere o token no headers automaticamente
    req.headers['authorization'] = token;

    return req;
})

export { api,authApi };