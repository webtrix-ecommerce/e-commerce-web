
import axios from "axios";
const baseUrls = 'http://13.127.52.182/pandiyanstores';
// const baseUrls =  "http://localhost:8899"

export const registerUser = (data) => axios.post(`${baseUrls}/signup`, data);

export const getToken = (data) => axios.post(`${baseUrls}/signin`, data);

export const getListuser = () => axios.get(`${baseUrls}/user-list`);

export const pagination = (payload) =>axios.get(`${baseUrls}/product/pagination/?pageNo=${payload}&pageSize=${12}`)

export const upDateUser = (values) =>axios.post(`${baseUrls}/update-user`, values);

export const getProductList = () => axios.get(`${baseUrls}/product/product-list`);

export const getCatrgryfilter = (data) =>axios.get(`${baseUrls}/product/category-filter`, { params: data })

export const getProductDetails = (data) =>axios.get(`${baseUrls}/product/product-details`,{params: data})

export const getUser = (id) => axios.get(`${baseUrls}/current-user`, id);

export const getCatrgrylist = () => axios.get(`${baseUrls}/category/category-list`);

export const forgotpassword = (data) => axios.get(`${baseUrls}/forget-password`, { params: data });

export const Resetps = (data) => axios.post(`${baseUrls}/reset-password/${data.emailId}`, data);

export const getUserCart = (cartId) => { return axios.get(`${baseUrls}/cart/user-cart`, cartId) }

export const addCart = (data) => axios.post(`${baseUrls}/cart/add-cart`, data);

export const getCatrgyDetails = (id) =>axios.get(`${baseUrls}/category/category-details`, { params: id })

export const removeCart = (data) => {
    return axios.delete(`${baseUrls}/cart/delete-cart`, { headers: { "Authorization": `Bearer ${data.token}` }, params: data.data })
}

export const updatecart = (data) => axios.post(`${baseUrls}/cart/update-cart`, data);

export const order = (data) => {
    const options = { method: 'POST', headers: { Authorization: `Bearer ${data.token}` }, data: data, url: `${baseUrls}/order` };
    return axios(options);
}
export const AddAddress = (data) => {
    const options = { method: 'POST', headers: { Authorization: `Bearer ${data.token}` }, data: data.data, url: `${baseUrls}/add-address` };
    return axios(options);
}
export const getUserAddress = (id) => axios.get(`${baseUrls}/user-address`, id);