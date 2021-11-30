import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import useProduct from '~/hooks/useProduct';
import useEcomerce from '~/hooks/useEcomerce';
import  Router  from 'next/router';

const ModuleProductWideActions = ({ ecomerce, product }) => {
    const { price } = useProduct();
    const { addItem } = useEcomerce();
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(false);
    function handleAddItemToCart(e) {
        // e.preventDefault();
        // addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
        e.preventDefault();
        console.log(token);
        if (token=== true) {
            addItem({ productId: product.id, quantity: 1,userId:user }, ecomerce.cartItems, 'cart');
        } else {
           return Router.push('/account/login')
        }
    }
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('currentUser'))
            if (data) {
                setUser(data);
                setToken(true)
            }else{
                setUser(data);
                setToken(false)
            }
    }, [])
    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        });
        modal.update;
    }

    return (
        <div className="ps-product__shopping">
            {price(product)}
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Add to cart
            </a>
            <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                {/* <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default connect((state) => state)(ModuleProductWideActions);
