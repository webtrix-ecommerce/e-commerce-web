import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Radio, Input, Button, notification } from 'antd';
import router from 'next/router';
import { upDateUser } from '../api/url-helper';
const FormChangeUserInformation = (props) => {
    const [user, setUser] = useState([]);
    console.log("prope", props);

    const [form] = Form.useForm();
    form.setFieldsValue({
        username: props.data.username,
        email: props.data.email,
        phone: props.data.phone,
        address: props.data.address,

    });
    const handleSubmit = (values) => {
        values.id = props.data.id;
        values.password = props.data.password;
        console.log(values);
        try {
            upDateUser(values)
                .then((res) => {
                    console.log(res);
                    console.log(res.status);
                    console.log(res.data.message);
                    if (res.status == 200) {
                        notification.success({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                        router.push('/')
                    } else {
                        notification.warn({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                    }
                })
        }
        catch (err) {
            notification.warn({
                message: err.message,
                description: 'This feature has been updated later!',
            })
        }
    }
    return (
        <>
            <Form className="ps-form--account-setting" form={form} onFinish={handleSubmit}>
                <div className="ps-form__header">
                    <h3>Account Information</h3>
                </div>
                <div className="ps-form__content">
                    <div className="form-group">
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Username or email address!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Username or email address"

                            />
                        </Form.Item>

                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="username"

                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your First name!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="First name"
                                    />
                                </Form.Item>

                            </div>
                        </div>
                        {/* <div className="col-sm-6">
                            <div className="form-group">
                            <Form.Item
                            name="lastname"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Last name!',
                                },
                            ]}>
                             <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Last name"
                                />
                        </Form.Item>
                               
                            </div>
                        </div> */}

                        <div className="col-sm-6">
                            <div className="form-group"><Form.Item
                                name="phone"

                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your Phone Number!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="tel"
                                    placeholder="Phone Number"
                                />
                            </Form.Item>

                            </div>
                        </div>
                        {/* <div className="col-sm-6">
                            <div className="form-group"><Form.Item
                            name="email"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Email Address!',
                                },
                            ]}>
                               <Input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email Address"
                                />
                        </Form.Item>
                             
                            </div>
                        </div> */}
                        {/* <div className="col-sm-12">
                            <div className="form-group"><Form.Item
                                name="address"

                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your Address!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Address"
                                />
                            </Form.Item>

                            </div>
                        </div> */}
                        {/* <div className="col-sm-6">
                            <div className="form-group"><Form.Item
                            name="City"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your City!',
                                },
                            ]}>
                            <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="City"
                                />
                        </Form.Item>
                                
                            </div>
                        </div> */}
                        {/* <div className="col-sm-6">
                            <div className="form-group"><Form.Item
                            name="Country"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Country!',
                                },
                            ]}>
                            <Input
                                 className="form-control"
                                 type="text"
                                 placeholder="Country"
                            />
                        </Form.Item>
                                
                            </div>
                        </div> */}
                    </div>

                    <div className="form-group submit">
                        <button className="ps-btn">Update profile</button>
                    </div>
                </div>
            </Form>
        </>
    )
};


export default FormChangeUserInformation;
