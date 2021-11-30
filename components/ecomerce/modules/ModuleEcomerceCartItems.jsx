import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import { DeleteOutlined } from '@ant-design/icons'
import ProductRepository from '~/repositories/ProductRepository';
const ModuleEcomerceCartItems = ({ ecomerce,
    //  cartItems 
}) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();
    const [cartItems, setProducts] = useState([]);
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        setProducts(Products);
    }
    useEffect(() => {
        getproducts();
    }, [ecomerce]);
    function handleRemoveItem(e, productId) {
        e.preventDefault();
        e.preventDefault();
        console.log("selectedItem", productId);
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);
        const config = {
            token: data,
            data: { cartId: productId }
        };
        removeItem(config, ecomerce.cartItems, 'cart');
    }
    function handleIncreaseItemQty(e, productId) {
        e.preventDefault();
        increaseQty(productId, ecomerce.cartItems);
    }
    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        decreaseQty(productId, ecomerce.cartItems);
    }
    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.id}>
                <td key={item.id}>
                    <ProductCart product={item.productModel} />
                </td>
                <td data-label="price" className="price">
                    ₹{item.productModel.price}
                </td>
                <td data-label="quantity">
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e, item.productModel.id)}>
                            +
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e, item.productModel.id)}>
                            -
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.quantity}
                            disabled={true}
                        />
                    </div>
                </td>
                <td data-label="total">
                    <strong>₹{(item.productModel.price * item.quantity).toFixed(2)}</strong>
                </td>
                <td className='form-forgot text-center h4'>
                    <a onClick={(e) => handleRemoveItem(e, item.id)}>

                        <DeleteOutlined />
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
