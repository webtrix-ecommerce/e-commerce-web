import React from "react";
import Router from 'next/router';
import { connect } from 'react-redux'
import Link from 'next/link';
import { Form, Input, Button, notification } from 'antd';
import { Resetps } from "~/components/api/url-helper";

const Resetpaassword = (props) => {
    console.log(props.emailId);
    const handleLoginSubmit = (values) => {
        console.log("values ", values);
        let data = { emailId: props.emailId, password: values.password, confirmPassword: values.confirmPassword };
        console.log(props.emailId);
        Resetps(data)
            
            .then(
                (res) => {
                    if (res.status == 200) {
                        notification.success({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                        Router.push('/account/login');
                    } else {
                        notification.warn({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                    }
                }
            ).catch(err => (console.log(err)));
    }

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={handleLoginSubmit}
                >
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" >
                        <div className="ps-form__content">
                            <h5>Reset Password</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },{
                                            pattern:/^.{6,}$/,
                                            message:`password contains at least Six characters`
                                        }
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="password"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your conformpassword!',
                                        },{
                                            pattern:/^.{6,}$/,
                                            message:`password contains at least Six characters`
                                        }
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="conformpassword..."
                                    />
                                </Form.Item>
                            </div>

                            <div className="form-group submit">
                                <button
                                    htmlType="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Reset Password
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="twitter"
                                        href="#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>)
}


export default Resetpaassword;