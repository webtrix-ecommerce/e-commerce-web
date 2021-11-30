import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import { getUser } from '../../api/url-helper'
import { logOut } from '~/store/auth/action';
import router, { Router } from 'next/router';
import { connect, useDispatch } from 'react-redux';

const UserInformation = () => {
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {

        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        if (data===null || data===undefined) {
            console.log("null");
            return router.push('/account/login')
        }
        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        getUser(config).then(
            res => {
                setUser(res.data.result);
            }
        )

    }, []);
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        dispatch(logOut());
        router.push("/");
    };
    console.log(user);
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
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

    //Views
    const accountLinkView = accountLinks.map((item) => (
        <li key={item.text} className={item.active ? 'active' : ''}>
            <Link href={item.url}>
                <a>
                    <i className={item.icon}></i>
                    {item.text}
                </a>
            </Link>
        </li>
    ));

    return (

        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption >Hello</figcaption>
                                        <p>{user?user.username:''}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
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
                                            {/* <Link href="/"> */}
                                            <a onClick={(e) => handleLogout(e)}>
                                                Logout
                                            </a>
                                            {/* </Link> */}
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation data={user} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
