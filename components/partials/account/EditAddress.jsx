import React, { Component } from 'react';
import Link from 'next/link';
import FormEditAddress from './modules/FormEditAddress';
import { logOut } from '~/store/auth/action';
import router, { Router } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '~/components/api/url-helper';

class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = { user: [] };
    };

    componentDidMount() {

        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);

        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        getUser(config).then(
            res => {
                this.setState({ user: res.data.result });
            }
        )

    }

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            // {
            //     text: 'Notifications',
            //     url: '/account/notifications',
            //     icon: 'icon-alarm-ringing',
            // },
            {
                text: 'Order History',
                url: '/account/invoices',
                icon: 'icon-papers',
            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
                active: true,
            },
            // {
            //     text: 'Recent Viewed Product',
            //     url: '/account/recent-viewed-product',
            //     icon: 'icon-store',
            // },
            // {
            //     text: 'Wishlist',
            //     url: '/account/wishlist',
            //     icon: 'icon-heart',
            // },
        ];
        const handleLogout = (e) => {
            e.preventDefault();
            sessionStorage.clear();
            this.props.dispatch(logOut());
            router.push("/");
        };
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{this.state.user?this.state.user.username:''}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                            <a onClick={(e) => handleLogout(e)}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <FormEditAddress />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth.isLoggedIn
    };
};


export default connect(mapStateToProps) (EditAddress);
