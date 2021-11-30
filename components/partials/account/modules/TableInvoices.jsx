import React, { Component, useEffect, useState } from 'react';
import { Table, Divider, Tag, Modal } from 'antd';
import Link from 'next/link';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import ProductCart from '~/components/elements/products/ProductCart';
import AccountMenuSidebar from '../modules/AccountMenuSidebar';
import Export from '~/components/shared/export/export';
import ReactToPrint from 'react-to-print';
import router from 'next/router';

// class TableInvoices extends Component {
//     render() {
const TableInvoices = () => {
    /*
        You can change data by API
        example: https://ant.design/components/table/
    */
    const [invoice, setInvoice] = useState([]);
    const [isQuickView, setIsQuickView] = useState(false);
    const [componentRef, setComponentRef] = useState(false);
    const tableData = [
        {
            id: '1',
            invoiceId: '500884010',
            title: 'Marshall Kilburn Portable Wireless Speaker',
            dateCreate: '20-1-2020',
            amount: '42.99',
            status: 'Successful delivery',
        },
        {
            id: '2',
            invoiceId: '593347935',
            title: 'Herschel Leather Duffle Bag In Brown Color',
            dateCreate: '20-1-2020',
            amount: '199.99',
            status: 'Cancel',
        },
        {
            id: '3',
            invoiceId: '593347935',
            title: 'Xbox One Wireless Controller Black Color',
            dateCreate: '20-1-2020',
            amount: '199.99',
            status: 'Cancel',
        },
        {
            id: '4',
            invoiceId: '615397400',
            title: 'Grand Slam Indoor Of Show Jumping Novel',
            dateCreate: '20-1-2020',
            amount: '41.00',
            status: 'Cancel',
        },
    ];
    useEffect(()=>{
        let data = JSON.parse(sessionStorage.getItem('token'))
        if (data===null || data===undefined) {
            console.log("null");
            return router.push('/account/login')
        }
    })
    const tableColumn = [
        {
            title: 'Id',
            dataIndex: 'invoiceId',
            rowKey: 'invoiceId',
            key: 'invoiceId',
            width: '120px',
            render: (text, record) => (
                <Link href="/account/invoice-detail">
                    {record.invoiceId}
                </Link>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            rowKey: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            rowKey: 'dateCreate',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
            width: '120px',
        },
        {
            title: 'Amount',
            rowKey: 'amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <span className="text-right">₹{record.amount}</span>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            rowKey: 'status',
            width: '150px',
            render: (text, record) => (
                <span className="text-right">{record.amount}</span>
            ),
        }, {
            title: 'Invoices',
            key: 'Invoices',
            dataIndex: 'Invoices',
            rowKey: 'Invoices',
            width: '150px',
            render: (text, record) => (
                <span className="text-right">
                    <DownloadOutlined style={{ fontSize: '16px' }} /></span>
            ),
        },
    ];
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
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
            active: true,
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-papers',
        },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        //     icon: 'icon-papers',
        // },
        // {
        //     text: 'Wishlist',
        //     url: '/account/wishlist',
        //     icon: 'icon-papers',
        // },
    ];
    const invoiceProducts = [
        {
            id: '6',
            thumbnail: '/static/img/products/shop/5.jpg',
            title: 'Grand Slam Indoor Of Show Jumping Novel',
            vendor: "Robert's Store",
            sale: true,
            price: '32.99',
            salePrice: '41.00',
            rating: true,
            ratingCount: '4',
            badge: [
                {
                    type: 'sale',
                    value: '-37%',
                },
            ],
        },
        {
            id: '7',
            thumbnail: '/static/img/products/shop/6.jpg',
            title: 'Sound Intone I65 Earphone White Version',
            vendor: 'Youngshop',
            sale: true,
            price: '100.99',
            salePrice: '106.00',
            rating: true,
            ratingCount: '5',
            badge: [
                {
                    type: 'sale',
                    value: '-5%',
                },
            ],
        },
    ];
    const handleShowQuickView = (item) => {
        // e.preventDefault();
        console.log(item);
        setInvoice(item);
        setIsQuickView(true);
    };
    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };
    // return (
    //     <Table
    //         columns={tableColumn}
    //         dataSource={tableData}
    //         rowKey={record => record.id}
    //     />
    // );
    const pdfgen = (data) => {
        return (<>
            {/* <Model ref={(response) => (this.componentRef = response)} /> */}

            <ReactToPrint
                content={() => this.componentRef}
                trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
            />
        </>
        )
    }


    const tableItemsView = tableData.map((item) => {
        return (
            <tr key={item.id}>
                <td>{item.invoiceId}</td>
                <td>{item.title}</td>
                <td>{item.dateCreate}</td>
                <td>{item.amount}</td>
                {/* <td>{item.status}</td> */}
                <td className='text-center' onClick={(e) => handleShowQuickView(item)} ><a ><EyeOutlined style={{ fontSize: '16px' }} />View</a></td>
                <Modal
                    centered
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleHideQuickView(e)}
                    visible={isQuickView}
                    closeIcon={<i className="icon icon-cross2"></i>}>
                    <h3>Quickview</h3>
                    <section
                        className="ps-my-account ps-page--account">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="ps-page__content">
                                        {/* <div className="ps-section--account-setting">
                                            <div className="ps-section__header">
                                                <h3>
                                                    #{item.amount}-
                                                    <strong>Successful delivery</strong>
                                                </h3>
                                            </div>
                                            <div className="ps-section__content">
                                                <div className="row">
                                                    <div className="col-md-4 col-12">
                                                        <figure className="ps-block--invoice">
                                                            <figcaption>
                                                                Address
                                                            </figcaption>
                                                            <div className="ps-block__content">
                                                                <strong>
                                                                    {item.title}
                                                                </strong>
                                                                <p>
                                                                    Address: 3481 Poe
                                                                    Lane, Westphalia,
                                                                    Kansas
                                                                </p>
                                                                <p>
                                                                    Phone: 913-489-1853
                                                                </p>
                                                            </div>
                                                        </figure>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <figure className="ps-block--invoice">
                                                            <figcaption>
                                                                Shipping Fee
                                                            </figcaption>
                                                            <div className="ps-block__content">
                                                                <p>
                                                                    Shipping Fee: Free
                                                                </p>
                                                            </div>
                                                        </figure>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <figure className="ps-block--invoice">
                                                            <figcaption>
                                                                Payment
                                                            </figcaption>
                                                            <div className="ps-block__content">
                                                                <p>
                                                                    Payment Method: Visa
                                                                </p>
                                                            </div>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table ps-table--shopping-cart">
                                                        <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {invoiceProducts.map(
                                                                product => (
                                                                    <tr
                                                                        key={
                                                                            product.id
                                                                        }>
                                                                        <td>
                                                                            <ProductCart
                                                                                product={
                                                                                    product
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className="price">

                                                                            {
                                                                                product.price
                                                                            }
                                                                        </td>

                                                                        <td>1</td>
                                                                        <td className="price">

                                                                            {
                                                                                product.price
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div> */}
                                        <Export ref={(response) => setComponentRef(response)} item={invoice} />
                                        <div className='text-right'>
                                            {/* <a className="ps-btn ps-btn text-left" onClick={(e) => handleHideQuickView(e)}>
                                                            Back to invoices
                                                        </a> */}

                                            <ReactToPrint
                                                content={() => componentRef}
                                                trigger={() => <a className="ps-btn ps-btn mt-lg-3" >
                                                    <i className="icon icon-download2 mx-2"></i>Export
                                                </a>}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </Modal>
            </tr>
        )
    }
    )
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        {/* <th>Status</th> */}
                        <th>Invoices</th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
}
// }

export default TableInvoices;
