import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Input, notification, Radio } from 'antd';
import { getUser, order, getUserCart } from '~/components/api/url-helper';
import { useForm } from 'antd/lib/form/Form';
import router from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import Item from 'antd/lib/list/Item';
import { getUserAddress } from '~/components/api/url-helper';

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
        getUserAddress(config).then(
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
        console.log(value);
        sessionStorage.setItem("adresss",JSON.stringify(value))
        return router.push({ pathname: '/account/shipping' });


    }
    // const [value, setValue] = useState([]);

    function handleChangeMethod(method) {

        form.setFieldsValue({
            username: method.userModel.username,
            email: method.userModel.email,
            phone: method.userModel.phone,
            street: method.street,
            city: method.city,
            district: method.district,
            pincode: method.pincode,
            state: method.state
        });
        // setValue(method); //e.target.value
    }

    // render() {
    // console.log(method);
    const [form] = Form.useForm();


    return (

        <Form
            className="ps-form__billing-info"
            onFinish={handleLoginSubmit}
            form={form}>
            <h3 className="ps-form__heading">Contact information</h3>
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
                </div>
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
            <Radio.Group
                onChange={(e) => handleChangeMethod(e.target.value)}
            >
                {/* <Radio value={1}>Visa / Master Card</Radio>
                <Radio value={2}>Paypal</Radio> */}
                {user.map((item, index) => {
                    var count = index + 1;
                    return <Radio value={item}>Adress {count}</Radio>;
                })}
            </Radio.Group>

            <div className="form-group">
                <Form.Item
                    name="street"
                    // label='Street Address'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input your Street Address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Street Address"

                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            // label='City'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="City"

                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="district"
                            // label='Street Address'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your district!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="district"

                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="state"
                            // label='Street Address'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your state!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="state"

                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="pincode"
                            // label='Street Address'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your pincode!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="pincode"

                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
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
