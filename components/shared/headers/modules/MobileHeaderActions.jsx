import React, { Component,useState,useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { connect } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';



const MobileHeaderActions = ({ auth, ecomerce }) => {
    const [data, setData] = useState(false);
    const [products, setProducts] = useState([]);
    const { cartItems } = ecomerce;
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    useEffect(() => {
        getproducts();
        const data = JSON.parse(sessionStorage.getItem('token'))
        if (data) {
            console.log("token  available ");
            setData(true)
        } else {
            setData(false)
            console.log("token not  available ");
        }
    }, [ecomerce]);
    return (
        <div className="navigation__right">
            <Link href="/account/shopping-cart">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{products ? products.length : 0}</i>
                    </span>
                </a>
            </Link>

            {/* {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? ( */}
                {data === true ? (
                <AccountQuickLinksMobile />
            ) : ( 
                <div className="header__extra">
                    <Link href="/account/login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
