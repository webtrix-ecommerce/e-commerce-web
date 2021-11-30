import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';

const ModuleCartSummary = ({ source }) => {
    const [product, setProducts] = useState([]);
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    useEffect(() => {
        getproducts();
    }, [source]);
    // View
    let productItemsView, amount;
    if (product && product.length > 0) {
        amount = calculateAmount(product);
        productItemsView = product.map((item) => (
            <li key={item.productModel.id}>
                <span className="ps-block__estimate">
                    <Link href="/product/[pid]" as={`/product/${item.productModel.id}`}>
                        <a className="ps-product__title">
                            {item.productModel.name} x {item.quantity}
                        </a>
                    </Link>
                </span>
            </li>
        ));
    }

    return (
        <>
            <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                    <p>
                        Subtotal <span> {amount}</span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3>
                        Total <span>₹{amount}</span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
