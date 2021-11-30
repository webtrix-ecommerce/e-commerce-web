import React, { useState, useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
    setCompareItems,
    setWishlistTtems,
    setCartItems,
} from '~/store/ecomerce/action';
import { getUserCart, getUser, addCart, removeCart, updatecart } from '~/components/api/url-helper';

export default function useEcomerce() {
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    useEffect(() => {
        getCart();
    }, [])
    const getCart = async () => {
        let data = JSON.parse(sessionStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        // getUserCart(config).then(res => { setCart(res.data.result); });
        const Products = await ProductRepository.getProductsByCartId();
        setCart(Products)
        // console.warn("Products", Products);
        getUser(config).then(
            res => {
                setUser(res.data.result);
            }
        )

    }
    return {
        loading,
        cartItemsOnCookie,
        products,
        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (payload && payload.length > 0) {
                //     let queries = '';
                //     payload.forEach((item) => {
                //         if (queries === '') {
                //             queries = `id_in=${item.id}`;
                //         } else {
                //             queries = queries + `&id_in=${item.id}`;
                //         }
                //     });
                const responseData = await ProductRepository.getProductsByCartId(
                    // queries
                );
                console.log("resp", responseData);
                if (responseData && responseData.length > 0) {
                    if (group === 'cart') {
                        let cartItems = responseData;
                        // payload.forEach((item) => {
                        //     let existItem = cartItems.find(
                        //         (val) => val.id === item.id
                        //     );
                        //     if (existItem) {
                        //         existItem.quantity = item.quantity;
                        //     }
                        // });

                        setProducts(cartItems);

                    } else {
                        setProducts(responseData);
                    }
                    setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
                }
            } else {
                setLoading(false);
                setProducts([]);
            }
            console.log(products);
        },

        increaseQty: async (payload, currentCart) => {
            let cart = [];
            const Products = await ProductRepository.getProductsByCartId();
            if (Products) {
                // console.log("cart ", Products);
                // console.log("payload ", payload);
                const existItem = Products.find((item) => item.productModel.id === payload);
                if (existItem) {
                    existItem.quantity = existItem.quantity + 1;
                    const data = {
                        id: existItem.id, userId: existItem.userModel.id, productId: existItem.productModel.id, quantity: existItem.quantity
                    }
                    console.log("increaseQty", existItem);
                    updatecart(data);
                    setCookie('cart', cart, { path: '/' });
                    dispatch(setCartItems(cart));
                }
            }
            return cart;
        },

        decreaseQty: async (payload, currentCart) => {
            let cart = [];
            const Products = await ProductRepository.getProductsByCartId();
            if (Products) {
                const existItem = Products.find((item) => item.productModel.id === payload);
                if (existItem) {
                    if (existItem.quantity > 1) {
                        existItem.quantity = existItem.quantity - 1;
                        const data = {
                            id: existItem.id, userId: existItem.userModel.id, productId: existItem.productModel.id, quantity: existItem.quantity
                        }
                        updatecart(data);
                        console.log("decreaseQty", existItem);
                        setCookie('cart', cart, { path: '/' });
                        dispatch(setCartItems(cart));
                        getCart();
                    }
                }

            }
            return cart;
        },

        addItem: async (newItem, items, group) => {
            getCart();
            let newItems = [];
            let existItems = [];
            console.log(cart);
            const Products = await ProductRepository.getProductsByCartId();
            if (Products) {
                // newItems = items;  
                console.log("cart ", Products);
                const existItem = Products.find((item) => item.productModel.id === newItem.productId);
                console.log("existItem", existItem);
                if (existItem) {
                    if (group === 'cart') {
                        newItem.quantity += existItem.quantity;
                        newItem.id = existItem.id;
                        existItems.push(newItem);
                    }
                } else {
                    console.log("not existem");
                    newItems.push(newItem);
                }
            } else {
                console.log("no CArt");
                newItems.push(newItem);
            }
            if (group === 'cart') {
                setCookie('cart', newItems, { path: '/' });
                if (existItems.length > 0) {
                    console.log("existItem", "true");
                    updatecart(existItems[0]);
                } else { console.log("existItem", "false"); addCart(newItem); }

                dispatch(setCartItems(newItems));

            }
            if (group === 'wishlist') {
                setCookie('wishlist', newItems, { path: '/' });

                dispatch(setWishlistTtems(newItems));
            }

            if (group === 'compare') {
                setCookie('compare', newItems, { path: '/' });
                dispatch(setCompareItems(newItems));
            }
            return newItems;
        },

        removeItem: (selectedItem, items, group) => {
            let currentItems = items;
            if (currentItems.length > 0) {
                const index = currentItems.findIndex(
                    (item) => item.id === selectedItem.id
                );
                currentItems.splice(index, 1);
            }
            if (group === 'cart') {
                setCookie('cart', currentItems, { path: '/' });
                removeCart(selectedItem);
                dispatch(setCartItems(currentItems));
            }

            if (group === 'wishlist') {
                setCookie('wishlist', currentItems, { path: '/' });
                dispatch(setWishlistTtems(currentItems));
            }

            if (group === 'compare') {
                setCookie('compare', currentItems, { path: '/' });
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'compare') {
                setCookie('compare', [], { path: '/' });
                dispatch(setCompareItems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },
    };
}
