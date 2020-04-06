import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link, Redirect } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


const StripeCheckout = ({ products, reload, setReload }) => {
    const [items, setItems] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const { user, token } = isAuthenticated();

    const getFinalAmount = () => {
        let amount = 0;
        products.forEach(product => {
            amount = amount + product.price * product.count;
        });
        return amount
    };

    const makePayment = (token) => {
        const body = {
            products,
            token
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => {
                console.log(response);
                const { status } = response;
                console.log('STATUS', status);
                cartEmpty()
            })
            .catch((err) => console.log(err));
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_H627rTeed76Tukfh38q3388N00Ophvyepg"
                token={makePayment}
                name="Buy Tshirt"
                amount={getFinalAmount() * 0.013 * 100}
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton >
        ) : (
                <Link to="/signin"><button className="btn-btn-warning">Sign In</button></Link>
            )

    }


    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;