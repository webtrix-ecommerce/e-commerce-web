import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import router from 'next/router';

const MiniCart = ({ ecomerce }) => {
    const {
        // products,
        removeItem, removeItems, getProducts } = useEcomerce();

    const [products, setProducts] = useState([]);
    function handleRemoveItem(e, productId) {
        e.preventDefault();
        console.log("selectedItem", productId);
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        const config = {
            token: data,
            data: { cartId: productId }
        };
        removeItem(config, ecomerce.cartItems, 'cart');
        getproducts();
    }
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    useEffect(() => {
        getproducts();
    }, [ecomerce]);
    let cartItemsView;
    if (products && products.length > 0) {

        const amount = calculateAmount(products);
        const productItems = products.map((item) => {
            return (
                <ProductOnCart product={item} key={item.id}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e, item.id)}>
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>₹{amount ? amount : 0}</strong>
                    </h3>
                    <figure>
                        {/* <Link href="/account/shopping-cart"> */}
                            <a onClick={()=>router.push('/account/shopping-cart')} className="ps-btn">View Cart</a>
                        {/* </Link> */}
                        {/* <Link href="/account/checkout"> */}
                            <a onClick={()=>router.push('/account/checkout')} className="ps-btn">Checkout</a>
                        {/* </Link> */}
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>No products in cart</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" >
                <i className="icon-bag2"></i>
                <span>
                    <i>{products ? products.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default connect((state) => state)(MiniCart);
