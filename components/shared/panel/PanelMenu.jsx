import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'antd';
import { menuPrimary } from '~/public/static/data/menu';
import menu_data from '~/public/static/data/menu';
import Link from 'next/link';

const { SubMenu } = Menu;

class PanelMenu extends Component {
    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
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
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2">
                  {accountLinks.map((subItem) => (
                                    <Menu.Item key={subItem.text}>
                                        <Link href={subItem.url}>
                                            <a>{subItem.text}</a>
                                        </Link>
                                    </Menu.Item>
                                ))}
                {/* {menu_data.menuPrimary.menu_1.map((item) => {
                    if (item.subMenu) {
                        return (
                            <SubMenu
                                key={item.text}
                                title={
                                    <Link href={item.url}>
                                        <a>{item.text}</a>
                                    </Link>
                                }>
                                {item.subMenu.map((subItem) => (
                                    <Menu.Item key={subItem.text}>
                                        <Link href={subItem.url}>
                                            <a>{subItem.text}</a>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    } else if (item.megaContent) {
                        return (
                            <SubMenu
                                key={item.text}
                                title={
                                    <Link href={item.url}>
                                        <a>{item.text}</a>
                                    </Link>
                                }>
                                {item.megaContent.map((megaItem) => (
                                    <SubMenu
                                        key={megaItem.heading}
                                        title={<span>{megaItem.heading}</span>}>
                                        {megaItem.megaItems.map(
                                            (megaSubItem) => (
                                                <Menu.Item
                                                    key={megaSubItem.text}>
                                                    <Link href={item.url}>
                                                        <a>
                                                            {megaSubItem.text}
                                                        </a>
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        )}
                                    </SubMenu>
                                ))}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.text}>
                                {item.type === 'dynamic' ? (
                                    <Link
                                        href={`${item.url}/[pid]`}
                                        as={`${item.url}/${item.endPoint}`}>
                                        l<a>{item.text}</a>
                                    </Link>
                                ) : (
                                    <Link href={item.url} as={item.alias}>
                                        <a>{item.text}</a>
                                    </Link>
                                )}
                            </Menu.Item>
                        );
                    }
                })} */}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
