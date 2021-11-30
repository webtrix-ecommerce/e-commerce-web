import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser } from '~/components/api/url-helper';
import { logOut } from '~/store/auth/action';
import router, { Router } from 'next/router';
import { connect, useDispatch } from 'react-redux';
const AccountMenuSidebar = ({ data }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    useEffect(() => {

        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);

        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        getUser(config).then(
            res => {
                console.log(res.data.result);
                setUser(res.data.result);
            }
        )

    }, [])
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        dispatch(logOut());
        router.push("/");
    };
    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header">
                <img src="/static/img/users/3.jpg" />
                <figure>
                    <figcaption>Hello</figcaption>
                    <p>{user.username}</p>
                </figure>
            </div>
            <div className="ps-widget__content">
                <ul>
                    {data.map(link => (
                        <li key={link.text} className={link.active ? 'active' : ''}>
                            <Link href={link.url}>
                                <a>
                                    <i className={link.icon}></i>
                                    {link.text}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li>
                        {/* <Link href="/account/my-account">
                        <a>Logout</a>
                    </Link> */}
                        <a onClick={(e) => handleLogout(e)}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default AccountMenuSidebar;
