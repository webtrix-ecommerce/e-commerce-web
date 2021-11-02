import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Input, notification } from 'antd';
import { getUser, order, getUserCart } from '~/components/api/url-helper';
import { useForm } from 'antd/lib/form/Form';
import router from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import Item from 'antd/lib/list/Item';

const FormCheckoutInformation = () => {
    // class FormCheckoutInformation extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             user: []
    //         }
    //     }
    const [amount, setAmount] = useState();
    const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(async () => {
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        if (data === null || data === undefined) {
            router.push('/account/login')
        }
        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        getUser(config).then(
            res => {
                console.log(res);
                setUser(res.data.result);
            }
        )

        const Products = await ProductRepository.getProductsByCartId();
        setCart(Products);
        setAmount(calculateAmount(Products));

    }, [])


    // var carts = [];
    // carts = cart.map((item) => {
    //     return { productId: `${item.productModel.id}`, quantity: `${item.quantity}`, amount: item.productModel.price };
    //     // product.push(item.productModel)
    // });
    // const Order = { product: carts, amount: amount };
    const handleLoginSubmit = (value) => {
    //     let data = JSON.parse(sessionStorage.getItem('token'))
    //     Order.token = data;
    //     order(Order).then((res) => {
    //         if (res.data.status === 200) {
    //             notification.success({
    //                 message: res.data.message,
    //                 description: 'You are login successful!',
    //             });
                return router.push('/account/shipping');

    //         } else {
    //             notification.warn({
    //                 message: res.data.message,
    //                 description: 'This feature has been updated later!',
    //             })
    //         }
    //     })
    }
    //  [form] = Form.useForm();
    // form.setFieldsValue({
    //     username: user.username,
    //     email: props.data.email,
    //     phone: props.data.phone,
    //     address: props.data.address,

    // });

    // render() {

    const [form] = Form.useForm();
    form.setFieldsValue({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,

    });
    return (
        <Form
            className="ps-form__billing-info"
            onFinish={handleLoginSubmit}
            form={form}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="phone"
                    initialValue={() => user.phone}
                    rules={[
                        {
                            required: true,
                            message:
                                'Enter mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="tel"
                        placeholder="Email or phone number"
                    />
                </Form.Item>
            </div>
            {/* <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="keep-update"
                    />
                    <label htmlFor="keep-update">
                        Keep me up to date on news and exclusive offers?
                    </label>
                </div>
            </div> */}
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder=" Name"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        {/* <Form.Item
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter your last name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </Form.Item> */}
                        <Form.Item
                            name="postalCode"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter a postal Code!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="postalCode"
                                placeholder="Postal Code"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        defaultValue={user.address}
                        placeholder="Address"
                    />
                </Form.Item>
            </div>
            {/* <div className="form-group">
                <Form.Item
                    name="apartment"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an Apartment!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </Form.Item>
            </div> */}
            {/* <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="city"
                                placeholder="City"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="postalCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a postal oce!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="postalCode"
                                placeholder="Postal Code"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div> */}
            {/* <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div> */}
            <div className="ps-form__submit">
                {/* <Link href="/account/cart"> */}
                <a onClick={() => router.push('/account/shopping-cart')} className="ps-btn d-none d-md-block">
                    <i className="icon-arrow-left mr-2 "></i>
                    Return to shopping cart
                </a>
                {/* </Link> */}
                <div className="ps-block__footer">
                    <button className="ps-btn" type="submit">Continue to shipping</button>
                </div>
            </div>
        </Form>
    );
}
// }

export default FormCheckoutInformation;
