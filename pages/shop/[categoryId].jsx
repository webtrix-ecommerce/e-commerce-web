import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import BreadCrumb from '~/components/elements/BreadCrumb';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import { useRouter } from 'next/router';


import useGetProducts from '~/hooks/useGetProducts';
const categoriesProduct = ({ columns = 4, pageSize = 12 }) => {
    const Router = useRouter();
    const { page } = Router.query;
    const { query } = Router;
    const ID = query.categoryId;
    const [categoryName, setCategoryName] = useState();
    const [listView, setListView] = useState(true);
    // const [total, setTotal] = useState(0);
    const [productItems, setProductItems] = useState([]);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop Default',
        },
    ];

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    function handlePagination(page, pageSize) {
        Router.push(`/shop?page=${page}`);
    }


    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    useEffect(() => {
        let params;
        if (query) {
            if (query.page) {
                params = {
                    _start: page * pageSize,
                    _limit: pageSize,
                };
            } else {
                params = query;
                params._limit = pageSize;
            }
        } else {
            params = {
                _limit: pageSize,
            };
        }
        console.log(ID);
        let data = { categoryId: ID };
        ProductRepository.getProductsByCategory(data)
            .then((res) => {
                console.log("product", res);
                setProductItems(res);
            });
        handleSetColumns();
        ProductRepository.getCategory(data)
            .then((res) =>{
                console.log("Id", res);
                // setCategoryName(res)
            });
    }, [query]);



    let productItemsView;
    if (productItems && productItems.length > 0) {
        if (listView) {
            const items = productItems.map((item) => (
                <div className={classes} key={item.id}>
                    <Product product={item} />
                </div>
            ));
            productItemsView = (
                <div className="ps-shop-items">
                    <div className="row">{items}</div>
                </div>
            );
        } else {
            productItemsView = productItems.map((item) => (
                <ProductWide product={item} />
            ));
        }
    } else {
        productItemsView = <p>No product found.</p>;
    }

    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    <ShopBanner />
                    <ShopBrands />
                    <HomeDefaultTopCategories />
                    <div className="ps-layout--shop container">

                        <div className="ps-shopping">
                            <div className="ps-shopping__header">
                                    <p>{categoryName?categoryName:<b>Products</b>}</p>
                                <div className="ps-shopping__actions">
                                    <div className="ps-shopping__view">
                                        <p>View</p>
                                        <ul className="ps-tab-list">
                                            <li className={listView === true ? 'active' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => handleChangeViewMode(e)}>
                                                    <i className="icon-grid"></i>
                                                </a>
                                            </li>
                                            <li className={listView !== true ? 'active' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => handleChangeViewMode(e)}>
                                                    <i className="icon-list4"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ps-shopping__content">{productItemsView}</div>
                            <div className="ps-shopping__footer text-center">
                                {/* <div className="ps-pagination">
                                    <Pagination
                                        // total={total - 1}
                                        pageSize={pageSize}
                                        responsive={true}
                                        showSizeChanger={false}
                                        current={page !== undefined ? parseInt(page) : 1}
                                        onChange={(e) => handlePagination(e)}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newletters />
        </PageContainer>
    );
};
export default categoriesProduct;