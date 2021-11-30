import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import LazyLoad from 'react-lazyload';

const ProductSearchResult = ({ product }) => {
    const { ImageUrl, thumbnailImage, price, title } = useProduct();

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    {/* <a >{ImageUrl(product)}</a> */}
                    <LazyLoad>
                        <img
                            src={product.imageURL}
                            style={{height:" 100px"}}
                            alt={product.name}
                        />
                    </LazyLoad> 
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <div className="ps-product__rating">
                    <Rating />
                    <span>{product.ratingCount}</span>
                </div>
                {price(product)}
            </div>
        </div>
    );
};
export default ProductSearchResult;
