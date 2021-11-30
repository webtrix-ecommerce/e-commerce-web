import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { AddAddress } from '~/components/api/url-helper';
import router from 'next/router';


class FormEditAddress extends Component {


    handleSaveAddress=(value)=>{
        const data =JSON.parse(sessionStorage.getItem('token'));
        const  config ={ token:data,data:value}
        console.log(config);
        AddAddress(config)
        .then((res)=>{
            console.log(res);
            notification.success({
              message: res.data.message,
          })

        })
        router.push('/')
    }
    render() {
        return (
            <Form className="ps-form--edit-address" onFinish={this.handleSaveAddress}>
                <div className="ps-form__header">
                    <h3>Billing address</h3>
                </div>
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
                <div className="form-group submit">
                    <button className="ps-btn" type='submit'>Add Address</button>
                </div>
                {/* <div className="ps-form__content">
                    <div className="form-group">
                        <label>
                            FirstName <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Lastname <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Company Name
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Country <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Street Address <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            State <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Postcode <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>
                            Email address <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control"/>
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn">Save Address</button>
                    </div>
                </div> */}
            </Form>
        );
    }
}

export default FormEditAddress;
