import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import ProductRepository from '~/repositories/ProductRepository';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {

    const { increaseQty, decreaseQty, removeItem } = useEcomerce();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    const [user, setUser] = useState([]);
    const { addItem } = useEcomerce();
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('currentUser'));
        setUser(data);
        getproducts();
    }, []);
    const getproducts = async () => {
        const Products = await ProductRepository.getProductsByCartId();
        console.log("Products", Products);
        if (Products) {
            const existItem = Products.find((item) => item.productModel.id === product.id);

            console.log("existItem", existItem);
            if (existItem) {
                console.log("inside");
                setProducts(true);
                console.log("existItem", existItem);
            }
        }
    }
    function handleAddItemToCart(e) {
        e.preventDefault();
        console.log(user);
        if (user) {
            addItem({ productId: product.id, quantity: 1, userId: user }, ecomerce.cartItems, 'cart');
            Router.push('/account/shopping-cart');
        } else {
            return Router.push('/account/login')
        }
    }

    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update;
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    };


    function handleIncreaseItemQty(e,) {
        e.preventDefault();
        console.log(product.id);
        increaseQty(product.id, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        console.log(product.id);
        decreaseQty(product.id, ecomerce.cartItems);
    }
    function goCart(e) {
        e.preventDefault();
        // setQuantity(quantity + 1);
        Router.push('/account/shopping-cart');
    }
    function handleDecreaseItem(e) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }
    console.log(product);
    if (products > 0) {
        // let product=[];
        console.warn(products);
        return (
            <div className="ps-product__shopping extend">
                {/* <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e)}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e)}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={products.quantity}
                            disabled
                        />
                    </div>
                </figure> */}

                {/* <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}> 
                    Buy Now
                </a>*/}
                <div className="ps-product__actions">
                    {/* <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i>
                    </a> */}
                    {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i>
                    </a> */}
                </div>
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => goCart(e)}>
                    Go to cart
                </a>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Add to cart
                </a>
                <div className="ps-product__btn-group">
                    {/* <figure>
                        <figcaption>Quantity</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={(e) => handleIncreaseItem(e)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={(e) => handleDecreaseItem(e)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={1}
                                disabled
                            />
                        </div>
                    </figure> */}
                    {/* <a
                        className="ps-btn ps-btn--black"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e)}>
                        Add to cart
                    </a> */}
                    <div className="ps-product__actions">
                        {/* <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a> */}
                        {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                            <i className="icon-chart-bars"></i>
                        </a> */}
                    </div>
                </div>
                {/* <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a> */}
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
