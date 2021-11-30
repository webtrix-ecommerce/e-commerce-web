import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, logOut } from '../../../store/auth/action';
import { getToken, forgotpassword } from "~/components/api/url-helper";
import { Form, Input, notification, Modal, Button } from 'antd';
import { connect } from 'react-redux';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2Visible: false,
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    handleLoginSubmit = (values) => {

        getToken(values).then((res) => {
            if (res.data.status === 200) {
                this.props.dispatch(login());
                sessionStorage.setItem("token", JSON.stringify(res.data.result.token));
                sessionStorage.setItem("currentUser", JSON.stringify(res.data.result.id));
                notification.success({
                        message: 'Wellcome back'+" "+res.data.result.username,
                        description: 'You are login successful!',
                    });
                return Router.push('/');

            } else {
                notification.warn({
                    message: res.data.message,
                    description: 'This feature has been updated later!',
                })
            }
        })

    };
    Visible = (modal2Visible) => {
        this.setState({ modal2Visible });
    }
    forgetpassword = (value) => {
        
        try {
            forgotpassword(value).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    notification.success({
                        message: res.data.message
                    });
                } else {
                    notification.warn({
                        message: res.data.message
                    });
                }
                this.Visible(false);
            })
        } catch (error) {
            notification.error({
                message: error
            });
        }

    }
    render() {



        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit}>
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
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Username or email address"
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
                                            },
                                            {
                                                pattern:/^.{6,}$/,
                                                message: `password contains at least Six characters`
                                            }
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            // '
                                            // minLength={6}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group text-right hover-blue">
                                    <p   className='form-forgot pb-3'>
                                        <a onClick={() => this.Visible(true)}>Forgot Your Password?</a>
                                    </p>

                                </div>
                                <Modal
                                    title="Forget password"
                                    centered
                                    visible={this.state.modal2Visible}
                                    // onOk={this.forgetpassword}
                                    onCancel={() => this.Visible(false)}
                                    footer={null}
                                >
                                    <h5>Enter your Email Adress...!</h5>
                                    <div className="form-group">
                                        <Form
                                            onFinish={this.forgetpassword}>
                                            <Form.Item
                                                name="emailId"
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
                                                    placeholder="Username or email address"
                                                />
                                            </Form.Item>
                                            <div className="form-group submit">
                                                <button
                                                    htmlType="submit"
                                                    className="ps-btn ps-btn--fullwidth">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal>
                                <div className="form-group submit">
                                    <button
                                        htmlType="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
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

                                    <li>


                                        <Link href="/account/resetpassword">
                                            <a
                                                className="instagram"
                                            >
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </Link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth.isLoggedIn
    };
};


export default connect(mapStateToProps)(Login);
