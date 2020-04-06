import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/imageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';


const Card = ({ product, addToCard = true, removeFromCart = false, setReload, reload }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setount] = useState(product.count);

    const addingToCart = () => {
        addItemToCart(product, () => {
            setRedirect(true);
        })
    }
    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCard) => {
        return (
            addToCard && (
                <button
                    onClick={addingToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }
    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">&#8377; {product.price}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCard)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart, product)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;