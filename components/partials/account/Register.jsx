import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { registerUser } from "~/components/api/url-helper";
import { Form, Input, Button, notification } from 'antd';
import { connect } from 'react-redux';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
   

    handleSubmit(values) {

        try {
            registerUser(values)
                .then((res) => {
                    console.log(res);
                    console.log(res.status);
                    console.log(res.data.message);
                    if (res.status == 200) {
                        notification.success({
                            message: res.data.message,
                            // message: "res.data.message",
                            description: 'This feature has been updated later!',
                        });
                        return Router.push('/account/login');
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

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"

                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"

                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your UserName!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="UserName"

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"

                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },{
                                                pattern:/^.{6,}$/,
                                                message: `password contains at least Six characters`
                                            }
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."

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
                                                    'Please input your confirmPassword!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="confirmPassword..."

                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="phone"

                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your Mobile number!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="tel"
                                            placeholder="Mobile number..."

                                        />
                                    </Form.Item>
                                </div>
                                {/* <div className="form-group submit">
                                    <Form.Item>
                                        <Button htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </div> */}
                                <div className="ps-form__bottom text-right ">
                                   
                                    <button className=" ps-btn success " htmlType="submit">Submit</button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with: </p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div >
            </div >
        );
    }
}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
