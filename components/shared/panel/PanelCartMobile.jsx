import React, { Component,useState,useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { connect } from 'react-redux';
import Link from 'next/link';
import useEcomerce from '~/hooks/useEcomerce';
import useProduct from '~/hooks/useProduct';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const PanelCartMobile = ({ ecomerce }) => {
    const {  removeItem } = useEcomerce();
    const {ImageUrl, title, thumbnailImage } = useProduct();
    const [products, setProducts] = useState([]);
    
    function    handleRemoveCartItem(e, product) {
        e.preventDefault();
        console.log("selectedItem", product);
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        const config = {
            token: data,
            data: { cartId: product }
        };
        removeItem(config, ecomerce.cartItems, 'cart');
    }
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    useEffect(() => {
        getproducts();
    }, [ecomerce]);
    // useEffect(() => {
    //     if (ecomerce.cartItems) {
    //         getProducts(ecomerce.cartItems);
    //     }
    // }, [ecomerce]);
    //view
    let cartItemsView, footerView;
    console.warn(products);
    if (products && products.length > 0) {
        const amount = calculateAmount(products);
        const items = products.map((item) => (
            <div className="ps-product--cart-mobile" key={item.id}>
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${item.productModel.id}`}>
                        <a>{ImageUrl(item.productModel)}</a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveCartItem(e, item.id)}>
                        <i className="icon-cross"></i>
                    </a>
                    {title(item)}
                    <Link href="/product/[pid]" as={`/product/${item.productModel.id}`}>
                        <a className="ps-product__title">{item.productModel.name}</a>
                    </Link>
                    <p>
                        <strong>Sold by:</strong> {item.vendor}
                    </p>
                    <small>
                        {item.quantity} x  ₹{item.productModel.price}
                    </small>
                </div>
            </div>
        ));
        cartItemsView = <div className="ps-cart__items">{items}</div>;
        footerView = (
            <div className="ps-cart__footer">
                <h3>
                    Sub Total:<strong> ₹{amount}</strong>
                </h3>
                <figure>
                    <Link href="/account/shopping-cart">
                        <a className="ps-btn">View Cart</a>
                    </Link>
                    <Link href="/account/checkout">
                        <a className="ps-btn">Checkout</a>
                    </Link>
                </figure>
            </div>
        );
    } else {
        cartItemsView = <p>Cart empty!</p>;
        footerView = (
            <div className="ps-cart__footer">
                <Link href="/shop">
                    <a className="ps-btn ps-btn--fullwidth">Shop now</a>
                </Link>
            </div>
        );
    }
    return (
        <div className="ps-cart--mobile">
            <div className="ps-cart__content">
                {cartItemsView}
                {footerView}
            </div>
        </div>
    );
};
export default connect((state) => state)(PanelCartMobile);
