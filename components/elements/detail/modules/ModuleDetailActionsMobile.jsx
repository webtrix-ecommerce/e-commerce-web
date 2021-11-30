import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductRepository from '~/repositories/ProductRepository';

const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const { addItem } = useEcomerce();
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('currentUser'));
        setUser(data);
        getproducts();
    }, [product])
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        console.log("Products", Products);
        if (Products) {
            const existItem = Products.find((item) => item.productModel.id === product.id);

            console.log("existItem", existItem);
            if (existItem) {
                console.log("inside");
                setProducts(true);
                console.log("existItem", existItem);
            }
        }
    }
    function goCart(e) {
        e.preventDefault();
        Router.push('/account/shopping-cart');
    }
    const handleAddItemToCart = (e) => {
        e.preventDefault();
        console.log(user);
        if (user) {
            console.log(product.id);
            addItem({ productId: product.id, quantity: 1, userId: user }, ecomerce.cartItems, 'cart');
        } else {
            return Router.push('/account/login')
        }
    };
    if (products > 0) {
        return (<div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => goCart(e)}>
                Go to cart
            </a>
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => goCart(e)}>
                Buy Now
            </a>
        </div>)
    } else {
        return (
            <div className="ps-product__actions-mobile">
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Add to cart
                </a>
                <a
                    className="ps-btn"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Buy Now
                </a>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailActionsMobile);
