import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
    // const {  getProducts } = useEcomerce();
    const [products, setProducts] = useState([]);
    useEffect(() => {
            getProducts(ecomerce.cartItems, 'cart');
    }, [ecomerce]);
    const getProducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    // view
    let listItemsView, shippingView, totalView;
    let amount;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
        listItemsView = products.map((item) => (
            <Link href="/product/[pid]" as={`/product/${item.productModel.id}`} key={item.id}>
                <a>
                    <strong>
                        {item.productModel.name}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>₹{item.quantity * item.productModel.price}.00</small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (shipping === true) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>₹20.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{parseInt(amount) + 20}.00</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{parseInt(amount)}.00</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>₹{amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
