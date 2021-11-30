import React from 'react';
import ReactToPrint from 'react-to-print';

import ProductCart from '~/components/elements/products/ProductCart';
import TableInvoices from '~/components/partials/account/modules/TableInvoices';
// import TableComponent from './table.component';

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        // const Export =(item)=>{
        const invoiceProducts = [
            {
                id: '6',
                imageURL: 'https://m.media-amazon.com/images/I/61oTu3SQPLL._UY625_.jpg',
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
                imageURL: 'https://rukminim1.flixcart.com/image/714/857/jjd6aa80/earring/a/c/d/afghani-earing-031-crazytowear-original-imaf6xstsxrquxag.jpeg?q=50',
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
        console.log(this.props);
        return (
            <div >
                <div className="ps-section--account-setting mt-5 ">
                    <div className="ps-section__header">
                        <h3>
                            #{this.props.item.id}-
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
                                            {this.props.item.title}
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
                                <tbody className="text-center">
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
                                                        this.props.item.amount
                                                    }
                                                </td>

                                                <td>1</td>
                                                <td className="text-center">

                                                    {
                                                        this.props.item.amount
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Export;