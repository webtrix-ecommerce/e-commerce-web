import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { getCatrgrylist } from '~/components/api/url-helper';
// import categories from '../../../public/static/data/static-categories.json';

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }
    componentDidMount = () => {
        getCatrgrylist().then((res) => {
            this.setState({ categories: res.data.result });
        });
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
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
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}>
                {this.state.categories.map(category => (
                    <Menu.Item key={category.id}>
                        <Link href={`/shop/${category.id}`}>
                            <a >
                                {category.name}
                            </a>
                        </Link>

                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default PanelCategories;
