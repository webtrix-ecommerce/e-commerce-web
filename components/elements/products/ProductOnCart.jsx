import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductOnCart = ({ product, children }) => {
    const {ImageUrl, thumbnailImage, title } = useProduct();
    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.productModel.id}`}>
                    <a>{ImageUrl(product.productModel)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product.productModel)}
                <p>
                    <small>
                    ₹{product.productModel.price} x {product.quantity}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
