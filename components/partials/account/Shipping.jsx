import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { getUser } from '~/components/api/url-helper';
import router,{useRouter} from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { order } from '~/components/api/url-helper';
import { notification } from 'antd';

const Shipping = () => {
    const [amount, setAmount] = useState();
    const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState([]);
    const rout = new useRouter();
    // const data =rout.query;
    // console.log(data);
    
    useEffect(async () => {
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        if (data === null || data === undefined) {
            router.push('/account/login')
        }
        let add = JSON.parse(sessionStorage.getItem('adresss'))
        setUser(add);
        const Products = await ProductRepository.getProductsByCartId();
        setCart(Products);
        setAmount(calculateAmount(Products));

    }, [])
    var carts = [];
    carts = cart.map((item) => {
        return { productId: `${item.productModel.id}`, quantity: `${item.quantity}`, amount: item.productModel.price };
        // product.push(item.productModel)
    });
    const Order = { product: carts, amount: amount };
    const handleLoginSubmit = (value) => {
        let data = JSON.parse(sessionStorage.getItem('token'))
        Order.token = data;
        order(Order).then((res) => {
            if (res.data.status === 200) {
                notification.success({
                    message: res.data.message,
                    description: 'You are login successful!',
                });
                return router.push('/account/payment-success');

            } else {
                notification.warn({
                    message: res.data.message,
                    description: 'This feature has been updated later!',
                })
            }
        })
    }
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact</small>
                                        <p>+91 {user.phone}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>{user.street+','+user.city+','+user.district+','+user.state+','+user.pincode}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Shipping char</small>
                                        <strong>₹20.00</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">
                                    {/* <Link href="/account/checkout"> */}
                                        <a onClick={()=>router.push('/account/checkout')}>
                                            <i className="icon-arrow-left mr-2 ps-btn"> Return to information</i>    
                                        </a>
                                    {/* </Link> */}
                                    {/* <Link href="/account/payment"> */}
                                        {/* <a onClick={()=>router.push('/account/payment')} className="ps-btn"> */}
                                            
                                            <button className="ps-btn" onClick={handleLoginSubmit}>Continue to payment</button>
                                        {/* </a> */}
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
