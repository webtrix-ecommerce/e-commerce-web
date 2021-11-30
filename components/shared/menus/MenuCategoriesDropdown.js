import React, { useEffect, useState } from 'react';
import { getCatrgrylist } from '../../api/url-helper';
import Link from 'next/link';

const MenuCategoriesDropdown = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getCatrgrylist().then((res) => {
            setData(res.data.result);
        });
    }, []);

    const Menu = ({ source, className }) => {
        // Views
        let menuView;
        if (source) {
            menuView = source.map((item) => {

                return (
                    <li key={item.name}>
                        {/* <Link href={item.url}> */}
                        <Link href={`/shop/[categoryId]`} as={`/shop/${item.id}`}>
                        <a >
                            {/* {item.icon && <i className={item.icon}></i>} */}
                            {item.name}
                        </a>
                        </Link>
                        {/* </Link> */}
                    </li>
                );
            });
        } else {
            menuView = (
                <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        No menu item.
                    </a>
                </li>
            );
        }
        return <ul className={className}>{menuView}</ul>;
    };
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Shop by Department</span>
            </div>
            <div className="menu__content">
                <Menu
                    source={data}
                    className="menu--dropdown"
                />
                {/* <ul className={className}>{menuView}</ul>; */}
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
