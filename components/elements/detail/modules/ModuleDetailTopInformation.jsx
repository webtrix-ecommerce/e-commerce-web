import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;

    if (product.discount) {
        priceView = (
            <h4 className="ps-product__price sale">
                ₹{product.price} <del className="mr-2">₹{product.discount}</del>
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">₹{product.price}</h4>;
    }
    return (
        <header>
            <h1>{product.name}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product.vendor}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
