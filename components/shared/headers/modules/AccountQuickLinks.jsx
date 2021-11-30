import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';
import router, { Router } from 'next/router';

const AccountQuickLinks = (props) => {
    const [data, setData] = useState(false);
    const dispatch = useDispatch();
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
        },
        // {
        //     text: 'Notifications',
        //     url: '/account/notifications',
        // },
        {
            text: 'Order History',
            url: '/account/invoices',
        },
        {
            text: 'Address',
            url: '/account/addresses',
        },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        // },
        // {
        //     text: 'Wishlist',
        //     url: '/account/wishlist',
        // },
    ];
    const isLoggedIn = data;
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        dispatch(logOut());
        router.push("/");
    };
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('token'))
        if (data) {
            console.log("token  available ");
            setData(true)
        } else {
            setData(false)
            console.log("token not  available ");
        }
    })

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            {/* <Link href={item.url}> */}
                <a onClick={() =>router.push(item.url)}>{item.text}</a>
            {/* </Link> */}
        </li>
    ));
    console.log(data);

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href='#' onClick={(e) => handleLogout(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    {/* <Link href="/account/login"> */}
                    <a onClick={() =>router.push('/account/login')}>Login</a>
                    {/* </Link> */}
                    {/* <Link href="/account/register"> */}
                        <a onClick={() =>router.push("/account/register")}>Register</a>
                    {/* </Link> */}
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
