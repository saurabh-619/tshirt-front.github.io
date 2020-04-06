import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymentbhelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';




const PaymentBTree = ({ products, reload, setReload }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        instance: '',
        error: ""
    })

    const { user, token } = isAuthenticated();

    const showbtdropin = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                        (
                            <div>
                                <DropIn
                                    options={{ authorization: info.clientToken }}
                                    onInstance={(instance) => (info.instance = instance)}
                                />
                                <button onClick={() => { onPurchase() }} className="btn btn-success btn-block">Buy</button>
                            </div>
                        ) : (<h3>Please Log In or add something to cart</h3>)
                }
            </div >
        )
    }


    const getToken = (userId, token) => {
        getMeToken(userId, token)
            .then(data => {
                if (data.error) {
                    setInfo({ ...info, error: data.error })
                } else {
                    const clientToken = data.clientToken;
                    setInfo({ clientToken })
                }
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        getToken(user._id, token);
    }, [reload]);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };
                processPayment(user._id, token, paymentData)
                    .then(response => {
                        setInfo({ ...info, success: response.success });
                        console.log("Payment Success");
                        console.log(response);
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction_id,
                            amount: response.transaction.amount
                        }
                        createOrder(user._id, token, orderData);
                        // empty cart
                        cartEmpty(() => {
                            console.log('Did we got a crash');
                        })
                        // force reload
                        setReload(!reload)
                    })
                    .catch(err => {
                        setInfo({ loading: false, success: false })
                        console.log("Payment Failed");
                    })
            })

    }

    const getAmount = () => {
        let amount = 0;
        products.forEach(product => {
            amount += product.count * product.price;
        });
        return amount
    }

    return (
        <div>
            <h3>Your Bill is &#8377; {getAmount()}</h3>
            {showbtdropin()}
        </div>
    );
}

export default PaymentBTree;