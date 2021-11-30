import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const {ImageUrl, thumbnailImage, price, badge, title } = useProduct();
    // let imageURL =thumbnailImage;
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{ImageUrl(product)}</a>
                    {/* <img src={product.imageURL} alt={product.name}/> */}
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                {/* <Link href="/shop"> */}
                    <a className="ps-product__vendor">{product.name}</a>
                {/* </Link> */}
                <div className="ps-product__content">
                    {title(product)}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
