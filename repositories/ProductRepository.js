import Repository, { baseUrl, serializeQuery } from './Repository';
import { getUserCart,getProductList } from '~/components/api/url-helper';
import { getCatrgyDetails,pagination ,getCatrgryfilter} from '~/components/api/url-helper';

class ProductRepository {
     getRecords(params) {
        const reponse =  getProductList()
        //  Repository.get(
        //     `${baseUrl}/products?${serializeQuery(params)}`
        // )
            .then((response) => {
                console.log(response.data.result);
                return response.data.result;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProducts(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
     getCategory(id) {
        const reponse = getCatrgyDetails(id)
            .then((response) => {
                let Name = response.data.result
                return Name.name;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories() {
        const reponse = await Repository.get(`${baseUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

     getTotalRecords() {
        // const reponse = await Repository.get(`${baseUrl}/products/count`)
        const reponse =getProductList()
            .then((response) => {
                return response.data.result;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

     getProductsBypagination(payload) {
        // const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => ({ error: JSON.stringify(error) }));
        // return reponse;
        
        const reponse =pagination(payload)
            .then((response) => {
                return response.data.result;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

     getProductsByCategory(data) {
        const reponse =getCatrgryfilter(data)
            // await Repository.get(
            //     `${baseUrl}/product-categories?slug=${payload}`
            // )
            .then((response) => {
                if (response.data) {
                    return response.data.result;
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByPriceRange(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

     getProductsByCartId(payload) {
        // const endPoint = `${baseUrl}/products?${payload}`;
        // const reponse = await Repository.get(endPoint)
        let data = JSON.parse(sessionStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        const reponse = getUserCart(config)
            .then((response) => {
                if (response.data && response.data.result.length > 0) {
                    return response.data.result;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new ProductRepository();
